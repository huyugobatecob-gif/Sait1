// js/reviews.js
document.addEventListener('DOMContentLoaded', () => {
    // Make sure we have GSAP & ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // 1. Hero Animations
        const tlHero = gsap.timeline();
        tlHero.fromTo('.rw-fade', { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' })
            .fromTo('.rw-slide-up', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, "-=0.4")
            .fromTo('.rw-fade-delay', { opacity: 0 }, { opacity: 1, duration: 0.8, ease: 'power2.out' }, "-=0.2")
            .fromTo('.rw-btn-1', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, "-=0.1")
            .fromTo('.rw-btn-2', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }, "-=0.2");

        // Subtle Parallax for Hero Background
        gsap.to('.reviews-hero', {
            backgroundPosition: "50% 100%",
            ease: "none",
            scrollTrigger: {
                trigger: '.reviews-hero',
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // 2. "Зачем нужны отзывы?"
        gsap.from('.reviews-why__visual', {
            scrollTrigger: { trigger: '.reviews-why', start: 'top 80%' },
            scale: 0.96, opacity: 0, duration: 0.8, ease: 'power2.out'
        });

        gsap.from('.rw-stagger', {
            scrollTrigger: { trigger: '.reviews-why__content', start: 'top 80%' },
            y: 20, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power2.out'
        });

        // Glowing button on hover
        const glowBtn = document.querySelector('.rw-glow-btn');
        if (glowBtn) {
            glowBtn.addEventListener('mouseenter', () => gsap.to(glowBtn, { boxShadow: '0 0 15px rgba(255, 255, 255, 0.4)', duration: 0.3 }));
            glowBtn.addEventListener('mouseleave', () => gsap.to(glowBtn, { boxShadow: 'none', duration: 0.3 }));
        }

        // 3. "Мнение пользователей" 
        gsap.from('.rw-zoom-title', {
            scrollTrigger: { trigger: '.reviews-opinion', start: 'top 85%' },
            scale: 0.95, opacity: 0, duration: 0.6, ease: 'power2.out'
        });

        gsap.from('.rw-bullet', {
            scrollTrigger: { trigger: '.reviews-opinion__list', start: 'top 80%' },
            x: -20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out'
        });

        // Stars reveal
        gsap.to('.star', {
            scrollTrigger: { trigger: '.reviews-opinion__stars', start: 'top 85%' },
            opacity: 1, color: '#ffd700', duration: 0.4, stagger: 0.1, ease: 'power1.inOut'
        });

        // 4. "Где можно изучить отзывы"
        gsap.from('.rw-fade-up', {
            scrollTrigger: { trigger: '.reviews-where', start: 'top 85%' },
            y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out'
        });

        // 5. "Каким отзывам можно доверять"
        gsap.from('.rw-scale-in', {
            scrollTrigger: { trigger: '.reviews-trust__items', start: 'top 85%' },
            scale: 0.9, opacity: 0, duration: 0.5, stagger: 0.15, ease: 'back.out(1.2)'
        });

        // Floating dice
        gsap.to('.reviews-trust__img', {
            y: -15, duration: 2.5, yoyo: true, repeat: -1, ease: 'sine.inOut'
        });

        // 6. Banners and Cards Stagger
        gsap.from('.rw-banner', {
            scrollTrigger: { trigger: '.reviews-banners', start: 'top 85%' },
            y: 30, opacity: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out'
        });

        gsap.from('.rw-client-card', {
            scrollTrigger: { trigger: '.reviews-clients__grid', start: 'top 80%' },
            y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out'
        });

        // 3D Tilt for client cards 
        document.querySelectorAll('.rw-client-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, { y: -5, boxShadow: '0 15px 30px rgba(0,0,0,0.5)', duration: 0.3 });
                gsap.to(card.querySelector('.client-card__avatar'), { scale: 1.05, duration: 0.3 });
                gsap.to(card.querySelector('.client-card__bg'), { backgroundColor: 'rgba(255,255,255,0.08)', duration: 0.3 });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(card, { y: 0, boxShadow: 'none', duration: 0.3 });
                gsap.to(card.querySelector('.client-card__avatar'), { scale: 1, duration: 0.3 });
                gsap.to(card.querySelector('.client-card__bg'), { backgroundColor: 'transparent', duration: 0.3 });
            });
        });

        // Partners hover
        if (window.matchMedia("(hover: hover)").matches) {
            document.querySelectorAll('.providers__logo').forEach(logo => {
                logo.addEventListener('mouseenter', () => gsap.to(logo, { scale: 1.05, duration: 0.3 }));
                logo.addEventListener('mouseleave', () => gsap.to(logo, { scale: 1, duration: 0.3 }));
            });
        }
    }
});
