export class Menu {
    constructor() {
        this.burgerBtn = document.getElementById('burger-btn');
        this.mainNav = document.getElementById('main-nav');
        this.header = document.querySelector('.header');

        if (!this.burgerBtn || !this.mainNav) return;

        this.init();
    }

    init() {
        this.burgerBtn.addEventListener('click', () => this.handleMenuToggle());
        this.burgerBtn.addEventListener('keydown', (e) => this.handleKeyDown(e));
        this.mainNav.addEventListener('click', (e) => this.handleLinkClick(e));

        if (this.header) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    this.header.classList.add('header--sticky');
                } else {
                    this.header.classList.remove('header--sticky');
                }
            }, { passive: true });
        }
    }

    handleMenuToggle() {
        const isOpen = this.mainNav.classList.contains('is-open');

        if (isOpen) {
            this.mainNav.classList.remove('is-open');
            this.burgerBtn.setAttribute('aria-expanded', 'false');
        } else {
            this.mainNav.classList.add('is-open');
            this.burgerBtn.setAttribute('aria-expanded', 'true');
        }
    }

    handleLinkClick(event) {
        if (!event.target.classList.contains('nav__link')) return;

        this.mainNav.classList.remove('is-open');
        this.burgerBtn.setAttribute('aria-expanded', 'false');
    }

    handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleMenuToggle();
        }
    }
}
