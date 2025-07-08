// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header').appendChild(mobileMenuBtn);

    const navbar = document.querySelector('.navbar');
    mobileMenuBtn.addEventListener('click', function() {
        navbar.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Modal functionality
    const modal = document.getElementById("resumeModal");
    const btn = document.getElementById("resumeModalBtn");
    const span = document.getElementsByClassName("close-modal")[0];

    // Modal open/close functions
    function openModal() {
        modal.style.display = "block";
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');
    }

    // Modal event listeners
    if (btn) btn.onclick = openModal;
    if (span) span.onclick = closeModal;
    window.onclick = function(event) {
        if (event.target == modal) closeModal();
    };

    // Navigation functionality
    function navigateToSection(targetSection) {
        // Handle resume modal
        if (targetSection === 'wil') {
            openModal();
            return;
        }
        
        // Update active nav link
        document.querySelectorAll('nav.navbar a[data-section]').forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('data-section') === targetSection) {
                link.classList.add('active-nav');
            }
        });
        
        // Update active section
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active-section');
        });
        document.getElementById(targetSection).classList.add('active-section');
        
        // Scroll to section
        if (targetSection === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            document.getElementById(targetSection).scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Set up all navigation links
    function setupNavigation() {
        // Navbar links
        document.querySelectorAll('nav.navbar a[data-section]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                navigateToSection(this.getAttribute('data-section'));
            });
        });
        
        // Hero section buttons
        document.querySelector('.hero-buttons a[data-section="contact"]')?.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToSection('contact');
        });
        
        document.querySelector('.hero-buttons a[data-section="portfolio"]')?.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToSection('portfolio');
        });
        
        // WIL section "Contact Me" button
        document.querySelector('.wil-btn-contact')?.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToSection('contact');
        });
        
        // Download buttons in modal
        document.querySelectorAll('.download-btn').forEach(button => {
            button.addEventListener('click', closeModal);
        });
    }

    // Initialize navigation
    setupNavigation();
    
    // Set home as active by default
    document.querySelector('nav.navbar a[data-section="home"]')?.classList.add('active-nav');
});