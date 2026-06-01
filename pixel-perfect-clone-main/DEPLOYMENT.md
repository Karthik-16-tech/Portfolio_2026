# 🚀 Deployment Guide

This guide covers deploying your portfolio to **Vercel** and setting up GitHub integration.

---

## 📋 Pre-Deployment Checklist

- [ ] All code committed to Git
- [ ] No hardcoded API keys or secrets
- [ ] `npm run build` runs successfully
- [ ] `npm run lint` passes without errors
- [ ] `npm run format` has been run
- [ ] `.env.example` is up-to-date
- [ ] `.gitignore` excludes sensitive files
- [ ] `README.md` is current
- [ ] All dependencies are in `package.json`

---

## 🐙 GitHub Setup

### 1. Initialize Git Repository (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: Portfolio website"
```

### 2. Create GitHub Repository

- Go to [github.com/new](https://github.com/new)
- Create a public repository named `pixel-perfect-clone` or similar
- **Do NOT** initialize with README (we already have one)

### 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/pixel-perfect-clone.git
git branch -M main
git push -u origin main
```

### 4. GitHub Settings

1. Go to repository **Settings**
2. Enable **GitHub Pages** (if needed for documentation)
3. Add branch protection rules for `main`:
   - Require status checks to pass before merging
   - Require reviews before merging

---

## ✅ Vercel Deployment

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI globally (if not installed)
npm install -g vercel

# Deploy from project directory
cd pixel-perfect-clone-main
vercel

# Follow the prompts:
# - Link to existing project? No (first time)
# - Set project name: pixel-perfect-clone
# - Framework preset: Other
# - Root directory: ./
# - Build command: npm run build
# - Output directory: dist
```

### Option 2: Using Vercel Dashboard (Recommended)

1. **Sign in** to [vercel.com](https://vercel.com) (or create an account)
2. **Import Project**
   - Click "Add New" → "Project"
   - Select "Import Git Repository"
   - Connect your GitHub account
   - Select the `pixel-perfect-clone` repository
3. **Configure Project**
   - **Framework Preset:** Other / Vite
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. **Environment Variables** (if needed)
   - Add any from `.env.example`
   - Example: `VITE_SPLINE_URL`
5. **Deploy!**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)

---

## 🔧 Environment Variables on Vercel

### Setting Environment Variables

1. Go to project settings on Vercel
2. Navigate to **Settings** → **Environment Variables**
3. Add variables needed for production:

```
NODE_ENV = production
VITE_SPLINE_URL = https://my.spline.design/nexbotrobotcharacterconcept-qHLCSFfR3fVJ7ErpwpUKlogS/
```

### Development vs Production

```bash
# Development
VITE_API_URL = http://localhost:3000

# Production (Vercel)
VITE_API_URL = https://your-domain.vercel.app
```

---

## 🌐 Custom Domain Setup

### Connect Custom Domain on Vercel

1. Go to **Settings** → **Domains**
2. Add your custom domain (e.g., `karthik-portfolio.com`)
3. Update DNS records at your domain provider:

**For Vercel nameservers (recommended):**
- Change nameservers to Vercel's at your domain registrar

**For CNAME records:**
```
CNAME: www → cname.vercel.app
A record: @ → 76.76.19.135
```

4. Wait for DNS propagation (5-30 minutes)

---

## 📊 Vercel Analytics & Monitoring

### Enable Analytics

1. **Settings** → **Analytics**
2. Toggle "Enable Analytics"
3. View in dashboard:
   - Page performance
   - Core Web Vitals
   - Request metrics

### Web Vitals

Monitor your site's performance:
```bash
npm install web-vitals
```

Track metrics in production via Vercel dashboard.

---

## 🔐 Security & Production Best Practices

### 1. Security Headers (Already in vercel.json)

```json
{
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()"
}
```

### 2. Environment Secrets

**Never commit:**
- API keys
- Database credentials
- Private tokens
- AWS keys

**Store on Vercel:**
- Use "Encrypted" toggle for sensitive variables
- They won't be logged or exposed

### 3. Build Optimization

Your `package.json` is already optimized:

```json
{
  "scripts": {
    "build": "vite build",      // Minified production build
    "preview": "vite preview"   // Test production build locally
  },
  "type": "module"              // ES modules
}
```

### 4. Content Security Policy (CSP)

Add to `vercel.json` if needed:

```json
{
  "source": "/(.*)",
  "headers": [
    {
      "key": "Content-Security-Policy",
      "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://my.spline.design; style-src 'self' 'unsafe-inline'"
    }
  ]
}
```

---

## 🧪 Testing Production Build Locally

Before deploying, test the production build:

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Open http://localhost:5000 in your browser
```

