// ========================================
// PERYSMITH M2 PRO MAX — Main JS
// ========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar scroll effect ---
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 20);
        }, { passive: true });
    }

    // --- Mobile nav toggle ---
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navBackdrop = document.getElementById('navBackdrop');

    function openNav() {
        navToggle.classList.add('active');
        navLinks.classList.add('active');
        if (navBackdrop) navBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        if (navBackdrop) navBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.contains('active') ? closeNav() : openNav();
        });

        // Close nav when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeNav);
        });

        // Close nav when clicking backdrop
        if (navBackdrop) {
            navBackdrop.addEventListener('click', closeNav);
        }
    }

    // --- Scroll reveal animation ---
    const revealElements = document.querySelectorAll(
        '.zigzag-item, .ck-item, .testimoni-slideshow, .harga-content, .section-header'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // --- Testimoni crossfade slideshow ---
    const slides = document.querySelectorAll('.testimoni-card');
    const dots = document.querySelectorAll('.slideshow-dots .dot');
    let currentSlide = 0;
    let slideshowInterval = null;

    function goToSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide((currentSlide + 1) % slides.length);
    }

    function startAutoplay() {
        stopAutoplay();
        slideshowInterval = setInterval(nextSlide, 6000);
    }

    function stopAutoplay() {
        if (slideshowInterval) {
            clearInterval(slideshowInterval);
            slideshowInterval = null;
        }
    }

    if (slides.length > 1) {
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.slide));
                startAutoplay(); // reset timer after manual click
            });
        });
        startAutoplay();
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        btn.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            // Close all others
            faqItems.forEach(i => i.classList.remove('open'));
            // Toggle current
            if (!isOpen) item.classList.add('open');
        });
    });

    // --- Theme Toggle ---
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';

    function updateThemeUI(theme) {
        themeToggles.forEach(toggle => {
            const icon = toggle.querySelector('i');
            if (icon) {
                icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            }
        });
    }

    updateThemeUI(currentTheme);

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            theme = (theme === 'dark') ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            updateThemeUI(theme);
        });
    });

    // --- Active nav link on scroll ---
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        const scrollY = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                navAnchors.forEach(a => {
                    a.classList.remove('active');
                    if (a.getAttribute('href') === '#' + id) {
                        a.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // --- WhatsApp Bubble Close ---
    const waBubbleClose = document.getElementById('waBubbleClose');
    const waBubble = document.getElementById('waBubble');

    if (waBubbleClose && waBubble) {
        // Check if previously dismissed this session
        if (sessionStorage.getItem('waBubbleClosed')) {
            waBubble.classList.add('hidden');
        }

        waBubbleClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            waBubble.classList.add('hidden');
            sessionStorage.setItem('waBubbleClosed', 'true');
        });
    }

    // --- YouTube Video Facade ---
    const videoFacades = document.querySelectorAll('.video-facade');
    videoFacades.forEach(facade => {
        facade.addEventListener('click', function() {
            const videoId = this.dataset.videoId;
            const start = this.dataset.start || 0;
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&start=${start}&rel=0`);
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
            iframe.setAttribute('allowfullscreen', '');
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            
            this.innerHTML = '';
            this.appendChild(iframe);
            this.classList.remove('video-facade');
        });
    });
});
