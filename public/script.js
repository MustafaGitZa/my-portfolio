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
        
        document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : 'auto';
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close mobile menu
    function closeMobileMenu() {
        if (window.innerWidth <= 768) {
            navbar.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            header.classList.remove('menu-open');
            document.body.style.overflow = 'auto';
        }
    }

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
        closeMobileMenu();
    }

    function closeModal() {
        modal.style.display = "none";
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');
    }

    if (btn) btn.addEventListener('click', openModal);
    if (span) span.addEventListener('click', closeModal);
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) closeModal();
        if (event.target === header && header.classList.contains('menu-open')) closeMobileMenu();
    });

    // =============================================
    // IMPROVED NAVIGATION FUNCTIONALITY
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
            
            // Scroll to section with navbar offset
            const navbarHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetSection === 'home' ? 0 : 
                targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
        
        closeMobileMenu();
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

    // Initialize navigation and set home as active by default
    setupNavigation();
    document.querySelector('nav.navbar a[data-section="home"]')?.classList.add('active-nav');
    
    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // =============================================
    // STICKY NAVBAR SCROLL BEHAVIOR
    // =============================================
    const headerElement = document.querySelector('header');
    let lastScrollPosition = 0;

    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;
        
        // Always show navbar when scrolling up
        if (currentScrollPosition < lastScrollPosition) {
            headerElement.style.transform = 'translateY(0)';
        } 
        // Hide navbar when scrolling down (only if not at top and menu not open)
        else if (currentScrollPosition > 100 && !header.classList.contains('menu-open')) {
            headerElement.style.transform = 'translateY(-100%)';
        }
        
        lastScrollPosition = currentScrollPosition;
    });
});