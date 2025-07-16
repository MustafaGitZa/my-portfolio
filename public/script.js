document.addEventListener('DOMContentLoaded', function () {
    // =============== MOBILE MENU ===================
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        navbar.before(mobileMenuBtn);

        let isMenuOpen = false;

        function toggleMobileMenu() {
            isMenuOpen = !isMenuOpen;
            navbar.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars', !isMenuOpen);
            icon.classList.toggle('fa-times', isMenuOpen);
        }

        mobileMenuBtn.addEventListener('click', toggleMobileMenu);

        // Close menu on nav link click (mobile)
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', function (e) {
                if (this.hash && this.hash !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(this.hash);
                    if (target) {
                        const offset = navbar.offsetHeight;
                        window.scrollTo({
                            top: target.offsetTop - offset,
                            behavior: 'smooth'
                        });
                        history.pushState(null, null, this.hash);
                    }
                }
                if (window.innerWidth <= 768) toggleMobileMenu();
            });
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 768 && isMenuOpen) toggleMobileMenu();
        });

        document.addEventListener('click', function (e) {
            if (isMenuOpen && !navbar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                toggleMobileMenu();
            }
        });
    }

    // =============== HERO BUTTONS ===================
    document.querySelectorAll('.hero-buttons a').forEach(button => {
        button.addEventListener('click', function (e) {
            if (this.dataset.section) {
                e.preventDefault();
                const target = document.getElementById(this.dataset.section);
                if (target && navbar) {
                    const offset = navbar.offsetHeight;
                    window.scrollTo({
                        top: target.offsetTop - offset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // =============== MODALS =========================
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

    document.querySelectorAll('[data-target="resumeModal"], .wil-btn-download, a[href="#resume"]').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            openModal(resumeModal);
        });
    });

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => closeModal(btn.closest('.modal')));
    });

    window.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal')) closeModal(e.target);
    });

    // =============== DOWNLOAD FUNCTION ==============
    function downloadResume(filename) {
        fetch(filename, { method: 'HEAD' })
            .then(res => {
                if (res.ok) {
                    const link = document.createElement('a');
                    link.href = filename;
                    link.download = filename;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    throw new Error('File not found');
                }
            })
            .catch(() => {
                alert(`"${filename}" not found. Contact sibusisomst@gmail.com`);
            });
    }

    document.querySelectorAll('.download-pdf').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            downloadResume('Mustafa_Xaba_Resume.pdf');
            closeModal(resumeModal);
        });
    });

    document.querySelectorAll('.download-docx').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            downloadResume('Mustafa_Xaba_Resume.docx');
            closeModal(resumeModal);
        });
    });

    // =============== FORM SPINNER ONLY ==============
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function () {
            document.getElementById("form-spinner").style.display = "flex";
        });
    }

    window.showFormSuccess = function () {
        document.getElementById("form-spinner").style.display = "none";
        setTimeout(() => openModal(successModal), 300);
        if (contactForm) contactForm.reset();
    };

    window.showFormError = function () {
        document.getElementById("form-spinner").style.display = "none";
        alert("Failed to send message. Please email me at sibusisomst@gmail.com");
    };

    // =============== ACTIVE NAV LINK ================
    function setActiveNavLink() {
        const scrollY = window.scrollY + 100;
        document.querySelectorAll('section').forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                const id = section.getAttribute('id');
                document.querySelectorAll('.navbar a').forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);
    setActiveNavLink();
});

// =============== DARK MODE =========================
window.onload = function () {
    const theme = localStorage.getItem('theme');
    const icon = document.querySelector('.dark-mode-toggle i');
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (icon) {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    } else {
        if (icon) {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }
};

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('.dark-mode-toggle i');
    if (document.body.classList.contains('dark-mode')) {
        if (icon) {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
        localStorage.setItem('theme', 'dark');
    } else {
        if (icon) {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
        localStorage.setItem('theme', 'light');
    }
}
