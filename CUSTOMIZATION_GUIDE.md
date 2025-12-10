# 🎨 Website Customization Guide

This guide will help you easily customize your personal website to match your style and preferences.

## 📝 Quick Start

Your website consists of three main files:
- `index.html` - Structure and content
- `styles.css` - Visual design and styling
- `script.js` - Interactive features

## 🔧 Basic Customization

### 1. Personal Information

**Edit `index.html` to update:**

#### Hero Section (Lines 30-50)
```html
<span class="hero-name">Your Name</span>  <!-- Change to your actual name -->
<span class="typing-text">Creative. Developer. Dreamer.</span>  <!-- Your tagline -->
```

#### About Section (Lines 69-90)
```html
<p class="about-paragraph">
    <!-- Replace with your own bio -->
    Welcome to my personal space on the web! ...
</p>
```

#### Profile Card (Lines 98-104)
```html
<h3>Update Me!</h3>  <!-- Your name/title -->
<p>Add your photo and info</p>  <!-- Your description -->
```

Replace the `?` initial with your actual initial or add a profile image:
```html
<div class="profile-image-placeholder">
    <img src="your-photo.jpg" alt="Your Name">
</div>
```

### 2. Interests/Skills

**Edit `index.html` (Lines 111-156):**

Each interest card looks like this:
```html
<div class="interest-card">
    <div class="interest-icon">💻</div>  <!-- Change emoji -->
    <h3 class="interest-title">Technology</h3>  <!-- Change title -->
    <p class="interest-description">
        Exploring the latest in tech and innovation  <!-- Change description -->
    </p>
</div>
```

**To add more interests:** Copy an entire interest-card div and paste it before the closing `</div>` of interests-grid.

### 3. Projects

**Edit `index.html` (Lines 163-223):**

Each project card structure:
```html
<div class="project-card">
    <div class="project-header">
        <div class="project-icon">🎯</div>  <!-- Change emoji -->
        <span class="project-tag">Featured</span>  <!-- Change tag -->
    </div>
    <h3 class="project-title">Project One</h3>  <!-- Your project name -->
    <p class="project-description">
        A brief description...  <!-- Your project description -->
    </p>
    <div class="project-tags">
        <span class="tag">Tag1</span>  <!-- Add your tech stack -->
        <span class="tag">Tag2</span>
    </div>
    <a href="#" class="project-link">View Project →</a>  <!-- Add project URL -->
</div>
```

**To add more projects:** Copy the entire project-card div.

### 4. Contact Links

**Edit `index.html` (Lines 238-257):**

Update the `href` attributes with your actual social media URLs:
```html
<a href="https://github.com/yourusername" class="social-link" aria-label="GitHub">
<a href="https://linkedin.com/in/yourusername" class="social-link" aria-label="LinkedIn">
<a href="https://twitter.com/yourusername" class="social-link" aria-label="Twitter">
<a href="mailto:your.email@example.com" class="social-link" aria-label="Email">
```

### 5. Footer

**Edit `index.html` (Lines 285-290):**
```html
<p>&copy; 2024 Your Name. Made with ❤️ and creativity.</p>  <!-- Update your name -->
```

## 🎨 Styling Customization

### Colors & Theme

**Edit `styles.css` (Lines 5-30) - CSS Variables:**

#### Light Theme:
```css
:root {
    --bg-primary: #f8f9fa;  /* Main background color */
    --bg-secondary: #ffffff;  /* Secondary background */
    --text-primary: #1a1a1a;  /* Main text color */
    --text-secondary: #4a5568;  /* Secondary text color */
    --accent-primary: #6366f1;  /* Primary accent (buttons, links) */
    --accent-secondary: #8b5cf6;  /* Secondary accent */
    --accent-tertiary: #ec4899;  /* Tertiary accent */
}
```

#### Dark Theme:
```css
[data-theme="dark"] {
    --bg-primary: #0f0f1e;  /* Dark main background */
    --bg-secondary: #1a1a2e;  /* Dark secondary background */
    /* ... customize other dark theme colors ... */
}
```

### Gradients

**Change gradient colors (Lines 16-20):**
```css
--gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
--gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
--gradient-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
```

