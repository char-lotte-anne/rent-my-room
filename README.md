# Happy Valley Room Rental Website

A Gen-Z friendly, mobile-first website to advertise your room in Happy Valley, Bellingham WA.

## 📁 Files

- **index.html** - Main landing page with apartment details, roommate info, application process
- **quiz.html** - Interactive BuzzFeed-style roommate compatibility quiz
- **styles.css** - Main website styles
- **quiz-styles.css** - Quiz-specific styles
- **script.js** - Main website interactions
- **quiz-script.js** - Quiz logic, scoring, and results
- **images/** - Folder with apartment photos (HEIC format)

## 🎯 Features

### Main Website (index.html)
- Beautiful hero section with call-to-action
- Quick facts about the apartment
- Roommate profiles and household vibe
- Clear requirements and expectations
- Interview question preview
- Application process steps with Landmark link
- Contact information

### Quiz Page (quiz.html)
- 10-question compatibility assessment
- Images from your apartment gallery
- Real-time progress tracking
- Interactive radio-button answers
- Instant scoring (0-100%)
- Personalized results based on responses
- Categorized feedback ("Perfect Match," "Great Fit," "Maybe," "Not a Match")
- Direct CTAs to contact (text/call/Instagram)

## 🎨 Design

- **Color Scheme**: Vibrant magenta (#c946a0) with soft purples, matching your flyer
- **Typography**: Modern fonts (Outfit, Plus Jakarta Sans)
- **Mobile-First**: Fully responsive design
- **Accessibility**: Clear labels, good contrast, easy navigation

## 📸 Photos

The quiz automatically pulls images from the `images/` folder:
- main-bedroom-view.jpg - Main bedroom (hero image & quiz)
- alt-bedroom-view.jpg - Alternate bedroom angle
- kitchen.jpg - Kitchen space
- full-living-room.jpg - Living room view
- balcony-view.jpg - Balcony/outdoor space

## 🎯 Quiz Scoring

The quiz analyzes answers across key dimensions:
- Sleep schedule alignment
- Social compatibility
- Cleanliness standards
- Communication style
- Financial reliability
- House rules (no smoking, no parties)

Results include:
- Compatibility percentage
- Specific strengths
- Areas of concern
- Contact information for interested candidates

## 📱 Deployment Options

- **Netlify**: Drag & drop the entire folder
- **Vercel**: Connect your GitHub repo
- **GitHub Pages**: Push to a gh-pages branch
- **Any web host**: Upload all files maintaining folder structure

## 💡 Tips

- Test the quiz yourself to see how it works
- Make sure images are visible (convert HEIC to JPG if needed for maximum compatibility)
- Update phone number/Instagram handle in both index.html and quiz.html if needed
- Add more photos by updating the image paths in quiz.html
