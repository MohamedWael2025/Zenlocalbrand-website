// ==========================================
// ZEN THEME CONTROLLER
// ==========================================

class ZenTheme {
    constructor() {
        this.init();
    }

    init() {
        // Load saved theme
        const savedTheme = localStorage.getItem('zen-theme') || 'light';
        this.setTheme(savedTheme);

        // Custom cursor
        this.initCustomCursor();

        // Scroll animations
        this.initScrollAnimations();

        // Smooth scrolling
        this.initSmoothScroll();

        // Theme toggle listener
        document.addEventListener('DOMContentLoaded', () => {
            const toggleBtn = document.querySelector('.theme-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => this.toggleTheme());
            }
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('zen-theme', theme);
        this.updateThemeIcon(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    updateThemeIcon(theme) {
        const icon = document.querySelector('.theme-toggle-icon i');
        if (icon) {
            icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
        }
    }

    // Custom Cursor
    initCustomCursor() {
        if (window.innerWidth <= 768) return; // Skip on mobile

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        const cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        
        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth cursor follow
        function animate() {
            // Main cursor
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;

            // Dot
            dotX += (mouseX - dotX) * 0.3;
            dotY += (mouseY - dotY) * 0.3;
            cursorDot.style.transform = `translate(${dotX - 3}px, ${dotY - 3}px)`;

            requestAnimationFrame(animate);
        }
        animate();

        // Hover effect on links and buttons
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('a, button, .btn, input, select, textarea')) {
                cursor.classList.add('hover');
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.matches('a, button, .btn, input, select, textarea')) {
                cursor.classList.remove('hover');
            }
        });
    }

    // Scroll Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // Observe all elements with scroll-reveal class
        document.addEventListener('DOMContentLoaded', () => {
            const revealElements = document.querySelectorAll('.scroll-reveal');
            revealElements.forEach(el => observer.observe(el));

            // Add scroll-reveal to cards
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.classList.add('scroll-reveal');
                observer.observe(card);
            });
        });
    }

    // Smooth Scrolling for anchor links
    initSmoothScroll() {
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    const href = this.getAttribute('href');
                    if (href === '#') return;
                    
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        });
    }
}

// Initialize
const zenTheme = new ZenTheme();

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

// Add parallax effect to images
document.addEventListener('DOMContentLoaded', () => {
    const parallaxImages = document.querySelectorAll('.parallax-image');
    
    window.addEventListener('scroll', () => {
        parallaxImages.forEach(img => {
            const speed = img.dataset.speed || 0.5;
            const yPos = -(window.pageYOffset * speed);
            img.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Add hover tilt effect to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Animate numbers (for prices, counts, etc.)
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Observe numbers for animation
    const numberElements = document.querySelectorAll('[data-animate-number]');
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                const endValue = parseInt(entry.target.textContent);
                animateValue(entry.target, 0, endValue, 2000);
                entry.target.dataset.animated = 'true';
            }
        });
    });

    numberElements.forEach(el => numberObserver.observe(el));
});

// ==========================================
// LOADING STATE
// ==========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Fade in page content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = '0';
        setTimeout(() => {
            mainContent.style.transition = 'opacity 0.5s ease';
            mainContent.style.opacity = '1';
        }, 100);
    }
});

// ==========================================
// RESIZE HANDLER
// ==========================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinit cursor on resize
        const cursors = document.querySelectorAll('.custom-cursor, .custom-cursor-dot');
        if (window.innerWidth <= 768) {
            cursors.forEach(c => c.style.display = 'none');
        } else {
            cursors.forEach(c => c.style.display = 'block');
        }
    }, 250);
});
