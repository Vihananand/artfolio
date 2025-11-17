# Email Service Implementation Guide

## 🎨 Brevo SMTP Integration

### Overview

Integrated Brevo SMTP service for sending beautiful, artistic HTML emails for:

1. **Welcome Email** - Sent after successful registration
2. **Password Reset Email** - Sent when user requests password reset

---

## 📧 Features Implemented

### 1. Email Configuration

- **File**: `server/config/email.js`
- **SMTP Server**: smtp-relay.brevo.com
- **Port**: 587 (TLS)
- **Connection Verification**: Automatic on server start

### 2. Email Templates

- **File**: `server/utils/emailTemplates.js`
- **Artistic Design Features**:
  - Modern, clean layout with dark theme headers
  - Gradient backgrounds and borders
  - Emoji icons for visual appeal
  - Responsive design for mobile devices
  - Professional typography
  - Security tips and best practices
  - Footer with company information

### 3. Email Service

- **File**: `server/utils/emailService.js`
- **Functions**:
  - `sendWelcomeEmail(email, name)` - Sends welcome email
  - `sendPasswordResetEmail(email, name, resetLink)` - Sends password reset

### 4. New API Endpoints

- **POST** `/api/auth/forgot-password`
  - Request body: `{ email }`
  - Generates reset token and sends email
  
- **POST** `/api/auth/reset-password/:token`
  - Request body: `{ password }`
  - Resets password using token

### 5. Database Updates

- **User Model** enhanced with:
  - `resetPasswordToken` - Hashed reset token
  - `resetPasswordExpires` - Token expiration timestamp

---

## 🎨 Email Templates Preview

### Welcome Email Features

- 🎨 Artistic header with gradient background
- 📋 Three feature highlight boxes:
  - Create Your Portfolio
  - Build Your Brand
  - Get Discovered
- 🔘 Call-to-action button to dashboard
- 📱 Mobile-responsive design
- ✨ Clean, modern aesthetic

### Password Reset Email Features

- 🔐 Security-focused red gradient header
- ⚠️ Expiration warning (1 hour)
- 🔘 Prominent reset password button
- 📋 Alternative plain text link
- 🛡️ Security tips section
- ⚡ Professional, trustworthy design

---

## 🔐 Environment Variables

Add to `.env` file:

```env
# Brevo SMTP Configuration
SMTP_USER=9b597d001@smtp-brevo.com
SMTP_KEY=xsmtpsib-a6e12ed2651dd5cc34b9f0245ce48569fa89a85dbcc7b3722e8cf70022ff9840-UiQwoDwrrN82BNiJ
```

---

## 🚀 Usage

### Automatic Welcome Email

When a user registers, they automatically receive a welcome email:

```javascript
// Triggered in /api/auth/register endpoint
sendWelcomeEmail(user.email, user.name);
```

### Password Reset Flow

1. User requests password reset via `/api/auth/forgot-password`
2. System generates secure token (expires in 1 hour)
3. User receives email with reset link
4. User clicks link and submits new password
5. Token is validated and password is updated

---

## 📝 Testing

### Test Welcome Email

1. Register a new user
2. Check email inbox for welcome message

### Test Password Reset

1. POST to `/api/auth/forgot-password` with `{ email: "user@example.com" }`
2. Check email for reset link
3. Extract token from URL
4. POST to `/api/auth/reset-password/:token` with `{ password: "newpassword" }`

---

## 🎨 Design Philosophy

Both email templates follow the artist portfolio aesthetic:

- **Dark Theme Headers** - Professional, modern look
- **No Gradients in Main Content** - Clean, readable text areas
- **Artistic Accents** - Subtle patterns and decorative elements
- **Clear Hierarchy** - Important information stands out
- **Mobile-First** - Responsive design for all devices

---

## ✅ Server Logs

When server starts, you'll see:

```code
✅ MongoDB connected successfully
📊 Database: [database-name]
✅ Cloudinary connected successfully
☁️  Cloud Name: dzx4pyc7n
✅ Email service connected successfully
📧 SMTP Server: smtp-relay.brevo.com
🚀 Server running on port 5000
```

When emails are sent:

```code
✅ Welcome email sent to user@example.com
✅ Password reset email sent to user@example.com
```

---

## 🔧 Customization

### Change Email Design

Edit `server/utils/emailTemplates.js` to modify:

- Colors and styling
- Content and copy
- Layout and structure

### Change Sender Information

Edit `server/utils/emailService.js`:

```javascript
from: '"Your Brand" <noreply@yourdomain.com>'
```

### Adjust Token Expiration

Edit `server/routes/auth.js`:

```javascript
user.resetPasswordExpires = Date.now() + 3600000; // 1 hour in milliseconds
```

---

## 📦 Dependencies Installed

```json
{
  "nodemailer": "^6.9.7"
}
```

---

## 🎯 Next Steps (Frontend)

You'll need to create these frontend pages:

1. **Forgot Password Page** - Form to enter email
2. **Reset Password Page** - Form to enter new password
3. Update API client with new endpoints

Example API calls:

```javascript
// Forgot Password
await axios.post('/api/auth/forgot-password', { email });

// Reset Password
await axios.post(`/api/auth/reset-password/${token}`, { password });
```

---

## 🎨 Email Preview

The emails include:

- Professional branding
- Clear call-to-action buttons
- Security information
- Mobile-responsive layout
- Beautiful typography
- Emoji icons for visual interest
- Footer with company info

Both templates are production-ready and follow email best practices!
