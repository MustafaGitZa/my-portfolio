// script.js
document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // MOBILE MENU FUNCTIONALITY
    // =============================================
    const mobileMenuBtn = document.createElement('div');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('header').prepend(mobileMenuBtn);

    const navbar = document.querySelector('.navbar');
    const header = document.querySelector('header');

    // Toggle mobile menu
    function toggleMobileMenu() {
        navbar.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        header.classList.toggle('menu-open');
        
        // Toggle body overflow when menu is open
        if (navbar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking a link or overlay
    function closeMobileMenu() {
        if (window.innerWidth <= 768) {
            navbar.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            header.classList.remove('menu-open');
            document.body.style.overflow = 'auto';
        }
    }

    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking overlay
    header.addEventListener('click', function(e) {
        if (e.target === header && header.classList.contains('menu-open')) {
            closeMobileMenu();
        }
    });

    // =============================================
    // MODAL FUNCTIONALITY
    // =============================================
    const modal = document.getElementById("resumeModal");
    const btn = document.getElementById("resumeModalBtn");
    const span = document.getElementsByClassName("close-modal")[0];

    function openModal() {
        modal.style.display = "block";
        document.body.style.overflow = 'hidden';
        document.body.classList.add('modal-open');
        closeMobileMenu(); // Close mobile menu if open
    }

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');
    }

    if (btn) btn.onclick = openModal;
    if (span) span.onclick = closeModal;
    
    window.onclick = function(event) {
        if (event.target == modal) closeModal();
    };

    // =============================================
    // NAVIGATION FUNCTIONALITY
    // =============================================
    function navigateToSection(targetSection, e) {
        if (e) e.preventDefault();
        
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
        
        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            targetElement.classList.add('active-section');
            
            // Scroll to section
            if (targetSection === 'home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    // Set up all navigation links
    function setupNavigation() {
        // Navbar links
        document.querySelectorAll('nav.navbar a[data-section]').forEach(link => {
            link.addEventListener('click', function(e) {
                navigateToSection(this.getAttribute('data-section'), e);
            });
        });
        
        // Hero section buttons
        document.querySelector('.hero-buttons a[data-section="contact"]')?.addEventListener('click', function(e) {
            navigateToSection('contact', e);
        });
        
        document.querySelector('.hero-buttons a[data-section="portfolio"]')?.addEventListener('click', function(e) {
            navigateToSection('portfolio', e);
        });
        
        // WIL section "Contact Me" button
        document.querySelector('.wil-btn-contact')?.addEventListener('click', function(e) {
            navigateToSection('contact', e);
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
    
    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
});