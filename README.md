# Rent My Room in Happy Valley

Room rental landing page with compatibility quiz and image gallery. Mobile-first, Gen-Z focused.

## 📁 Structure

```
├── index.html           # Main landing page
├── quiz.html            # 8-question compatibility quiz
├── styles.css           # Main styles (magenta theme)
├── quiz-styles.css      # Quiz styles
├── script.js            # Lightbox gallery + smooth scroll
├── quiz-script.js       # Quiz logic & scoring
├── vercel.json          # Static site config
└── images/
    ├── *.jpg            # 7 gallery images
    └── quiz-images/     # 8 quiz images
```

## ✨ Features

- **Landing Page**: Hero, about, vibe, roommate requirements, application steps
- **Quiz**: 8 questions → compatibility score → text/DM results
- **Gallery**: Click-to-zoom lightbox with pan & keyboard nav
- **Responsive**: Mobile-first, works on all devices
- **Auto-deploy**: Vercel + GitHub = auto-redeploy on push

## 🎨 Colors

```css
--primary: #c946a0        /* Magenta */
--secondary: #7c6b8f      /* Purple */
--accent: #ffd700         /* Gold */
```

## 🚀 Deploy

```bash
# 1. Push to GitHub
git push origin main

# 2. Vercel auto-deploys on push
# Dashboard: https://vercel.com/dashboard
```

## ⚙️ Config Changes

**Phone/Instagram** → Update in `index.html` (lines 368, 377) and `quiz-script.js`

**Quiz questions** → Edit `quiz.html`, update `totalQuestions` in `quiz-script.js`

**Images** → Replace files in `images/` and `images/quiz-images/`

**Colors** → Edit CSS variables in `styles.css` `:root`

## 🧪 Local Dev

```bash
# Option 1: Direct
open index.html

# Option 2: Local server
python3 -m http.server 8000
# Visit http://localhost:8000
```

## 📊 Quiz Logic

- 8 questions scored 1-4 points each (max 32)
- Score converted to 0-100%
- Results: Perfect (80+), Great (60-79), Maybe (40-59), No (0-39)
- Personalized based on Charlotte's answers

## 🔗 Key Elements

| Element | File | Line(s) |
|---------|------|---------|
| Contact button | index.html | 368 |
| Instagram link | index.html | 377 |
| Gallery images | index.html | 231-238 |
| Quiz image sources | quiz.html | ~60-150 |
| Scoring logic | quiz-script.js | ~150-200 |

## 🐛 Common Issues

- **Images not showing**: Check `images/` folder, use JPG not HEIC
- **Quiz broken**: Verify `totalQuestions` matches number of questions
- **Links dead**: Check phone format, Instagram URL is public
- **JS errors**: Open console (F12), check file paths are correct

## 🔒 Security

- **No external API calls** - All data is client-side
- **No user data collection** - Quiz results never leave user's device
- **No cookies or tracking** - HTTPS recommended for deployment
- **Sanitized content** - All HTML generated from trusted internal strings
- **CSP ready** - Can add Content-Security-Policy headers via Vercel config

### Best Practices Implemented

- ✅ HTTPS on Vercel (automatic)
- ✅ No sensitive data in localStorage
- ✅ Form validation client-side
- ✅ No external script dependencies
- ✅ Escape user input (SMS encoding with `encodeURIComponent`)



```bash
# Make changes locally
git add .
git commit -m "Update: description"
git push origin main
# Vercel redeploys automatically (~1 min)
```

## 📝 Tech Stack

- HTML5 (semantic)
- CSS3 (Flexbox/Grid, animations)
- Vanilla JS (no dependencies)
- Google Fonts (Outfit, Plus Jakarta Sans)
- Static hosting (Vercel/Netlify/GitHub Pages)
# Fresh commit with correct email
