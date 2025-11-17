import express from "express";
import Project from "../models/Project.js";
import { authenticate } from "../middleware/auth.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Get user's own projects (authenticated) - Must come before other GET routes
router.get("/", authenticate, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Create project with images
router.post("/", authenticate, upload.array("images", 10), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      tags,
      projectUrl,
      client,
      completionDate,
      isFeatured,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    // Upload images to Cloudinary
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "artist-portfolio/projects",
            transformation: [{ width: 1200, crop: "limit", quality: "auto" }],
          },
          (error, result) => {
            if (error) reject(error);
            else
              resolve({ url: result.secure_url, publicId: result.public_id });
          }
        );
        uploadStream.end(file.buffer);
      });
    });

    const images = await Promise.all(uploadPromises);

    // Create project
    const project = new Project({
      user: req.userId,
      title,
      description,
      images,
      category,
      tags: typeof tags === "string" ? JSON.parse(tags) : tags,
      projectUrl,
      client,
      completionDate,
      isFeatured,
    });

    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all projects for explore page (public) with search functionality
router.get("/explore", async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    // Filter by category if provided
    if (category && category !== "all") {
      query.category = category;
    }

    // Fetch projects with user information
    let projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .populate("user", "name profileImage profession skills")
      .limit(100); // Limit to 100 projects for performance

    // If search query provided, filter by title, description, user name, or skills
    if (search && search.trim()) {
      const searchLower = search.toLowerCase();
      projects = projects.filter((project) => {
        const titleMatch = project.title.toLowerCase().includes(searchLower);
        const descMatch = project.description
          .toLowerCase()
          .includes(searchLower);
        const userNameMatch = project.user?.name
          .toLowerCase()
          .includes(searchLower);
        const skillsMatch = project.user?.skills?.some((skill) =>
          skill.toLowerCase().includes(searchLower)
        );
        const tagsMatch = project.tags?.some((tag) =>
          tag.toLowerCase().includes(searchLower)
        );

        return (
          titleMatch ||
          descMatch ||
          userNameMatch ||
          skillsMatch ||
          tagsMatch
        );
      });
    }

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get all projects by user (public)
router.get("/user/:userId", async (req, res) => {
  try {
    const projects = await Project.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .populate("user", "name profileImage profession");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get single project (public)
router.get("/:projectId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate(
      "user",
      "name profileImage profession email"
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update project
router.put(
  "/:projectId",
  authenticate,
  upload.array("images", 10),
  async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId);

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      if (project.user.toString() !== req.userId) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const {
        title,
        description,
        category,
        tags,
        projectUrl,
        client,
        completionDate,
        isFeatured,
        existingImages,
      } = req.body;

      let images =
        typeof existingImages === "string"
          ? JSON.parse(existingImages)
          : existingImages || [];

      // Upload new images if provided
      if (req.files && req.files.length > 0) {
        const uploadPromises = req.files.map((file) => {
          return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              {
                folder: "artist-portfolio/projects",
                transformation: [
                  { width: 1200, crop: "limit", quality: "auto" },
                ],
              },
              (error, result) => {
                if (error) reject(error);
                else
                  resolve({
                    url: result.secure_url,
                    publicId: result.public_id,
                  });
              }
            );
            uploadStream.end(file.buffer);
          });
        });

        const newImages = await Promise.all(uploadPromises);
        images = [...images, ...newImages];
      }

      project.title = title;
      project.description = description;
      project.images = images;
      project.category = category;
      project.tags = typeof tags === "string" ? JSON.parse(tags) : tags;
      project.projectUrl = projectUrl;
      project.client = client;
      project.completionDate = completionDate;
      project.isFeatured = isFeatured;

      await project.save();
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// Delete project
router.delete("/:projectId", authenticate, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.user.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Delete images from Cloudinary
    const deletePromises = project.images.map((image) =>
      cloudinary.uploader.destroy(image.publicId)
    );
    await Promise.all(deletePromises);

    await Project.findByIdAndDelete(req.params.projectId);
    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
