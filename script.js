// script.js - JavaScript for Sobhit Kumar's Portfolio Website

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.querySelector('.nav-links');
const downloadResumeBtn = document.getElementById('download-resume');

// Theme Toggle Functionality
function toggleTheme() {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    
    // Update icon
    themeToggle.querySelector('.icon').textContent = newTheme === 'light' ? '☀️' : '🌙';
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    themeToggle.querySelector('.icon').textContent = savedTheme === 'light' ? '☀️' : '🌙';
}

// Event listener for theme toggle
themeToggle.addEventListener('click', toggleTheme);

// Navbar Active Link on Scroll
function updateActiveNavLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

// Smooth Scrolling for Nav Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // Close mobile menu if open
        navLinksContainer.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Scroll Reveal Animations (AOS-style)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply to all sections except hero
sections.forEach(section => {
    if (section.id !== 'hero') {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    }
});

// Resume Download Functionality (Simulate download)
downloadResumeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // In a real scenario, replace with actual PDF URL
    const link = document.createElement('a');
    link.href = '#'; // Placeholder - replace with your resume PDF URL
    link.download = 'Sobhit_Kumar_Resume.pdf';
    link.click();
    alert('Resume download simulated. Replace with actual PDF link.');
});

// Button Hover Interactions (Enhance with JS if needed - CSS handles most)
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.05)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
    });
});

// Initialize on Load
window.addEventListener('load', () => {
    loadTheme();
    updateActiveNavLink();
});

// Update active nav on scroll
window.addEventListener('scroll', updateActiveNavLink);