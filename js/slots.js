// GSAP Animations for Slots Page

document.addEventListener("DOMContentLoaded", () => {
    // Only run if GSAP is available
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // 1. Hero Animations
    const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Fade pretitle
    heroTl.fromTo(".sl-anim-fade",
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.8 },
        0.2
    );

    // Slide up title
    heroTl.fromTo(".sl-anim-up",
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1 },
        0.4
    );

    // Fade delay text
    heroTl.fromTo(".sl-anim-delay",
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1 },
        0.6
    );

    // Stagger buttons
    heroTl.fromTo(".sl-hero__actions .btn",
        { y: 20, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.12 },
        0.8
    );

    // Wave Mask Reveal
    gsap.fromTo(".sl-wave",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 1.5, ease: "power2.out", delay: 1 }
    );

    // Hero Background Parallax
    gsap.to(".sl-hero__bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
            trigger: ".sl-hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 2. Top Slots Block
    // Image floating loop
    gsap.to(".sl-anim-float", {
        y: -10,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Text reveal staggered
    gsap.from(".sl-text-reveal", {
        scrollTrigger: {
            trigger: ".sl-top",
            start: "top 80%",
        },
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    });

    // 3. Best Slots Grid 
    // Animation removed: conflicts with Safari local rendering causing images to flash and disappear

    // Best slots header & footer fade up
    gsap.utils.toArray(".sl-fade-up").forEach(elem => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
            },
            y: 30,
            autoAlpha: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // 4. Jackpot Glow & Particles
    // Glow pulsing
    gsap.to(".sl-jackpot-glow", {
        boxShadow: "0 0 40px rgba(255, 215, 0, 0.6), 0 0 80px rgba(255, 215, 0, 0.2)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    // Simple Particle Creation in Banner
    const particleContainer = document.getElementById("jackpot-particles");
    if (particleContainer) {
        for (let i = 0; i < 30; i++) {
            let p = document.createElement("div");
            p.classList.add("particle");
            particleContainer.appendChild(p);

            let size = Math.random() * 6 + 2;
            gsap.set(p, {
                width: size,
                height: size,
                x: Math.random() * particleContainer.offsetWidth,
                y: Math.random() * particleContainer.offsetHeight,
                autoAlpha: Math.random() * 0.8 + 0.2
            });

            gsap.to(p, {
                y: "-=100",
                x: "+=" + (Math.random() * 50 - 25),
                autoAlpha: 0,
                duration: Math.random() * 2 + 1.5,
                repeat: -1,
                delay: Math.random() * 2,
                ease: "power1.inOut"
            });
        }
    }

    // 5. Live Casino Parallax & List Stagger
    gsap.to(".sl-live__img", {
        yPercent: 15,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
            trigger: ".sl-live",
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });

    gsap.from(".sl-stagger-list li", {
        scrollTrigger: {
            trigger: ".sl-stagger-list",
            start: "top 85%"
        },
        x: -20,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    });

    gsap.from(".sl-stagger-list-2 li", {
        scrollTrigger: {
            trigger: ".sl-stagger-list-2",
            start: "top 85%"
        },
        x: -20,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out"
    });

    // 6. Promos Cards
    gsap.from(".sl-promo-card", {
        scrollTrigger: {
            trigger: ".sl-promos",
            start: "top 80%"
        },
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
    });

    // 7. Partners Stagger
    gsap.from(".sl-partner-logo", {
        scrollTrigger: {
            trigger: ".sl-partners",
            start: "top 85%"
        },
        scale: 0.9,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.5)"
    });

    // 8. FAQ Stagger
    gsap.from(".sl-faq-item", {
        scrollTrigger: {
            trigger: ".sl-faq",
            start: "top 85%"
        },
        y: 20,
        autoAlpha: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
    });
});
