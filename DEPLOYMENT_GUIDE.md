# Deployment Guide - Artist Portfolio

## Prerequisites

- [x] GitHub account
- [x] Vercel account
- [x] MongoDB Atlas account (for production database)
- [x] Cloudinary account
- [x] Mailjet account

---

## **OPTION A: Full Vercel Deployment (Everything on Vercel) ✨ RECOMMENDED**

Deploy both frontend and backend on Vercel using serverless functions.

### Advantages:
- ✅ Single platform for everything
- ✅ Free hosting (generous limits)
- ✅ Automatic HTTPS and CDN
- ✅ No CORS issues (same domain)
- ✅ Faster cold starts than Railway
- ✅ Git-based deployments

### Step 1: Project Structure (No Changes Needed)

Your current structure works perfectly! Vercel will:
- Serve frontend from `dist` folder
- Run backend from `server` folder as serverless functions

### Step 2: Update vercel.json

Already created! It will:
- Build your Vite frontend
- Proxy `/api/*` requests to your Express backend
- Handle serverless function routing

### Step 3: Set Environment Variables on Vercel

1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add ALL these variables:

```env
# Production Environment
NODE_ENV=production

# Frontend API URL (leave empty, it will use relative /api)
VITE_API_URL=/api

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/artist-portfolio

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here-use-strong-random-string

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mailjet
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_SECRET_KEY=your_mailjet_secret_key
SENDER_EMAIL=noreply@yourdomain.com

# Client URL (your Vercel domain)
CLIENT_URL=https://your-project.vercel.app
```

### Step 4: Deploy to Vercel

**Method 1: Via Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (from project root)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? artist-portfolio (or your choice)
# - Directory? ./ (press Enter)
# - Override settings? No

# Production deployment
vercel --prod
```

**Method 2: Via Vercel Dashboard**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - **Install Command**: `npm install` (default)
4. Add environment variables (from Step 3)
5. Click **Deploy**

### Step 5: Update Frontend API Configuration

Create or update `src/utils/api.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL || '/api';
```

This ensures it uses `/api` in production (same domain) and can be overridden for local development.

### Step 6: Update Server for Vercel

The server needs a small adjustment. Update `server/server.js`:

```javascript
// Add at the top
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Update cookie settings for production
res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "lax" : "strict", // Changed for same-domain
  maxAge: 7 * 24 * 60 * 60 * 1000,
});
```

### Step 7: Verify Deployment

After deployment:
- ✅ Visit your Vercel URL
- ✅ Test registration (should send email)
- ✅ Test login/logout
- ✅ Test project creation with image upload
- ✅ Check browser console for errors
- ✅ Check Vercel logs for backend errors

### Important Notes for Vercel Serverless:

**Limitations:**
- Max execution time: 10 seconds (Hobby), 60 seconds (Pro)
- Max request body: 4.5MB
- Stateless (no persistent connections)

**Tips:**
- Keep image uploads under 10MB
- MongoDB Atlas handles database persistence
- Environment variables persist across deploys
- Each API request creates a new serverless instance

---

## **OPTION B: Split Deployment (Frontend: Vercel, Backend: Railway)**

Use this if you need longer execution times or stateful connections.

### Step 1: Prepare Backend for Production

1. **Create a separate backend repository** or use the main repo with server folder

2. **Update server/package.json** - Add start script:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

3. **Add PORT environment variable handling** in `server/server.js`:
```javascript
const PORT = process.env.PORT || 5000;
```

### Step 2: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Railway will auto-detect Node.js and deploy

### Step 3: Set Environment Variables on Railway

Go to your project → **Variables** tab and add:

```env
NODE_ENV=production
PORT=5000
CLIENT_URL=https://your-vercel-app.vercel.app

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/artist-portfolio

# Authentication
JWT_SECRET=your-super-secret-jwt-key-here-use-strong-random-string

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mailjet
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_SECRET_KEY=your_mailjet_secret_key
SENDER_EMAIL=noreply@yourdomain.com
```

### Step 4: Get Railway URL

- Copy your Railway deployment URL (e.g., `https://your-app.railway.app`)
- You'll need this for frontend configuration

---

## Part 3: Frontend Deployment (Vercel - Split Setup)

### Step 1: Update API URL

Update your frontend to use the production backend URL:

**Option A: Environment Variable (Recommended)**

Create `.env.production` in root:
```env
VITE_API_URL=https://your-app.railway.app/api
```

**Option B: Update api.js directly**
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

### Step 2: Update vercel.json

Replace `your-backend-url.com` in `vercel.json` with your Railway URL:
```json
{
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://your-app.railway.app/api/$1"
    }
  ]
}
```

### Step 3: Deploy to Vercel

