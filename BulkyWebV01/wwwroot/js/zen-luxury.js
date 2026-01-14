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
        // Skip on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;
        if (window.innerWidth <= 1024) return;

        const cursor = document.createElement('div');
        cursor.className = 'zen-cursor';
        const dot = document.createElement('div');
        dot.className = 'zen-cursor-dot';

        document.body.appendChild(cursor);
        document.body.appendChild(dot);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth follow animation
        const animate = () => {
            // Cursor ring
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.transform = `translate(${cursorX - 12}px, ${cursorY - 12}px)`;

            // Cursor dot
            dotX += (mouseX - dotX) * 0.4;
            dotY += (mouseY - dotY) * 0.4;
            dot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;

            requestAnimationFrame(animate);
        };
        animate();

        // Hover effects
        document.addEventListener('mouseover', (e) => {
            const target = e.target;
            if (target.matches('a, button, .zen-btn, input, select, textarea, .zen-card')) {
                cursor.classList.add('hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            const target = e.target;
            if (target.matches('a, button, .zen-btn, input, select, textarea, .zen-card')) {
                cursor.classList.remove('hover');
            }
        });
    }

    // ==========================================
    // SCROLL REVEAL ANIMATIONS
    // ==========================================

    initScrollReveal() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Unobserve after reveal for performance
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe reveal elements
        const revealElements = document.querySelectorAll('.zen-reveal');
        revealElements.forEach(el => observer.observe(el));

        // Auto-add reveal to cards
        const cards = document.querySelectorAll('.zen-card');
        cards.forEach(card => {
            if (!card.classList.contains('zen-reveal')) {
                card.classList.add('zen-reveal');
                observer.observe(card);
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

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });

            // Add magnetic effect to buttons inside cards
            const buttons = card.querySelectorAll('.zen-btn');
            buttons.forEach(btn => {
                btn.addEventListener('mousemove', (e) => {
                    if (window.innerWidth <= 1024) return;

                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;

                    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
                });

                btn.addEventListener('mouseleave', () => {
                    btn.style.transform = '';
                });
            });
        });
    }

    // ==========================================
    // FORM ENHANCEMENTS
    // ==========================================

    initFormEnhancements() {
        // Floating labels
        const inputs = document.querySelectorAll('.zen-input, .zen-select, .zen-textarea');

        inputs.forEach(input => {
            // Add focus/blur effects
            input.addEventListener('focus', () => {
                input.parentElement?.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement?.classList.remove('focused');
                if (input.value) {
                    input.parentElement?.classList.add('filled');
                } else {
                    input.parentElement?.classList.remove('filled');
                }
            });

            // Check initial value
            if (input.value) {
                input.parentElement?.classList.add('filled');
            }
        });

        // Submit animations
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                const submitBtn = form.querySelector('[type="submit"]');
                if (submitBtn) {
                    submitBtn.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        submitBtn.style.transform = '';
                    }, 200);
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
