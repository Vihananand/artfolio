# 🎨 ArtFolio - Artist Portfolio Platform

A modern, full-stack portfolio platform for artists and creatives to showcase their work, manage projects, and connect with potential clients worldwide.

## ✨ Features

### 🔐 Authentication & Security
- **JWT Cookie-Based Authentication**: Secure, HTTP-only cookies with 7-day session
- **Password Reset**: Email-based password recovery with Mailjet integration
- **Protected Routes**: Client-side route protection for authenticated users

### 👤 User Management
- **Personal Dashboard**: Manage projects, profile information, and availability status
- **Profile Customization**: Add bio, profession, location, skills, and social links
- **Profile Image Upload**: Cloudinary integration for optimized image delivery
- **Availability Toggle**: Show/hide "Available for Work" badge on public profile
- **Account Deletion**: Secure account removal with confirmation

### 📁 Project Management
- **Create & Edit Projects**: Upload projects with multiple images, descriptions, and categories
- **Featured Projects**: Mark important projects with a star badge
- **Project Categories**: Filter and organize projects by type
- **Image Gallery**: Beautiful image slider with Cloudinary optimization
- **Project Details**: Dedicated pages for each project with full information

### 🌐 Public Features
- **Beautiful Public Profiles**: Showcase your work with professional portfolio pages
- **Explore Page**: Discover work from other artists with search and category filters
- **Project Discovery**: Browse all public projects with infinite scroll
- **Share Profiles**: Copy profile links to share with clients

### 🎨 Design & UI
- **Responsive Design**: Mobile-first design that adapts to all screen sizes
- **Modern Navigation**: Hamburger menu with grid layout on desktop, column on mobile
- **Smooth Animations**: Page transitions and hover effects for enhanced UX
- **Auto Scroll to Top**: Automatic scroll reset on page navigation
- **Clean Footer**: Minimalist design with essential branding
- **Loading States**: Spinners and optimistic updates for better user feedback

### 📄 Legal & Information Pages
- **Pricing Page**: Three-tier pricing with FAQ section
- **Features Page**: Comprehensive feature showcase
- **Terms & Conditions**: Legal terms with 10 sections
- **Privacy Policy**: Icon-based privacy sections
- **Cookie Policy**: Detailed cookie usage information
- **License Agreement**: Software license terms

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
- **Mailjet** - Email service for welcome and password reset emails
- **Cookie Parser** - Cookie parsing middleware
- **CORS** - Cross-origin resource sharing
- **Crypto** - Token generation for password reset

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cloudinary account (free tier works)
- Mailjet account (for email features)

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
NODE_ENV=development

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mailjet Configuration
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_SECRET_KEY=your_mailjet_secret_key
SENDER_EMAIL=your_verified_sender_email@domain.com
```

5. Start the server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## 🔐 Third-Party Services Setup

### Cloudinary (Image Storage)

1. Sign up for a free account at [Cloudinary](https://cloudinary.com/)
2. Go to your Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Add these to your `.env` file in the server directory

### Mailjet (Email Service)

1. Sign up for a free account at [Mailjet](https://www.mailjet.com/)
2. Go to Account Settings > REST API
3. Copy your API Key and Secret Key
4. Verify a sender email address in Mailjet dashboard
5. Add credentials to your `.env` file

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
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx       # Responsive hamburger menu
│   │   ├── Footer.jsx       # Minimalist footer
│   │   ├── ProjectCard.jsx  # Project display card with featured badge
│   │   ├── LoadingSpinner.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── ScrollToTop.jsx  # Auto-scroll on navigation
│   ├── context/             # React Context
│   │   └── AuthContext.jsx  # Authentication state management
│   ├── pages/               # Page components
│   │   ├── Home.jsx         # Landing page
│   │   ├── Login.jsx        # Login page
│   │   ├── Register.jsx     # Registration page
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── Dashboard.jsx    # User dashboard with availability toggle
│   │   ├── Profile.jsx      # Public profile page
│   │   ├── Settings.jsx     # Profile settings editor
│   │   ├── CreateProject.jsx
│   │   ├── EditProject.jsx
│   │   ├── ProjectDetail.jsx
│   │   ├── Explore.jsx      # Browse all projects
│   │   ├── Pricing.jsx      # Pricing tiers
│   │   ├── Features.jsx     # Feature showcase
│   │   ├── Terms.jsx        # Terms & Conditions
│   │   ├── Privacy.jsx      # Privacy Policy
│   │   ├── CookiePolicy.jsx # Cookie Policy
│   │   └── License.jsx      # License Agreement
│   ├── utils/               # Utility functions
│   │   └── api.js           # Axios configuration
│   ├── App.jsx              # Main app with routes
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── server/
│   ├── config/              # Configuration files
│   │   ├── cloudinary.js    # Cloudinary setup
│   │   └── email.js         # Mailjet configuration
│   ├── middleware/          # Express middleware
│   │   └── auth.js          # JWT authentication
│   ├── models/              # Mongoose models
│   │   ├── User.js          # User schema with password reset
│   │   └── Project.js       # Project schema with featured flag
│   ├── routes/              # API routes
│   │   ├── auth.js          # Register, login, logout, password reset
│   │   ├── user.js          # Profile management
│   │   └── project.js       # Project CRUD operations
│   ├── utils/               # Utility functions
│   │   ├── emailService.js  # Email sending logic
│   │   └── emailTemplates.js # HTML email templates
│   └── server.js            # Express server
├── public/                  # Static assets
├── package.json             # Frontend dependencies
└── README.md
```

