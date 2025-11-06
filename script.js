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
    
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('apareceu');
                observer.unobserve(entry.target); 
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeElements.forEach(element => {
        // A introdução aparece imediatamente (não precisa de observer)
        if (element.id !== 'introducao') {
            observer.observe(element);
        } else {
            element.classList.add('apareceu');
        }
    });


    // -----------------------------------------------------------------
    // 3. Botão Voltar ao Topo
    // -----------------------------------------------------------------
    const backToTopButton = document.getElementById('back-to-top');
    const scrollTrigger = 400; 

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
    const minimumLoadTime = 1500; // 1.5s

    const startTime = Date.now(); 

    function hideSplashScreen() {
        const elapsedTime = Date.now() - startTime;
        const delay = Math.max(0, minimumLoadTime - elapsedTime);

        setTimeout(() => {
            splashScreen.classList.add('loaded'); 
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 1000); 
            
        }, delay);
    }
    
    window.addEventListener('load', hideSplashScreen);

    console.log("Projeto Folclore Nordestino inicializado com sucesso.");
});