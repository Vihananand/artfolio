import express from "express";
import User from "../models/User.js";
import Project from "../models/Project.js";
import { authenticate } from "../middleware/auth.js";
import cloudinary from "../config/cloudinary.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Get user profile by ID (public)
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update user profile
router.put("/profile", authenticate, async (req, res) => {
  try {
    const {
      name,
      bio,
      skills,
      socialLinks,
      location,
      profession,
      isAvailableForWork,
    } = req.body;

    const updateData = {
      name,
      bio,
      skills,
      socialLinks,
      location,
      profession,
      isAvailableForWork,
    };

    const user = await User.findByIdAndUpdate(req.userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Upload profile image
router.post(
  "/profile-image",
  authenticate,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No image provided" });
      }

      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "artist-portfolio/profiles",
            transformation: [
              { width: 500, height: 500, crop: "fill", gravity: "face" },
            ],
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(req.file.buffer);
      });

      // Update user profile image
      const user = await User.findByIdAndUpdate(
        req.userId,
        { profileImage: result.secure_url },
        { new: true }
      ).select("-password");

      res.json({ profileImage: user.profileImage });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
);

// Delete user account
router.delete("/profile", authenticate, async (req, res) => {
  try {
    const userId = req.userId;

    // Find all user's projects
    const projects = await Project.find({ user: userId });

    // Delete all project images from Cloudinary
    for (const project of projects) {
      const deletePromises = project.images.map((image) =>
        cloudinary.uploader.destroy(image.publicId).catch((err) => {
          console.error("Error deleting image:", err);
        })
      );
      await Promise.all(deletePromises);
    }

    // Delete all user's projects
    await Project.deleteMany({ user: userId });

    // Delete user profile image from Cloudinary if exists
    const user = await User.findById(userId);
    if (user.profileImage) {
      // Extract public_id from Cloudinary URL if needed
      // For now, we'll just try to delete it
      try {
        const publicId = user.profileImage.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`artist-portfolio/profiles/${publicId}`);
      } catch (err) {
        console.error("Error deleting profile image:", err);
      }
    }

    // Delete the user account
    await User.findByIdAndDelete(userId);

    // Clear the cookie
    res.clearCookie("token");

    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
