# Rent My Room in Happy Valley 🏠

A Gen-Z friendly, mobile-first website to advertise your room in Happy Valley, Bellingham WA. This website features an interactive roommate compatibility quiz and beautiful apartment showcase.

**Live Demo:** Coming soon on Vercel!

---

## ✨ Features

### Main Website (index.html)
- **Hero Section**: Eye-catching intro with pricing and key details
- **About**: Apartment location, amenities, and vibe
- **The Vibe**: Meet the roommates and household culture
- **How We Actually Live Here**: Daily routines, chore system, living standards
- **Take a Look Around**: Interactive image gallery with zoom & pan
- **Requirements**: Clear expectations for roommates
- **Application Process**: Step-by-step guide to applying
- **Contact**: Text, call, or DM directly

### Quiz Page (quiz.html)
- 8-question compatibility assessment
- Personalized scoring (0-100%)
- Results: "Perfect Match," "Great Fit," "Maybe," or "Not a Match"
- Share results via text or DM to Charlotte
- Mobile-optimized experience

### Image Gallery & Lightbox
- Click any image to open full-screen lightbox
- Zoom in/out with buttons
- Drag to pan around zoomed images
- Navigate with arrow keys or next/prev buttons
- Smooth, responsive interactions

---

## 📁 File Structure

```
rent-my-room/
├── index.html              # Main landing page
├── quiz.html               # Compatibility quiz
├── styles.css              # Main styles
├── quiz-styles.css         # Quiz-specific styles
├── script.js               # Main interactivity
├── quiz-script.js          # Quiz logic & scoring
├── vercel.json             # Vercel deployment config
├── README.md               # This file
└── images/
    ├── main-bedroom-view.jpg
    ├── alt-bedroom-view.jpg
    ├── kitchen.jpg
    ├── full-living-room.jpg
    ├── balcony-view.jpg
    ├── closet.jpg
    ├── bookshelf.jpg
    └── quiz-images/
        ├── sleep.jpg
        ├── partners.jpg
        ├── people-over.jpeg
        ├── cleaning.jpg
        ├── chores.jpg
        ├── conflict.jpg
        ├── rent.jpg
        └── smoking.jpg
```

---

## 🎨 Design

- **Color Scheme**: Vibrant magenta (#c946a0) with soft purples
- **Typography**: Modern fonts (Outfit, Plus Jakarta Sans from Google Fonts)
- **Mobile-First**: Fully responsive design
- **Interactive**: Smooth animations, intuitive controls
- **Accessible**: Clear contrast, semantic HTML, easy navigation

---

## 🚀 Quick Deploy to Vercel

### Option 1: GitHub + Vercel (Recommended)

1. **Create a GitHub repo**
   ```bash
   git add .
   git commit -m "Initial commit: Rent My Room website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/rent-my-room.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your `rent-my-room` repository
   - Vercel will auto-detect it as a static site
   - Click "Deploy"
   - Your site is now live! 🎉

3. **Custom Domain (Optional)**
   - In Vercel project settings, add your custom domain
   - Follow DNS setup instructions

### Option 2: Vercel CLI (Quick)

```bash
npm i -g vercel
cd /Users/charlotte/rent-my-room
vercel
```

### Option 3: Netlify (Even Easier)

- Go to [netlify.com](https://netlify.com)
- Drag & drop your entire folder
- Your site is live instantly!

---

## ⚙️ Configuration

### Update Contact Info

Edit these files to change your phone number or Instagram:

**index.html** (lines 368, 377)
```html
<button id="phone-contact-btn" class="contact-info contact-button">206-981-8327</button>
<a href="https://www.instagram.com/char.lotte.anne/" target="_blank">@char.lotte.anne</a>
```

**quiz-script.js** (line ~200)
```javascript
const phoneNumber = "206-981-8327";
const instagramUrl = "https://www.instagram.com/char.lotte.anne/";
```

---

## 📸 Adding or Changing Images

### Main Website Gallery
- Update images in the `images/` folder
- Update `<img src="images/FILENAME.jpg">` in index.html (lines 231-238)

### Quiz Images
- Update images in `images/quiz-images/`
- Change the `src` attributes in quiz.html for each question

### Tips
- Keep images under 500KB for fast loading
- Use JPG format for photos (better compression)
- Images are cached for 1 year after deployment

---

## 🧪 Testing Locally

Simply open `index.html` in a browser:
```bash
# macOS
open /Users/charlotte/rent-my-room/index.html

# Or use a local server (Python 3)
cd /Users/charlotte/rent-my-room
python3 -m http.server 8000
# Then visit http://localhost:8000
```

---

## 🎯 Quiz Scoring

The quiz evaluates compatibility across:
- Sleep schedule & daily routines
- Social habits & guests
- Cleanliness standards
- Communication style
- Financial reliability
- Household rules (no smoking, no parties)

Results are personalized based on Charlotte's answers to show fit percentage.

---

## 🐛 Troubleshooting

### Images not showing after deploy?
- Check that image paths use forward slashes: `images/photo.jpg` ✓
- Ensure JPG/JPEG/PNG format (not HEIC on web)
- Verify files are in the `images/` folder

### Quiz results not showing?
- Open browser console (F12) to check for errors
- Ensure all 8 questions have selected answers
- Check that JavaScript is enabled

### Links not working?
- Verify phone number format is correct
- Check Instagram URL is public
- Test links locally before deploying

---

## 📝 Customization Ideas

- Add more quiz questions (update totalQuestions in quiz-script.js)
- Change color scheme (edit CSS variables in styles.css)
- Add TikTok or Discord links to contact section
- Create a follow-up form after quiz
- Add a calendar for tours or interviews

---

## 💬 Support

Questions about deployment? 
- **Vercel Docs**: https://vercel.com/docs
- **GitHub Pages**: https://pages.github.com/
- **Netlify**: https://docs.netlify.com/

---

**Made with 💕 for finding the perfect roommate!**
