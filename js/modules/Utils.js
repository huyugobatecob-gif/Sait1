export class Utils {
    static initPasswordToggle() {
        const passToggle = document.querySelector('.password-toggle');
        const passInput = document.getElementById('reg-password');

        // Ранний возврат
        if (!passToggle || !passInput) return;

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

    static initTiltEffect() {
        const tiltElements = document.querySelectorAll('.illustration-banner, .cabinet-img');
        if (tiltElements.length === 0 || !window.matchMedia("(pointer: fine)").matches) return;

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
}
