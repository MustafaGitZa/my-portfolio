document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // MOBILE MENU FUNCTIONALITY
    // =============================================
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.navbar').before(mobileMenuBtn);

    const navbar = document.querySelector('.navbar');
    let isMenuOpen = false;

    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        navbar.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Change icon
        const icon = mobileMenuBtn.querySelector('i');
        if (isMenuOpen) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking on a nav item
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                toggleMobileMenu();
            }
        });
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (isMenuOpen && !navbar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            toggleMobileMenu();
        }
    });

    // Close menu when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            toggleMobileMenu();
        }
    });

    // =============================================
    // MODAL FUNCTIONALITY
    // =============================================
    const resumeModal = document.getElementById("resumeModal");
    const successModal = document.getElementById("successModal");

    function openModal(modal) {
        if (modal) {
            modal.style.display = "block";
            document.body.style.overflow = 'hidden';
            document.body.classList.add('modal-open');
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.style.display = "none";
            document.body.style.overflow = 'auto';
            document.body.classList.remove('modal-open');
        }
    }

    // Set up modal triggers
    document.querySelectorAll('[data-target="resumeModal"], .wil-btn-download, a[href="#resume"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(resumeModal);
        });
    });

    // Close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            closeModal(this.closest('.modal'));
        });
    });

    // Close when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // =============================================
    // RESUME DOWNLOAD FUNCTIONALITY
    // =============================================
    function downloadResume(filename) {
        // Create the correct file path
        const filePath = filename;
        
        // Verify file exists before attempting download
        fetch(filePath, { method: 'HEAD' })
            .then(res => {
                if (res.ok) {
                    // Create temporary link to trigger download
                    const link = document.createElement('a');
                    link.href = filePath;
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    throw new Error('File not found');
                }
            })
            .catch(error => {
                console.error('Download error:', error);
                alert(`Sorry, the file "${filename}" couldn't be found. Please contact me directly at sibusisomst@gmail.com`);
            });
    }

    // Set up download buttons with your specific filenames
    document.querySelectorAll('.download-pdf').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadResume('Mustafa_Xaba_Resume_updated.pdf');
            closeModal(resumeModal);
        });
    });

    document.querySelectorAll('.download-docx').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            downloadResume('MustafaXaba_Resume.docx');
            closeModal(resumeModal);
        });
    });

    // =============================================
    // FORM HANDLING
    // =============================================
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function() {
            document.getElementById("form-spinner").style.display = "flex";
        });
    }

    window.showFormSuccess = function() {
        document.getElementById("form-spinner").style.display = "none";
        setTimeout(() => openModal(successModal), 300);
        if (contactForm) contactForm.reset();
    };

    window.showFormError = function() {
        document.getElementById("form-spinner").style.display = "none";
        alert("Failed to send message. Please try again or contact me directly at sibusisomst@gmail.com");
    };

    // =============================================
    // SMOOTH SCROLLING NAVIGATION
    // =============================================
    document.querySelectorAll('a[href^="#"]:not([href="#resume"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =============================================
    // ACTIVE NAV LINK ON SCROLL
    // =============================================
    function setActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                document.querySelectorAll('.navbar a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink(); // Initialize on load

    
});