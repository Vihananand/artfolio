# ArtFolio - Artist Portfolio Platform

A modern, full-stack portfolio platform for artists and creatives to showcase their work, manage projects, and connect with potential clients.

## 🎨 Features

- **User Authentication**: Cookie-based authentication with JWT tokens for persistent login
- **Personal Dashboard**: Manage projects, profile information, and settings
- **Public Profiles**: Beautiful showcase profiles for each artist
- **Project Management**: Upload, edit, and delete projects with multiple images
- **Image Storage**: Integration with Cloudinary for optimized image delivery
- **Responsive Design**: Mobile-first design that works on all screen sizes
- **Modern UI**: Clean, artistic design with smooth animations and transitions
- **Search & Filter**: Explore projects by category and search functionality

## 🛠️ Tech Stack

### Frontend

- **React** (v19.2.0) - UI library
- **React Router DOM** - Client-side routing
- **TailwindCSS** (v4.1) - Utility-first CSS framework
- **Axios** - HTTP client
- **js-cookie** - Cookie handling
- **Lucide React** - Icon library
- **Vite** - Build tool

### Backend

- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database and ODM
- **JWT** - Authentication tokens
- **Bcrypt.js** - Password hashing
- **Cloudinary** - Image storage and optimization
- **Multer** - File upload handling
- **Cookie Parser** - Cookie parsing middleware
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (free tier works)

### Frontend Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Backend Setup

1. Navigate to the server directory:

```bash
cd server
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the server directory:

```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/artist-portfolio
JWT_SECRET=your_secure_jwt_secret_here
CLIENT_URL=http://localhost:5173

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

5. Start the server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## 🔐 Cloudinary Setup

1. Sign up for a free account at [Cloudinary](https://cloudinary.com/)
2. Go to your Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Add these to your `.env` file in the server directory

## 🗄️ MongoDB Setup

### Local MongoDB

```bash
# Start MongoDB service
mongod
```

### MongoDB Atlas (Cloud)

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Get your connection string
3. Replace `MONGODB_URI` in `.env` with your Atlas connection string

## 🚀 Usage

### Register a New User

1. Navigate to `/register`
2. Fill in your details
3. Click "Sign Up"

### Create Your Portfolio

1. Login to your account
2. Go to Dashboard
3. Click "Edit Profile" to update your information
4. Click "New Project" to add your work
5. Upload images, add descriptions, and categorize your projects

### View Public Profile

- Your public profile is accessible at `/profile/[your-user-id]`
- Share this link with clients and on social media

### Explore Other Artists

- Visit `/explore` to discover work from other artists
- Filter by category or search for specific projects

## 📁 Project Structure

```
artist-portfolio/
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/         # React Context
│   │   └── AuthContext.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Profile.jsx
│   │   ├── Settings.jsx
│   │   ├── CreateProject.jsx
│   │   ├── Explore.jsx
│   │   └── ProjectDetail.jsx
│   ├── utils/           # Utility functions
│   │   └── api.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── server/
│   ├── config/          # Configuration files
│   │   └── cloudinary.js
│   ├── middleware/      # Express middleware
│   │   └── auth.js
│   ├── models/          # Mongoose models
│   │   ├── User.js
│   │   └── Project.js
│   ├── routes/          # API routes
│   │   ├── auth.js
│   │   ├── user.js
│   │   └── project.js
│   └── server.js        # Express server
└── README.md
```

## 🎨 Design Philosophy

- **No Gradient Backgrounds**: Clean, solid colors for a professional look
- **Subtle Animations**: Smooth transitions using TailwindCSS
- **Modern Typography**: Clear hierarchy and readable fonts
- **Whitespace**: Generous spacing for breathing room
- **Consistent Border Radius**: 2xl rounded corners for modern feel
- **Hover Effects**: Subtle scale and color transitions

## 🔒 Security Features

- Password hashing with bcrypt
- HTTP-only cookies for token storage
- JWT-based authentication
- Protected API routes
- CORS configuration
- Input validation

## 📱 Responsive Design

The platform is fully responsive with breakpoints for:

- Mobile (< 768px)
- Tablet (768px - 1024px)
- Desktop (> 1024px)

## 🚧 Future Enhancements

- [ ] Project editing functionality
- [ ] Comments and likes system
- [ ] Follow/unfollow artists
- [ ] Email notifications
- [ ] Advanced search filters
- [ ] Portfolio themes
- [ ] Analytics dashboard
- [ ] Export portfolio as PDF

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👨‍💻 Author

Created with ❤️ for artists and creatives

## 🙏 Acknowledgments

- TailwindCSS for the amazing utility framework
- Cloudinary for image optimization
- Lucide for beautiful icons
- MongoDB for flexible data storage

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
