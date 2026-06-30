// effects.js - Efeitos visuais extras (parallax, glow, etc.)
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        hero.style.backgroundPositionY = scrollY * 0.2 + 'px';
    });
}

// Efeito de brilho em botões (opcional)
function initButtonGlow() {
    const buttons = document.querySelectorAll('.btn--primary');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.boxShadow = '0 0 20px rgba(247,45,0,0.4)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.boxShadow = '';
        });
    });
}

// Scroll progress (opcional)
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed; top: 0; left: 0; height: 3px; 
        background: var(--color-secondary); 
        width: 0%; z-index: 9999; 
        transition: width 0.1s;
    `;
    document.body.prepend(progressBar);
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initParallaxEffect();
    initButtonGlow();
    initScrollProgress();
});