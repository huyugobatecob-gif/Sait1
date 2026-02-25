import { Menu } from './modules/Menu.js';
import { PromoSlider } from './modules/PromoSlider.js';
import { Faq } from './modules/Faq.js';
import { Tabs } from './modules/Tabs.js';
import { Utils } from './modules/Utils.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Basic structural initialization
    new Menu();

    // 2. Feature initialization (components will abort early if not found on page)
    new PromoSlider();
    new Faq();
    new Tabs();

    // 3. Utilities initialization
    Utils.initRevealOnScroll();
    Utils.initPasswordToggle();
    Utils.initTiltEffect();
});
