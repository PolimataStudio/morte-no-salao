// animations.js - Animações com Intersection Observer
function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
}

// Adicionar classe 'animate-on-scroll' a elementos que devem animar
// Exemplo: ao adicionar a classe a um card, ele aparecerá com fadeUp.
// Podemos aplicar no JavaScript ou já no HTML.
// Vamos aplicar automaticamente em cards, seções etc.
document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.personagem-card, .depoimento-card, .capitulo-item, .sobre__text, .sobre__stats, .autor__grid');
    targets.forEach(el => el.classList.add('animate-on-scroll'));
    // Re-inicializar o observer após adicionar as classes
    initScrollAnimations();
});