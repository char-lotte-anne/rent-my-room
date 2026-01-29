# 🚀 Deployment Guide - Rent My Room Website

Your website is now ready to go live! Here's exactly how to deploy it.

---

## ✅ What's Ready

- ✅ Git initialized (`.git` folder)
- ✅ Initial commit created
- ✅ `.gitignore` configured (excludes HEIC files, OS files, etc.)
- ✅ `vercel.json` optimized for static site hosting
- ✅ All HTML, CSS, JS files ready
- ✅ Images optimized (JPGs for web)

---

## 🎯 Choose Your Deployment Option

### **OPTION 1: Vercel (Recommended) ⭐**

**Best for:** Automatic deploys, custom domain, best performance

#### Step 1: Push to GitHub

```bash
cd /Users/charlotte/rent-my-room

# Create a new GitHub repo at github.com/new
# Name it: rent-my-room

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/rent-my-room.git
git branch -M main
git push -u origin main
```

#### Step 2: Deploy on Vercel

1. Go to https://vercel.com
2. Sign up or log in (you can use your GitHub account)
3. Click "New Project"
4. Select your `rent-my-room` repository
5. Vercel will auto-detect it as a static site
6. Click "Deploy"
7. **Your site is LIVE!** 🎉

Your URL will be: `rent-my-room.vercel.app` (or your custom domain)

**To add a custom domain:**
- After deployment, go to Project Settings → Domains
- Add your custom domain (e.g., `rentmyroom.com`)
- Follow DNS setup instructions

---

### **OPTION 2: Netlify Drop (Easiest) 💜**

**Best for:** Zero configuration, instant deploy

1. Go to https://app.netlify.com/drop
2. Drag & drop your `/Users/charlotte/rent-my-room` folder
3. Done! Your site is live instantly

Your URL will be: `eager-something.netlify.app`

---

### **OPTION 3: GitHub Pages (Free)**

**Best for:** GitHub-integrated hosting, no third party

```bash
cd /Users/charlotte/rent-my-room

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/rent-my-room.git
git branch -M main
git push -u origin main

# Then enable Pages in GitHub repo settings:
# Settings → Pages → Source: main branch → Save
```

Your URL will be: `YOUR_USERNAME.github.io/rent-my-room`

---

## 📋 Post-Deployment Checklist

After deploying, test everything:

- [ ] Main page loads and looks good on mobile
- [ ] All images display (bedroom, kitchen, gallery, quiz images)
- [ ] Header navigation scrolls to correct sections
- [ ] "Take the Compatibility Quiz" button works
- [ ] Quiz loads all 8 questions with images
- [ ] Quiz scoring works and shows results
- [ ] Text/DM buttons open messaging apps
- [ ] Instagram link opens correctly
- [ ] Gallery images zoom and pan smoothly
- [ ] Website is responsive on phone, tablet, desktop

---

## 🔄 Making Updates

After you deploy, updating is easy:

```bash
# Make changes to your files
# Then:

git add .
git commit -m "Update: description of changes"
git push origin main

# Vercel/Netlify auto-deploys! Your site updates within seconds.
```

---

## 🎨 Before You Go Live

### Consider These Updates:

1. **Update your contact info** (if not already done)
   - Phone: 206-981-8327
   - Instagram: @char.lotte.anne

2. **Check all images display**
   - Main gallery: 7 images
   - Quiz: 8 question images

3. **Review the content**
   - Does it feel authentic to you?
   - Are all requirements clear?
   - Is the tone right?

4. **Test the quiz**
   - Go through all 8 questions
   - Check scoring
   - Verify results are personalized

---

## 🎯 Marketing Tips

Once live, share your site:

- **Instagram Stories**: Link in bio
- **WWU Group Chats**: Send quiz link
- **Campus Flyers**: Add QR code to website
- **Housing Facebook Groups**: Post the link
- **Friends**: Share with anyone you know at WWU

---

## 🆘 Troubleshooting

### Site shows "404 Not Found"
- Check GitHub repo is public
- Make sure Pages/Deploy is enabled
- Wait a few minutes for first deploy

### Images not showing
- Check file paths use forward slashes
- Verify files are committed to git
- Use JPG format (not HEIC)

### Quiz not working
- Open browser console (F12 → Console)
- Look for error messages
- Check all quiz HTML is there
- Verify quiz-script.js is linked

### Custom domain not working
- DNS changes can take up to 24 hours
- Check DNS records were added correctly
- Verify domain is not expired

---

## 📞 Support Resources

- **Vercel Help**: https://vercel.com/support
- **Netlify Docs**: https://docs.netlify.com
- **GitHub Pages**: https://pages.github.com

---

## 🎉 You're All Set!

Your website is ready to go live and help you find the perfect roommate. Good luck! 💕

Questions? Feel free to reach out!
