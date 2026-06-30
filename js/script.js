/**
 * script.js - Script principal do site Morte no Salão de Beleza
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Morte no Salão de Beleza - Site carregado');

    // ===== MENU MOBILE =====
const menuToggle = document.querySelector('.header__menu-toggle');
const nav = document.querySelector('.header__nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true' || false;
        this.setAttribute('aria-expanded', !expanded);
        nav.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link (opcional)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('active');
        });
    });
}

    // ===== SCROLL PROGRESS BAR =====
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = progress + '%';
    });

    // ===== SCROLL REVEAL (animações de entrada) =====
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal--visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback: exibe todos os elementos
        revealElements.forEach(el => el.classList.add('reveal--visible'));
    }

    // ===== CONTADOR DE ESTATÍSTICAS =====
    const statNumbers = document.querySelectorAll('.stat-number');

    if ('IntersectionObserver' in window && statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count'), 10);
                    if (!isNaN(target) && target > 0) {
                        animateCounter(el, target);
                    }
                    counterObserver.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(el => counterObserver.observe(el));
    }

    function animateCounter(el, target) {
        let current = 0;
        const increment = Math.ceil(target / 60); // 60 frames ~ 1s
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = current;
            }
        }, 16);
    }

    // ===== BOTÃO MAGNÉTICO (efeito de mouse) =====
    const magneticBtns = document.querySelectorAll('.btn--magnetic');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            this.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
            this.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    });

    // ===== VALIDAÇÃO BÁSICA DO FORMULÁRIO (opcional) =====
    const form = document.querySelector('.form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');

            if (nome && email) {
                if (nome.value.trim() === '' || email.value.trim() === '') {
                    e.preventDefault();
                    alert('Por favor, preencha todos os campos obrigatórios.');
                    return false;
                }

                // Validação simples de email
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(email.value.trim())) {
                    e.preventDefault();
                    alert('Por favor, insira um e-mail válido.');
                    return false;
                }
            }
            // Se tudo ok, o formulário será enviado normalmente via Static Forms
            return true;
        });
    }

    // ===== HEADER SCROLL =====
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ===== RIPPLE EFFECT NOS BOTÕES =====
    const buttons = document.querySelectorAll('.btn:not(.btn--no-ripple)');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});