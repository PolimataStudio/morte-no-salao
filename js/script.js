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

    // ===== SCROLL REVEAL =====
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
        const increment = Math.ceil(target / 60);
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

    // ===== BOTÃO MAGNÉTICO =====
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

    // ===== FORMULÁRIO COM FETCH (SUCESSO E ERRO) =====
    const form = document.querySelector('.form');
    const successOverlay = document.getElementById('successOverlay');
    const errorOverlay = document.getElementById('errorOverlay');
    const closeSuccess = document.getElementById('closeSuccess');
    const closeError = document.getElementById('closeError');

    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validação básica
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const mensagem = document.getElementById('mensagem');

            if (!nome || !email) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            if (nome.value.trim() === '' || email.value.trim() === '') {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }

            // Prepara os dados
            const formData = new FormData(form);
            const url = form.getAttribute('action');

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                const data = await response.json();

                if (response.ok && data.success !== false) {
                    // Sucesso!
                    form.reset();
                    showOverlay('success');
                } else {
                    // Erro retornado pela API
                    showOverlay('error');
                }
            } catch (error) {
                console.error('Erro no envio:', error);
                showOverlay('error');
            }
        });
    }

    // Função para exibir overlay
    function showOverlay(type) {
        const overlay = type === 'success' ? successOverlay : errorOverlay;
        if (overlay) {
            overlay.classList.add('active');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            // Scroll suave para o topo
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // Fecha automaticamente após 8 segundos (sucesso) ou mantém (erro)
            if (type === 'success') {
                setTimeout(() => {
                    hideOverlay('success');
                }, 8000);
            }
        }
    }

    // Função para ocultar overlay
    function hideOverlay(type) {
        const overlay = type === 'success' ? successOverlay : errorOverlay;
        if (overlay) {
            overlay.classList.remove('active');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    // Fechar overlays com os botões
    if (closeSuccess) {
        closeSuccess.addEventListener('click', function() {
            hideOverlay('success');
        });
    }

    if (closeError) {
        closeError.addEventListener('click', function() {
            hideOverlay('error');
        });
    }

    // Fechar overlays clicando fora do modal (apenas no fundo)
    [successOverlay, errorOverlay].forEach(overlay => {
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === this) {
                    const type = this.id === 'successOverlay' ? 'success' : 'error';
                    hideOverlay(type);
                }
            });
        }
    });

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

    // ===== RIPPLE EFFECT =====
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