## 🎨 Design Philosophy

- **Minimalist UI**: Clean, professional design with gray color scheme
- **Smooth Animations**: Hover effects, page transitions, and loading states
- **Responsive Navigation**: Hamburger menu with grid layout on desktop
- **Modern Components**: Rounded corners (rounded-2xl), shadows, and hover effects
- **Accessibility**: Semantic HTML, proper contrast ratios, and keyboard navigation
- **Performance**: Optimized images via Cloudinary, lazy loading, and code splitting

## 🔒 Security Features

- **HTTP-Only Cookies**: Prevents XSS attacks by storing JWT in secure cookies
- **CSRF Protection**: SameSite cookie attribute set to "strict"
- **Password Hashing**: Bcrypt with salt rounds for secure password storage
- **Protected Routes**: Frontend and backend authentication middleware
- **Secure Password Reset**: Time-limited tokens with crypto randomization
- **Environment Variables**: Sensitive data stored in .env files (not committed)

## 📧 Email Features

The platform sends beautifully designed HTML emails using Mailjet:

- **Welcome Email**: Sent on new user registration with feature highlights
- **Password Reset Email**: Secure link with copy button and security tips
- **Modern Templates**: Gradient backgrounds, icon boxes, and responsive design

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

### User
- `GET /api/user/:userId` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/profile-image` - Upload profile image
- `DELETE /api/user/profile` - Delete user account

### Projects
- `GET /api/projects` - Get user's projects
- `GET /api/projects/explore` - Get all public projects
- `GET /api/projects/user/:userId` - Get user's public projects
- `GET /api/projects/:projectId` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:projectId` - Update project
- `DELETE /api/projects/:projectId` - Delete project

## 🧪 Testing

```bash
# Frontend tests (if added)
npm test

# Backend tests (if added)
cd server
npm test
```

## 📝 Environment Variables

Create `.env` files with these variables:

### Frontend (root directory - if needed)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (server directory)
```env
# Server
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database
MONGODB_URI=mongodb://localhost:27017/artist-portfolio

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mailjet
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_SECRET_KEY=your_mailjet_secret_key
SENDER_EMAIL=noreply@yourdomain.com
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod` or check Atlas connection
- Verify connection string in `.env`
- Check firewall and network settings

### Email Not Sending
- Verify Mailjet credentials in `.env`
- Confirm sender email is verified in Mailjet dashboard
- Check Mailjet account limits

### Image Upload Failing
- Verify Cloudinary credentials
- Check file size limits (default: 10MB)
- Ensure proper image format (JPEG, PNG, WebP)

### Cookie/Auth Issues
- Clear browser cookies and cache
- Verify JWT_SECRET matches between requests
- Check cookie settings in browser (allow third-party cookies in dev)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@Vihananand](https://github.com/Vihananand)
- Project: [ArtFolio](https://github.com/Vihananand/artfolio)

## 🙏 Acknowledgments

- [Cloudinary](https://cloudinary.com/) - Image storage and optimization
- [Mailjet](https://www.mailjet.com/) - Email service
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Database hosting
- [Lucide](https://lucide.dev/) - Beautiful icon library
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework

---

Made with ❤️ by creative developers for creative professionals
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