Check for:
- ✅ All images load correctly
- ✅ Animations smooth and performant
- ✅ No console errors
- ✅ Mobile responsiveness
- ✅ 3D Spline elements load
- ✅ Forms work properly

---

## 🚨 Troubleshooting Deployments

### Build Fails on Vercel

**Check build logs:**
1. Go to "Deployments" → Failed build
2. Click to view build logs
3. Look for errors

**Common issues:**

```bash
# Out of memory during build
# Solution: Check for large dependencies or recursive imports

# Module not found
# Solution: Verify import paths, check package.json

# Environment variable missing
# Solution: Add to Vercel Settings → Environment Variables
```

### Slow Performance

```bash
# Analyze bundle size
npm install -g vite
npx vite-plugin-visualizer dist/stats.html

# Check for:
# - Large dependencies
# - Duplicate dependencies
# - Unused code
```

### 3D Elements Not Loading

- Verify Spline URL is correct
- Check if Spline domain is in CSP whitelist
- Test with VPN disabled
- Check browser console for CORS errors

---

## 📈 Monitoring & Maintenance

### Daily Monitoring

- Check Vercel Analytics dashboard
- Monitor Core Web Vitals
- Review error logs

### Weekly

- Run `npm audit` for security updates
- Check GitHub for dependency updates
- Review deployment history

### Monthly

- Update dependencies: `npm update`
- Run full security audit: `npm audit fix`
- Review and update README
- Check analytics trends

---

## 🔄 Continuous Deployment

### Automatic Deployments

Vercel automatically deploys when you:

1. **Push to main branch**
   - Production deployment
   - Full build & optimization
   - Live immediately

2. **Create pull requests**
   - Preview deployment created
   - Unique URL for testing
   - See changes before merge

3. **Merge pull requests**
   - Production deployment triggered
   - Old preview destroyed

### Setting Up Branch Rules

```bash
# Protect main branch from direct pushes
# Require pull request reviews before merging

git branch -d main  # Delete local if exists
git checkout -b develop
git push -u origin develop
```

---

## 📝 Deployment Status Badge

Add to your GitHub README:

```markdown
[![Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https%3A%2F%2Fgithub.com%2FYOUR_USERNAME%2Fpixel-perfect-clone)

## Deployment Status
- **Production:** [Live on Vercel](https://pixel-perfect-clone.vercel.app)
- **GitHub:** [Repository](https://github.com/YOUR_USERNAME/pixel-perfect-clone)
```

---

## 🎉 Post-Deployment

### Share Your Portfolio

- Add URL to GitHub profile bio
- Share on LinkedIn
- Add to resume/CV
- Share on Twitter/social media

### Monitor & Iterate

1. Collect analytics data
2. Get user feedback
3. Make improvements
4. Deploy updates automatically

---

## 🆘 Getting Help

- **Vercel Docs:** https://vercel.com/docs
- **GitHub Issues:** Check repository issues
- **Vite Documentation:** https://vitejs.dev
- **TanStack Router:** https://tanstack.com/router
- **Stack Overflow:** Tag with `vercel`, `vite`, `react`

---

## ✨ Success Checklist

After deployment, verify:

- [ ] Website is live and accessible
- [ ] Domain points to deployment
- [ ] All pages load without errors
- [ ] Mobile responsive works
- [ ] 3D Spline elements render
- [ ] Analytics tracking works
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] Performance score is good (>80)
- [ ] Core Web Vitals pass
- [ ] SEO metadata correct

---

**🎊 Congratulations! Your portfolio is now deployed to production!**

For questions, check the main README.md or reach out via GitHub issues.

---

**Last Updated:** June 2026
**Deployment Platform:** Vercel
**Repository:** GitHub
