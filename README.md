# Siddhartha Siripragada - Portfolio Website

A modern, responsive portfolio website showcasing ML/AI engineering expertise, data engineering projects, and professional experience.

## 🚀 Live Website
Visit: **https://siddharthasirpragada.github.io**


## 📋 Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern UI with smooth animations
- ✅ Fast loading and optimized performance
- ✅ SEO-friendly structure
- ✅ Interactive project showcases
- ✅ Professional experience timeline
- ✅ Skills and expertise sections
- ✅ Contact information

## 🛠️ Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (system fonts for performance)

## 📁 File Structure

```
siddharthasirpragada.github.io/
│
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # JavaScript for interactivity
└── README.md           # This file
```

## 🚀 Deployment Instructions

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click **"New repository"**
3. **IMPORTANT:** Name it exactly: `siddharthasirpragada.github.io`
4. Make it **Public**
5. ✅ Check "Add a README file"
6. Click **"Create repository"**

### Step 2: Upload Files

**Option A: Using GitHub Web Interface (Easiest)**

1. In your repository, click **"Add file"** → **"Upload files"**
2. Drag and drop these files:
   - `index.html`
   - `style.css`
   - `script.js`
3. Scroll down and click **"Commit changes"**

**Option B: Using Git Command Line**

```bash
# Clone your repository
git clone https://github.com/siddharthasirpragada/siddharthasirpragada.github.io.git

# Navigate to the directory
cd siddharthasirpragada.github.io

# Copy the downloaded files (index.html, style.css, script.js) to this folder

# Add files to git
git add .

# Commit changes
git commit -m "Initial portfolio website"

# Push to GitHub
git push origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository settings
2. Click **"Pages"** in the left sidebar
3. Under **"Source"**, select **"main"** branch
4. Click **"Save"**
5. Wait 1-2 minutes

### Step 4: Visit Your Site!

Your website will be live at:
**https://siddharthasirpragada.github.io**

## 🎨 Customization Guide

### Update Personal Information

Open `index.html` and update:

- **Line 30:** Your name in navigation
- **Line 42-45:** Hero section text
- **LinkedIn URL:** Replace `https://linkedin.com/in/siddharthasiripragada`
- **GitHub URL:** Replace `https://github.com/siddharthasirpragada`
- **Email:** Replace `Siddarthasiripragada@gmail.com`

### Change Colors

Open `style.css` and modify CSS variables (lines 9-17):

```css
:root {
    --primary-color: #2563eb;      /* Main blue color */
    --secondary-color: #7c3aed;    /* Purple accent */
    --accent-color: #06b6d4;       /* Cyan accent */
}
```

### Add Profile Photo

1. Add your photo file (e.g., `profile.jpg`) to the repository
2. In `index.html`, add after line 40:
```html
<div class="profile-photo">
    <img src="profile.jpg" alt="Siddhartha Siripragada">
</div>
```

3. Add this CSS to `style.css`:
```css
.profile-photo {
    width: 200px;
    height: 200px;
    margin: 0 auto 2rem;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid #2563eb;
}

.profile-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

### Add Projects

In `index.html`, find the `<!-- Projects Section -->` and add:

```html
<div class="project-card">
    <div class="project-header">
        <i class="fas fa-project-diagram project-icon"></i>
        <h3>Your Project Name</h3>
    </div>
    <p class="project-description">
        Project description here...
    </p>
    <div class="project-tech">
        <span>Python</span>
        <span>TensorFlow</span>
        <span>AWS</span>
    </div>
</div>
```

## 📱 Responsive Breakpoints

- **Mobile:** < 480px
- **Tablet:** 481px - 768px
- **Desktop:** > 768px

## 🔧 Troubleshooting

### Site not loading?
- Wait 2-3 minutes after first deployment
- Check repository name is exactly: `siddharthasirpragada.github.io`
- Ensure repository is **Public**, not Private
- Verify files are in the root directory (not in a subfolder)

### Links not working?
- Check all internal links start with `#` (e.g., `#about`, `#projects`)
- Verify external links include `https://`

### Icons not showing?
- The Font Awesome CDN link in `index.html` should be intact
- Check your internet connection

## 📈 Future Enhancements

Consider adding:
- [ ] Blog section with technical articles
- [ ] Project detail pages
- [ ] Resume download link
- [ ] Dark mode toggle
- [ ] Animation on scroll
- [ ] Project images/screenshots
- [ ] Testimonials section
- [ ] Contact form with backend

## 🤝 Contributing

This is a personal portfolio, but suggestions are welcome! 
Open an issue or submit a pull request.

## 📄 License

This project is open source and available under the MIT License.

## 📞 Contact

- **Email:** Siddarthasiripragada@gmail.com
- **LinkedIn:** [linkedin.com/in/siddharthasiripragada](https://linkedin.com/in/siddharthasiripragada)
- **Location:** Toronto, Ontario, Canada

---

**Built with ❤️ by Siddhartha Siripragada**

Last Updated: February 2025
