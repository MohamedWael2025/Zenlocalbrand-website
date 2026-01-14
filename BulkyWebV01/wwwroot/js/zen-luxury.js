// ==========================================
// ZEN LUXURY MOTION DESIGN SYSTEM
// Rebuilt from Absolute Zero
// Premium Animations · 60fps Performance
// ==========================================

class ZenMotion {
    constructor() {
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        this.initTheme();
        this.initPageTransitions();
        this.initScrollReveal();
        this.initCardInteractions();
        this.initButtonPhysics();
        this.initFormFocusGlow();
        this.initParallaxLayers();
        this.initSmoothScroll();
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
    // PAGE TRANSITIONS
    // Fade + micro-movement
    // ==========================================

    initPageTransitions() {
        if (this.isReducedMotion) return;

        // Fade in on page load
        document.body.style.opacity = '0';
        document.body.style.transform = 'translateY(10px)';
        document.body.style.transition = 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

        window.addEventListener('load', () => {
            requestAnimationFrame(() => {
                document.body.style.opacity = '1';
                document.body.style.transform = 'translateY(0)';
            });
        });

        // Fade out on navigation (if same origin)
        const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"]):not([href^="mailto:"]):not([href^="tel:"])');
        links.forEach(link => {
            if (link.hostname === window.location.hostname || !link.hostname) {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href && !href.startsWith('#')) {
                        document.body.style.opacity = '0';
                        document.body.style.transform = 'translateY(-10px)';
                    }
                });
            }
        });
    }

    // ==========================================
    // SCROLL REVEAL
    // Section reveal on scroll with stagger
    // ==========================================

    initScrollReveal() {
        if (this.isReducedMotion) {
            // Show all elements immediately
            document.querySelectorAll('.zen-reveal').forEach(el => {
                el.classList.add('zen-revealed');
            });
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const delay = entry.target.style.getPropertyValue('--stagger') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('zen-revealed');
                    }, delay * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.zen-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    // ==========================================
    // CARD INTERACTIONS
    // Hover depth with 3D perspective
    // ==========================================

    initCardInteractions() {
        if (this.isReducedMotion || window.innerWidth <= 1024) return;

        const cards = document.querySelectorAll('.zen-card, .zen-product-card');

        cards.forEach(card => {
            let isHovering = false;

            card.addEventListener('mouseenter', () => {
                isHovering = true;
            });

            card.addEventListener('mouseleave', () => {
                isHovering = false;
                card.style.transform = '';
                card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            card.addEventListener('mousemove', (e) => {
                if (!isHovering) return;

                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                card.style.transition = 'none';
                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-4px)
                `;
            });
        });
    }

    // ==========================================
    // BUTTON PHYSICS
    // Press effect with ripple
    // ==========================================

    initButtonPhysics() {
        const buttons = document.querySelectorAll('.zen-btn, button, [type="submit"]');

        buttons.forEach(btn => {
            btn.addEventListener('mousedown', (e) => {
                if (this.isReducedMotion) return;

                const ripple = document.createElement('span');
                const rect = btn.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                `;

                if (!btn.style.position || btn.style.position === 'static') {
                    btn.style.position = 'relative';
                    btn.style.overflow = 'hidden';
                }

                btn.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });

        // Add ripple animation
        if (!document.getElementById('zen-ripple-style')) {
            const style = document.createElement('style');
            style.id = 'zen-ripple-style';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ==========================================
    // FORM FOCUS GLOW
    // Input focus glow effect
    // ==========================================

    initFormFocusGlow() {
        const inputs = document.querySelectorAll('.zen-input, .zen-textarea, .zen-select, input, textarea, select');

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                if (this.isReducedMotion) return;
                input.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            input.addEventListener('blur', () => {
                input.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
        });
    }

    // ==========================================
    // PARALLAX LAYERS
    // Subtle parallax for depth
    // ==========================================

    initParallaxLayers() {
        if (this.isReducedMotion || window.innerWidth <= 1024) return;

        const parallaxElements = document.querySelectorAll('[data-parallax]');
        if (parallaxElements.length === 0) return;

        let ticking = false;

        const updateParallax = () => {
            const scrollY = window.pageYOffset;

            parallaxElements.forEach(el => {
                const speed = parseFloat(el.dataset.parallax) || 0.5;
                const yPos = scrollY * speed;
                el.style.transform = `translateY(${yPos}px)`;
            });

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    // ==========================================
    // SMOOTH SCROLL
    // Anchor link smooth scrolling
    // ==========================================

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#' || href === '#!') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.zen-header')?.offsetHeight || 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
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
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (element) element.textContent = end.toLocaleString();
        return;
    }

    let startTime = null;

    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);

        const current = Math.floor(easeOut * (end - start) + start);
        element.textContent = current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            element.textContent = end.toLocaleString();
        }
    };

    requestAnimationFrame(step);
}

// Lazy load images
function initLazyLoad() {
    if ('IntersectionObserver' in window) {
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
        }, { rootMargin: '50px' });

        images.forEach(img => imageObserver.observe(img));
    }
}

// ==========================================
// INITIALIZE
// ==========================================

const zenMotion = new ZenMotion();

// Initialize additional features on load
window.addEventListener('load', () => {
    initLazyLoad();
    
    // Animate stat numbers if present
    document.querySelectorAll('[data-animate-number]').forEach(el => {
        const end = parseInt(el.dataset.animateNumber);
        if (!isNaN(end)) {
            animateNumber(el, 0, end);
        }
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize card interactions if needed
        if (window.innerWidth > 1024) {
            zenMotion.initCardInteractions();
        }
    }, 250);
}, { passive: true });

// ==========================================
// EXPORT FOR EXTERNAL USE
// ==========================================

window.ZenMotion = ZenMotion;
window.animateNumber = animateNumber;
