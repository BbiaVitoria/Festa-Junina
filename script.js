document.addEventListener('DOMContentLoaded', function() {
    
    // -----------------------------------------------------------------
    // 1. Rolagem Suave para links de navegação
    // -----------------------------------------------------------------
    const navLinks = document.querySelectorAll('#navbar a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // -----------------------------------------------------------------
    // 2. Animação Fade-in on Scroll (Intersection Observer)
    // -----------------------------------------------------------------
    
    // Usa a classe 'fade-in'
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Adiciona a classe 'apareceu' para aplicar a animação definida no CSS
            if (entry.isIntersecting) {
                entry.target.classList.add('apareceu');
                observer.unobserve(entry.target); 
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeElements.forEach(element => {
        // O cabeçalho (hero-header) e o primeiro elemento já devem aparecer imediatamente
        if (element.classList.contains('hero-header') || element.id === 'introducao') {
            element.classList.add('apareceu');
        } else {
            observer.observe(element);
        }
    });


    // -----------------------------------------------------------------
    // 3. Botão Voltar ao Topo
    // -----------------------------------------------------------------
    const backToTopButton = document.getElementById('back-to-top');
    const scrollTrigger = 400; // Ponto de rolagem em pixels

    // Função para mostrar ou esconder o botão
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollTrigger) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    // Função para rolar suavemente ao topo
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    });


    // -----------------------------------------------------------------
    // 4. Splash Screen / Loader
    // -----------------------------------------------------------------
    const splashScreen = document.getElementById('splash-screen');
    const minimumLoadTime = 1500; // Tempo mínimo de 1.5s de exibição

    const startTime = Date.now(); 

    function hideSplashScreen() {
        const elapsedTime = Date.now() - startTime;
        const delay = Math.max(0, minimumLoadTime - elapsedTime);

        setTimeout(() => {
            splashScreen.classList.add('loaded'); // Inicia o fade-out
            setTimeout(() => {
                splashScreen.style.display = 'none'; // Remove após o fade-out terminar
            }, 1000); 
            
        }, delay);
    }
    
    // Oculta a tela assim que o DOM e os recursos são carregados
    window.addEventListener('load', hideSplashScreen);
});