1. **Via Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Configure:
     - **Framework Preset**: Vite
     - **Root Directory**: `./`
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`

2. **Set Environment Variables** on Vercel:
   - Go to **Settings** → **Environment Variables**
   - Add:
     ```
     VITE_API_URL=https://your-app.railway.app/api
     ```

3. **Deploy** - Click Deploy

### Step 4: Update Backend CORS

Update `CLIENT_URL` in Railway to your Vercel URL:
```env
CLIENT_URL=https://your-app.vercel.app
```

---

## Part 4: Post-Deployment Checklist

### Backend Verification
- [ ] Backend is running: `curl https://your-app.railway.app/api`
- [ ] MongoDB connection successful (check Railway logs)
- [ ] Test API endpoints with Postman
- [ ] Check environment variables are set correctly

### Frontend Verification
- [ ] Frontend loads: Visit your Vercel URL
- [ ] API calls work (check Network tab in browser DevTools)
- [ ] Registration sends email
- [ ] Image uploads work (Cloudinary)
- [ ] Authentication works (login/logout)
- [ ] Password reset emails work

### Email Testing
- [ ] Welcome email received on registration
- [ ] Password reset email received
- [ ] Password reset success email received

### Security
- [ ] All environment variables use production values
- [ ] JWT_SECRET is strong and unique
- [ ] MongoDB connection string uses strong password
- [ ] CORS is configured correctly
- [ ] Cookie settings use `secure: true` in production

---

## Recommended Deployment Path

### For Most Users: ✨ **Full Vercel Deployment (Option A)**
- Easiest setup
- Single command deployment
- No CORS configuration needed
- Free tier is generous
- Perfect for portfolios and small apps

### For Heavy Backend Use: **Split Deployment (Option B)**
- Backend needs >10 second execution time
- High traffic requiring persistent connections
- Need more control over backend scaling

---

## Alternative: Serverless Backend on Vercel

If you want to deploy everything on Vercel, you'll need to:

1. Convert Express routes to Vercel serverless functions
2. Create `/api` folder in root with serverless functions
3. Each route becomes a separate file (e.g., `/api/auth/login.js`)

**Example serverless function structure:**
```
/api
  /auth
    login.js
    register.js
    logout.js
  /projects
    index.js
    [id].js
```

This requires significant refactoring and has limitations (10 second timeout, stateless).

---

## Troubleshooting

### CORS Errors
- Ensure `CLIENT_URL` in backend matches your Vercel URL exactly
- Check Railway logs for CORS configuration
- Verify `credentials: 'include'` in frontend API calls

### Cookie Issues
- Ensure `sameSite` is set to `'none'` for cross-origin requests in production
- Verify `secure: true` when using HTTPS
- Check browser DevTools → Application → Cookies

### Build Failures
- Check Vercel build logs
- Ensure all dependencies are in `package.json`
- Verify build command is correct

### 500 Errors
- Check Railway logs for backend errors
- Verify all environment variables are set
- Test MongoDB connection string

### Image Upload Failures
- Verify Cloudinary credentials
- Check file size limits
- Review Railway logs for errors

---

## Custom Domain (Optional)

### Vercel Frontend Domain
1. Go to Vercel project → **Settings** → **Domains**
2. Add your custom domain (e.g., `artfolio.com`)
3. Update DNS records as instructed

### Railway Backend Domain
1. Go to Railway project → **Settings** → **Domains**
2. Add custom subdomain (e.g., `api.artfolio.com`)
3. Update DNS with CNAME record

---

## Monitoring & Maintenance

### Vercel Analytics
- Enable in project settings for traffic insights

### Railway Logs
- Monitor for errors: Railway Dashboard → Deployments → Logs

### MongoDB Metrics
- Monitor database usage in Atlas dashboard
- Set up alerts for performance issues

### Uptime Monitoring
- Use services like UptimeRobot or StatusCake
- Monitor both frontend and backend endpoints

---

## Cost Estimates

### Free Tier:
- **Vercel**: Free (Hobby plan)
- **Railway**: $5/month credit (then usage-based)
- **MongoDB Atlas**: Free (M0 tier, 512MB)
- **Cloudinary**: Free (25 credits/month)
- **Mailjet**: Free (200 emails/day)

**Total**: $0-5/month for low traffic

### Production Scale:
- Consider upgrading as traffic grows
- Railway Pro: $20/month + usage
- MongoDB M2: $9/month
- Cloudinary Advanced: $89/month
- Mailjet Essential: $15/month

---

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Ready to Deploy?** Follow the steps in order:
1. MongoDB Atlas → 2. Railway (Backend) → 3. Vercel (Frontend) → 4. Testing
