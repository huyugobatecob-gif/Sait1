/**
 * Handle Mobile Navigation Toggle
 */
const handleMenuToggle = () => {
    const burgerBtn = document.getElementById('burger-btn');
    const mainNav = document.getElementById('main-nav');

    if (!burgerBtn || !mainNav) return;

    const isOpen = mainNav.classList.contains('is-open');

    if (isOpen) {
        mainNav.classList.remove('is-open');
        burgerBtn.setAttribute('aria-expanded', 'false');
    } else {
        mainNav.classList.add('is-open');
        burgerBtn.setAttribute('aria-expanded', 'true');
    }
};

/**
 * Close Navigation on Link Click
 */
const handleLinkClick = (event) => {
    const mainNav = document.getElementById('main-nav');
    const burgerBtn = document.getElementById('burger-btn');

    if (!mainNav || !burgerBtn) return;

    // Only target links inside nav
    if (!event.target.classList.contains('nav__link')) return;

    mainNav.classList.remove('is-open');
    burgerBtn.setAttribute('aria-expanded', 'false');
};

/**
 * Focus and Keyboard controls for accessibility on custom elements
 */
const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        if (event.target.classList.contains('burger-btn')) {
            event.preventDefault();
            handleMenuToggle();
        }
    }
};

/**
 * Handle Promo Slider Navigation
 */
const initPromoSlider = () => {
    const track = document.getElementById('promoSliderTrack');
    const prevBtn = document.getElementById('promoSliderPrev');
    const nextBtn = document.getElementById('promoSliderNext');

    if (!track) return;

    let autoPlayInterval;
    const intervalTime = 2000;

    const scrollAmount = () => {
        const slide = track.querySelector('.promo-slide');
        return slide ? slide.offsetWidth + 20 : 320;
    };

    const handleNext = () => {
        // Проверяем, достигли ли мы конца (с небольшим запасом на пиксели)
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 10) {
            track.scrollTo({ left: 0, behavior: 'smooth' }); // Возвращаемся в начало
        } else {
            track.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        if (track.scrollLeft <= 0) {
            track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' }); // Переходим в конец
        } else {
            track.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        }
    };

    const startAutoPlay = () => {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(handleNext, intervalTime);
    };

    const stopAutoPlay = () => {
        clearInterval(autoPlayInterval);
    };

    if (prevBtn) prevBtn.addEventListener('click', () => { handlePrev(); startAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { handleNext(); startAutoPlay(); });

    // Останавливаем автопрокрутку при наведении и касании
    track.addEventListener('mouseenter', stopAutoPlay);
    track.addEventListener('mouseleave', startAutoPlay);
    track.addEventListener('touchstart', stopAutoPlay, { passive: true });
    track.addEventListener('touchend', startAutoPlay);

    // Запускаем автопрокрутку
    startAutoPlay();
};

/**
 * Handle FAQ Accordion Toggle
 */
window.handleFaqToggle = (button) => {
    const parent = button.closest('.faq__item');
    if (!parent) return;

    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    // Close all other items
    document.querySelectorAll('.faq__item').forEach(item => {
        item.classList.add('is-closed');
        const btn = item.querySelector('.faq__question');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    });

    // Toggle current item
    if (isExpanded) {
        parent.classList.add('is-closed');
        button.setAttribute('aria-expanded', 'false');
    } else {
        parent.classList.remove('is-closed');
        button.setAttribute('aria-expanded', 'true');
    }
};

const initFAQ = () => {
    document.querySelectorAll('.faq__item').forEach(item => {
        item.classList.add('is-closed');
    });
};

/**
 * Initialization function
 */
const init = () => {
    const burgerBtn = document.getElementById('burger-btn');
    const nav = document.getElementById('main-nav');
    const header = document.querySelector('.header');

    if (burgerBtn) {
        burgerBtn.addEventListener('click', handleMenuToggle);
        burgerBtn.addEventListener('keydown', handleKeyDown);
    }

    if (nav) {
        nav.addEventListener('click', handleLinkClick);
    }

    // Sticky Header
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('header--sticky');
            } else {
                header.classList.remove('header--sticky');
            }
        }, { passive: true });
    }

    // Scroll Reveal Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealOnScroll = new IntersectionObserver(function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Stop observing once revealed
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealOnScroll.observe(el);
        });

        // Trigger reveal immediately for items already in viewport on load
        setTimeout(() => {
            revealElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    el.classList.add('active');
                }
            });
        }, 100);
    }

    // Registration Form Tabs
    const tabs = document.querySelectorAll('.form-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const indicator = document.querySelector('.form-tabs__indicator');

    if (tabs.length > 0) {
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                // Remove active class from all
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.style.display = 'none');

                // Add active to current
                tab.classList.add('active');
                const targetId = `tab-${tab.dataset.tab}`;
                document.getElementById(targetId).style.display = 'block';

                // Move indicator
                if (indicator) {
                    indicator.style.transform = `translateX(${index * 100}%)`;
                }
            });
        });
    }

    // Password Visibility Toggle
    const passToggle = document.querySelector('.password-toggle');
    const passInput = document.getElementById('reg-password');
    if (passToggle && passInput) {
        passToggle.addEventListener('click', () => {
            if (passInput.type === 'password') {
                passInput.type = 'text';
                passToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
            } else {
                passInput.type = 'password';
                passToggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
            }
        });
    }

    // Simple Tilt effect for specific elements
    const tiltElements = document.querySelectorAll('.illustration-banner, .cabinet-img');
    if (tiltElements.length > 0 && window.matchMedia("(pointer: fine)").matches) {
        tiltElements.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const multiplier = el.classList.contains('illustration-banner') ? 0.02 : 0.05;
                el.style.transform = `perspective(1000px) rotateX(${-y * multiplier}deg) rotateY(${x * multiplier}deg)`;
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            });
        });
    }

    initPromoSlider();
    initFAQ();
};

// On document load
document.addEventListener('DOMContentLoaded', init);
