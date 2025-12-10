// ==================== //
// Theme Toggle
// ==================== //

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('.theme-icon');

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// ==================== //
// Mobile Menu Toggle
// ==================== //

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ==================== //
// Smooth Scroll with Offset
// ==================== //

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = document.querySelector('.nav-container').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== //
// Intersection Observer for Animations
// ==================== //

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .interest-card, .project-card, .stat-card').forEach(el => {
    observer.observe(el);
});

// ==================== //
// Navbar Scroll Effect & Parallax
// ==================== //

let lastScroll = 0;
const nav = document.querySelector('.nav-container');
const hero = document.querySelector('.hero-background');
const floatingCards = document.querySelectorAll('.floating-card');

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    
    // Navbar effect
    if (currentScroll > 100) {
        nav.style.padding = '0.5rem 0';
        nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.padding = '1rem 0';
        nav.style.boxShadow = 'none';
    }
    
    // Parallax effect for hero
    if (hero) {
        hero.style.transform = `translateY(${currentScroll * 0.5}px)`;
    }
    
    floatingCards.forEach((card, index) => {
        const speed = 0.1 + (index * 0.05);
        card.style.transform = `translateY(${currentScroll * speed}px)`;
    });
    
    lastScroll = currentScroll;
};

window.addEventListener('scroll', throttle(handleScroll, 16));

// ==================== //
// Typing Effect for Hero
// ==================== //

const typingText = document.querySelector('.typing-text');
const phrases = [
    'Creative. Developer. Dreamer.',
    'Building amazing experiences.',
    'Turning ideas into reality.',
    'Always learning, always growing.'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing effect
setTimeout(typeEffect, 1000);



// ==================== //
// Dynamic Year in Footer
// ==================== //

const updateYear = () => {
    const yearElement = document.querySelector('.footer-content p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        const text = yearElement.textContent;
        yearElement.textContent = text.replace(/\d{4}/, currentYear);
    }
};

updateYear();

// ==================== //
// Mouse Trail Effect (Optional)
// ==================== //

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Create custom cursor (optional, can be enabled/disabled)
const enableCustomCursor = false; // Set to true to enable

if (enableCustomCursor) {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: rgba(99, 102, 241, 0.3);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
    `;
    document.body.appendChild(cursor);
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// ==================== //
// Card Hover Tilt Effect
// ==================== //

const cards = document.querySelectorAll('.interest-card, .project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== //
// Console Easter Egg
// ==================== //

console.log('%c👋 Hello, curious developer!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cWelcome to my website. Feel free to explore the code!', 'font-size: 14px; color: #764ba2;');
console.log('%cIf you want to customize this site, check out the inline comments in the HTML, CSS, and JS files.', 'font-size: 12px; color: #888;');

// ==================== //
// Performance Optimization
// ==================== //

// Lazy load images (if you add images later)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==================== //
// Accessibility Improvements
// ==================== //

// Add focus styles for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ==================== //
// Service Worker Registration (for PWA support)
// ==================== //

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment the line below if you create a service-worker.js file
        // navigator.serviceWorker.register('/service-worker.js');
    });
}

// ==================== //
// Social Share Function (Optional)
// ==================== //

function shareWebsite() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: 'Check out my personal website!',
            url: window.location.href
        }).catch(err => console.log('Error sharing:', err));
    }
}

// ==================== //
// Dark Mode Detection (System Preference)
// ==================== //

// Only apply system preference on first visit if no saved preference
if (!localStorage.getItem('theme')) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = prefersDark ? 'dark' : 'light';
    body.setAttribute('data-theme', initialTheme);
    updateThemeIcon(initialTheme);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        body.setAttribute('data-theme', newTheme);
        updateThemeIcon(newTheme);
    }
});

// ==================== //
// Scroll Progress Indicator (Optional)
// ==================== //

const createScrollIndicator = () => {
    const indicator = document.createElement('div');
    indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 9999;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(indicator);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        indicator.style.width = scrolled + '%';
    });
};

// Uncomment to enable scroll progress indicator
// createScrollIndicator();
