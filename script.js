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
        // O cabeçalho (hero-header) e o primeiro elemento (introducao) aparecem imediatamente
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
    
    window.addEventListener('load', hideSplashScreen);


    // -----------------------------------------------------------------
    // 5. Galeria de Imagens (Modal / Lightbox)
    // -----------------------------------------------------------------
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-image");
    const captionText = document.getElementById("modal-caption");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const closeModal = document.querySelector(".modal-close");

    galleryItems.forEach(item => {
        item.style.cursor = 'pointer'; 
        
        item.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.getAttribute('data-caption');
        });
    });

    // Fecha o modal ao clicar no 'X'
    closeModal.onclick = function() { 
        modal.style.display = "none";
    }

    // Fecha o modal ao clicar fora da imagem
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    
    console.log("Projeto Folclore Nordestino inicializado com sucesso. Modal, Citação, Linha do Tempo e animações ativados.");
});