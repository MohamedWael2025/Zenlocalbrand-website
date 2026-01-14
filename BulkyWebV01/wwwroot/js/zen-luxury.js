// ==========================================
// ZEN LUXURY E-COMMERCE INTERACTIONS
// Premium Animations & UX
// ==========================================

class ZenLuxury {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.initTheme();
        this.initCursor();
        this.initScrollReveal();
        this.initSmoothScroll();
        this.initPageTransitions();
        this.initCardInteractions();
        this.initFormEnhancements();
    }

    // ==========================================
    // THEME SYSTEM
    // ==========================================

    initTheme() {
        const savedTheme = localStorage.getItem('zen-theme') || 'light';
        this.setTheme(savedTheme);

        const toggleBtn = document.querySelector('.zen-theme-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleTheme());
        }
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('zen-theme', theme);
        this.updateThemeIcon(theme);
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = current === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeIcon(theme) {
        const icon = document.querySelector('.zen-theme-toggle i');
        if (icon) {
            icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
        }
    }

    // ==========================================
    // CUSTOM CURSOR
    // ==========================================

    initCursor() {
        // Disable custom cursor - performance optimization
        return;
    }

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================

    initScrollReveal() {
        // Simplified scroll reveal for better performance
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Only observe elements with zen-reveal class
        const revealElements = document.querySelectorAll('.zen-reveal');
        revealElements.forEach(el => observer.observe(el));
            }
        });
    }

    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#' || href === '#!') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 80; // Header height
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ==========================================
    // PAGE TRANSITIONS
    // ==========================================

    initPageTransitions() {
        // Fade in on page load
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.4s ease-out';

        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 50);
        });

        // Fade out on page leave (for navigation)
        const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.hostname === window.location.hostname) {
                    e.preventDefault();
                    const href = link.href;

                    document.body.style.opacity = '0';

                    setTimeout(() => {
                        window.location.href = href;
                    }, 250);
                }
            });
        });
    }

    // ==========================================
    // CARD INTERACTIONS
    // ==========================================

    initCardInteractions() {
        const cards = document.querySelectorAll('.zen-card');

        cards.forEach(card => {
            // 3D tilt effect on hover
            card.addEventListener('mousemove', (e) => {
                if (window.innerWidth <= 1024) return;

                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;

                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-4px)
                `;
            });

    initCardInteractions() {
        // Simplified for performance - removed heavy animations
        return;
    }

    // ==========================================
    // FORM ENHANCEMENTS
    // ==========================================

    initFormEnhancements() {
        // Minimal form enhancements
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const submitBtn = form.querySelector('[type="submit"]');
                if (submitBtn && !submitBtn.disabled) {
                    submitBtn.style.opacity = '0.7';
                }
            });
        });
    }
            });
        });
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Number counter animation
function animateNumber(element, start, end, duration = 2000) {
    if (!element) return;

    let startTime = null;

    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    };

    requestAnimationFrame(step);
}

// Parallax effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallax) || 0.5;
            const yPos = -(window.pageYOffset * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Lazy load images
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// ==========================================
// INITIALIZE
// ==========================================

const zenLuxury = new ZenLuxury();

// Initialize additional features
window.addEventListener('load', () => {
    initParallax();
    initLazyLoad();
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize cursor on significant resize
        const cursors = document.querySelectorAll('.zen-cursor, .zen-cursor-dot');
        cursors.forEach(c => c.remove());

        if (window.innerWidth > 1024) {
            zenLuxury.initCursor();
        }
    }, 250);
});

// ==========================================
// EXPORT FOR EXTERNAL USE
// ==========================================

window.ZenLuxury = ZenLuxury;
window.animateNumber = animateNumber;
