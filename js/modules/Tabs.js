export class Tabs {
    constructor() {
        this.tabs = document.querySelectorAll('.form-tab');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.indicator = document.querySelector('.form-tabs__indicator');

        // Ранний возврат, если элементов нет на странице
        if (this.tabs.length === 0) return;

        this.init();
    }

    init() {
        this.tabs.forEach((tab, index) => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                this.setActive(tab, index);
            });
        });
    }

    setActive(activeTab, index) {
        this.tabs.forEach(t => t.classList.remove('active'));
        this.tabContents.forEach(c => c.style.display = 'none');

        activeTab.classList.add('active');
        const targetId = `tab-${activeTab.dataset.tab}`;
        const targetContent = document.getElementById(targetId);

        if (targetContent) {
            targetContent.style.display = 'block';
        }

        if (this.indicator) {
            this.indicator.style.transform = `translateX(${index * 100}%)`;
        }
    }
}
