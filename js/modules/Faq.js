export class Faq {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq__item');
        if (this.faqItems.length === 0) return;

        this.init();
    }

    init() {
        this.faqItems.forEach(item => {
            item.classList.add('is-closed');
            const button = item.querySelector('.faq__question');

            if (button) {
                // Remove inline onclick just in case
                button.removeAttribute('onclick');

                button.addEventListener('click', () => this.handleToggle(button, item));

                // Исправление A11y: управление с клавиатуры
                button.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.handleToggle(button, item);
                    }
                });
            }
        });
    }

    handleToggle(button, currentItem) {
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Close all other items
        this.faqItems.forEach(item => {
            item.classList.add('is-closed');
            const btn = item.querySelector('.faq__question');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        // Toggle current item
        if (isExpanded) {
            currentItem.classList.add('is-closed');
            button.setAttribute('aria-expanded', 'false');
        } else {
            currentItem.classList.remove('is-closed');
            button.setAttribute('aria-expanded', 'true');
        }
    }
}