Use a gradient generator like [cssgradient.io](https://cssgradient.io/) to create custom gradients.

### Fonts

**Edit `styles.css` (Line 57):**
```css
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...;
}
```

To use Google Fonts:
1. Add to `index.html` `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap" rel="stylesheet">
```

2. Update CSS:
```css
body {
    font-family: 'Poppins', sans-serif;
}
```

## ⚡ Interactive Features

### Typing Text Animation

**Edit `script.js` (Lines 99-102):**
```javascript
const phrases = [
    'Creative. Developer. Dreamer.',  // Change these phrases
    'Building amazing experiences.',
    'Turning ideas into reality.',
    'Always learning, always growing.'
];
```

### Navigation Links

**Edit `index.html` (Lines 19-25):**

To add a new navigation link:
```html
<li><a href="#newsection">New Section</a></li>
```

Then create the corresponding section:
```html
<section id="newsection" class="section">
    <div class="container">
        <h2 class="section-title">New Section Title</h2>
        <!-- Your content here -->
    </div>
</section>
```

## 🖼️ Adding Images

### Profile Photo

Replace the placeholder in `index.html`:
```html
<!-- Before -->
<div class="profile-image-placeholder">
    <span class="profile-initial">?</span>
</div>

<!-- After -->
<div class="profile-image-placeholder">
    <img src="images/profile.jpg" alt="Your Name" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">
</div>
```

### Project Images

Add images to project cards:
```html
<div class="project-card">
    <img src="images/project1.jpg" alt="Project Name" style="width: 100%; border-radius: 15px; margin-bottom: 1rem;">
    <!-- Rest of project card content -->
</div>
```

## 🎯 Advanced Customization

### Adding New Sections

Template for a new section:
```html
<section id="unique-id" class="section">
    <div class="container">
        <h2 class="section-title">Section Title</h2>
        <div class="section-content">
            <!-- Your content here -->
        </div>
    </div>
</section>
```

For alternating backgrounds, add this class:
```html
<section id="unique-id" class="section" style="background: var(--bg-secondary);">
```

### Custom Animations

Add custom animations in `styles.css`:
```css
@keyframes myAnimation {
    0% { opacity: 0; transform: scale(0.8); }
    100% { opacity: 1; transform: scale(1); }
}

.my-element {
    animation: myAnimation 0.5s ease;
}
```

### Optional Features

**Enable features in `script.js`:**

1. **Custom Cursor** (Line 188):
```javascript
const enableCustomCursor = true;  // Change from false to true
```

2. **Scroll Progress Bar** (Line 307):
```javascript
createScrollIndicator();  // Uncomment this line
```

## 📱 Responsive Design

The website is already mobile-responsive! Test different screen sizes:
- Desktop: 1200px+
- Tablet: 768px - 1200px
- Mobile: < 768px

Responsive breakpoints are at lines 790+ in `styles.css`.

## 🚀 Deployment

### GitHub Pages
1. Push all files to your repository
2. Go to Settings → Pages
3. Select main branch → Save
4. Your site will be at `https://yourusername.github.io/repository-name`

### Netlify
1. Connect your GitHub repository to Netlify
2. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: `/`
3. Click Deploy

### Vercel
1. Import your GitHub repository
2. Framework Preset: Other
3. Click Deploy

## 💡 Tips

1. **Start Small**: Change one thing at a time and preview
2. **Save Often**: Commit changes to Git regularly
3. **Test Mobile**: Always check mobile responsiveness
4. **Use Browser DevTools**: Press F12 to inspect and test changes
5. **Backup**: Keep a copy of original files before major changes

## 🎨 Color Inspiration

Great resources for color schemes:
- [Coolors.co](https://coolors.co/) - Color palette generator
- [Color Hunt](https://colorhunt.co/) - Curated color palettes
- [Gradient Hunt](https://gradienthunt.com/) - Beautiful gradients

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/) - HTML/CSS/JS reference
- [CSS-Tricks](https://css-tricks.com/) - CSS tutorials
- [Can I Use](https://caniuse.com/) - Browser compatibility

## 🐛 Troubleshooting

**Problem: Changes not showing**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache

**Problem: Layout broken**
- Check for missing closing tags in HTML
- Validate HTML at [validator.w3.org](https://validator.w3.org/)
- Check CSS syntax

**Problem: JavaScript not working**
- Open browser console (F12) to check for errors
- Ensure script.js is linked correctly in HTML

## 🤝 Need Help?

If you get stuck:
1. Check browser console for errors (F12 → Console tab)
2. Validate your HTML and CSS
3. Compare with the original files
4. Search for specific issues online

---

**Remember:** This is YOUR website. Experiment, have fun, and make it unique! 🚀✨
