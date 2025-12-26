# Production Setup Checklist ✅

Your deployment URLs:

- **Backend (Render):** <https://artfolio-nxqo.onrender.com>
- **Frontend (Vercel):** <https://artfolio-six.vercel.app/>

---

## 🔧 Configuration Required

### 1️⃣ Backend Environment Variables (Render)

Go to Render Dashboard → Your Service → Environment

Add/Update these variables:

```env
NODE_ENV=production
PORT=10000

# Your Vercel frontend URL
CLIENT_URL=https://artfolio-six.vercel.app

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/artist-portfolio

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Mailjet
MAILJET_API_KEY=your_mailjet_api_key
MAILJET_SECRET_KEY=your_mailjet_secret_key
SENDER_EMAIL=noreply@yourdomain.com
```

**CRITICAL:** Make sure `CLIENT_URL=https://artfolio-six.vercel.app` (no trailing slash)

### 2️⃣ Frontend Environment Variables (Vercel)

Go to Vercel Dashboard → Project Settings → Environment Variables

Add this variable:

```env
VITE_API_URL=https://artfolio-nxqo.onrender.com/api
```

**CRITICAL:** Must include `/api` at the end!

### 3️⃣ Redeploy Both Services

After updating environment variables:

**Render:**

- Dashboard → Manual Deploy → Deploy latest commit

**Vercel:**

- Deployments → Three dots → Redeploy

---

## 📝 Code Changes Made

I've already updated your code to work with cross-origin deployment:

### ✅ Updated Files

1. **[src/utils/api.js](src/utils/api.js)**

   - Now uses `VITE_API_URL` environment variable
   - Falls back to localhost for development

2. **[server/server.js](server/server.js)**

   - Fixed CORS origin to use `CLIENT_URL` properly
   - Allows cookies from Vercel domain

3. **[server/routes/auth.js](server/routes/auth.js)**

   - Updated cookie `sameSite` to `"none"` in production
   - Required for cross-origin authentication

### 🚀 Deploy These Changes

**Push to GitHub:**

```bash
git add .
git commit -m "Configure for production deployment"
git push origin main
```

Both Render and Vercel will auto-deploy from GitHub.

---

## ✅ Testing Checklist

After redeployment, test these features:

### Authentication

- [ ] Register new account → Check if welcome email arrives
- [ ] Login with credentials → Should stay logged in
- [ ] Refresh page → Should remain logged in (cookies working)
- [ ] Logout → Should clear session

### Projects

- [ ] Create project with images → Check Cloudinary upload
- [ ] View project in explore page
- [ ] Edit project → Update works
- [ ] Delete project → Confirmation modal + deletion

### Profile

- [ ] View public profile
- [ ] Update profile settings
- [ ] Toggle availability
- [ ] Update social links

### Password Reset

- [ ] Request password reset → Check email
- [ ] Click email link → Should redirect to reset page
- [ ] Reset password → Check success email
- [ ] Login with new password

---

## 🐛 Common Issues & Fixes

### Issue: "Network Error" or "Failed to fetch"

**Cause:** Frontend can't reach backend

**Fix:**

1. Check Vercel environment variable: `VITE_API_URL=https://artfolio-nxqo.onrender.com/api`
2. Make sure backend is running (visit: <https://artfolio-nxqo.onrender.com/api>)
3. Redeploy Vercel after adding env variable

### Issue: "CORS Error"

**Cause:** Backend not allowing Vercel domain

**Fix:**

1. Check Render environment variable: `CLIENT_URL=https://artfolio-six.vercel.app`
2. No trailing slash in CLIENT_URL
3. Redeploy backend after updating

### Issue: Login works but logout doesn't persist / keeps logging out

**Cause:** Cookies not being saved across domains

**Fix:**

1. Make sure backend has `sameSite: "none"` in production (already updated)
2. Check browser console for cookie warnings
3. Clear browser cookies and try again

### Issue: Images not uploading

**Cause:** Cloudinary credentials missing or incorrect

**Fix:**

1. Verify Cloudinary credentials in Render dashboard
2. Check Cloudinary dashboard for API limits
3. File size limit is 10MB (check if images are larger)

### Issue: Emails not sending

**Cause:** Mailjet credentials or sender email not configured

**Fix:**

1. Verify Mailjet API keys in Render dashboard
2. Check sender email is verified in Mailjet
3. Check Mailjet dashboard for delivery failures
4. Free tier limit: 200 emails/day

### Issue: Render backend sleeping / slow first load

**Cause:** Render free tier spins down after 15 mins of inactivity

**Fix:**

1. First request takes 30-60 seconds (cold start)
2. Upgrade to paid plan for always-on service ($7/month)
3. Or use uptime monitoring to ping every 10 minutes

---

## 🔐 Security Checklist

- [ ] All environment variables set (no hardcoded secrets)
- [ ] JWT_SECRET is long and random (min 32 characters)
- [ ] MongoDB user has strong password
- [ ] MongoDB IP whitelist includes `0.0.0.0/0`
- [ ] Cloudinary upload preset is secure
- [ ] HTTPS enabled on both domains (automatic)
- [ ] Cookies set to `httpOnly` and `secure` in production
- [ ] CORS only allows your Vercel domain

---

## 📊 Monitor Your Apps

### Render Logs

<https://dashboard.render.com> → Your Service → Logs

- Check for errors, warnings
- Monitor API response times
- Watch for MongoDB connection issues

### Vercel Logs

<https://vercel.com/dashboard> → Project → Deployments → View Function Logs

- Check for build errors
- Monitor API request failures
- Watch for environment variable issues

### MongoDB Atlas

<https://cloud.mongodb.com> → Cluster → Metrics

- Monitor database operations
- Check connection count
- Watch storage usage

---

## 💰 Cost Tracking

**Current (Free Tier):**

- Render: First 750 hours free/month, then sleeps
- Vercel: 100GB bandwidth free/month
- MongoDB Atlas: 512MB M0 cluster (free)
- Cloudinary: 25 credits/month free
- Mailjet: 200 emails/day free

**Upgrade When:**

- Render sleeping affects UX → Upgrade to Starter ($7/mo)
- >100GB bandwidth → Vercel Pro ($20/mo)
- >512MB database → MongoDB M2 ($9/mo)
- >200 emails/day → Mailjet Essential ($15/mo)

---

## 🎉 You're Live

Your portfolio is now deployed and accessible worldwide:

**Share your portfolio:**

```link
https://artfolio-six.vercel.app
```

**Next Steps:**

1. Add custom domain (optional)
2. Set up analytics
3. Monitor performance
4. Share with potential clients!

**Need help?** Check the logs first, then refer to the troubleshooting section above.
