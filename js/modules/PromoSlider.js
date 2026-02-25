export class PromoSlider {
    constructor() {
        this.track = document.getElementById('promoSliderTrack');
        this.prevBtn = document.getElementById('promoSliderPrev');
        this.nextBtn = document.getElementById('promoSliderNext');

        if (!this.track) return;

        this.autoPlayInterval = null;
        this.intervalTime = 2000;
        this.isVisible = false;

        this.init();
    }

    init() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => { this.handlePrev(); this.startAutoPlay(); });
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => { this.handleNext(); this.startAutoPlay(); });

        this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());
        this.track.addEventListener('touchstart', () => this.stopAutoPlay(), { passive: true });
        this.track.addEventListener('touchend', () => this.startAutoPlay());

        this.setupIntersectionObserver();
    }

    scrollAmount() {
        const slide = this.track.querySelector('.promo-slide');
        if (!slide) {
            const isDesktop = window.innerWidth >= 1200;
            const isTablet = window.innerWidth >= 768;
            const visibleSlides = isDesktop ? 3 : isTablet ? 2 : 1;
            return this.track.clientWidth / visibleSlides;
        }

        const gap = parseInt(window.getComputedStyle(this.track).gap) || 20;
        return slide.offsetWidth + gap;
    }

    handleNext() {
        // Если прокрутили до конца (с небольшим запасом)
        if (this.track.scrollLeft + this.track.clientWidth >= this.track.scrollWidth - 10) {
            this.track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
            this.track.scrollBy({ left: this.scrollAmount(), behavior: 'smooth' });
        }
    }

    handlePrev() {
        if (this.track.scrollLeft <= 0) {
            this.track.scrollTo({ left: this.track.scrollWidth, behavior: 'smooth' });
        } else {
            this.track.scrollBy({ left: -this.scrollAmount(), behavior: 'smooth' });
        }
    }

    startAutoPlay() {
        this.stopAutoPlay();
        if (this.isVisible) {
            this.autoPlayInterval = setInterval(() => this.handleNext(), this.intervalTime);
        }
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    setupIntersectionObserver() {
        // Остановка автоплея, если слайдер вне зоны видимости (DRY/Performance)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.isVisible = true;
                    this.startAutoPlay();
                } else {
                    this.isVisible = false;
                    this.stopAutoPlay();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(this.track);
    }
}
