// Loader script
const loader = document.getElementById('loader');

function hideLoader() {
    loader.classList.add('hidden');
    document.body.classList.remove('loading');
}

// Oculta el loader cuando la página esté completamente cargada
window.addEventListener('load', function () {
    // Mínimo 1.5s para que la animación se vea completa
    setTimeout(hideLoader, 1500);
});

// Fallback: si tarda más de 4s, ocultar de todas formas
setTimeout(hideLoader, 4000);

// Navegación hamburguesa
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        // Actualizar enlace activo
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Scroll suave y actualización de navegación activa
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Actualizar enlace activo al hacer scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animación de entrada
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar efectos de entrada a todos los elementos
document.querySelectorAll('.project-card, .service-card, .skill-card, .timeline-item, .section-title, .section-subtitle, .hero-content, .about-grid, .about-text, .contact-container, .contact-info-section, .contact-form-section, footer').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Projects
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(hideLoader, 1500);
});
setTimeout(hideLoader, 3000);

// ========== CARRUSEL AUTOMÁTICO ==========
class ProjectCarousel {
    constructor() {
        this.container = document.querySelector('.carousel-container');
        if (!this.container) return;

        this.items = document.querySelectorAll('.carousel-item');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.carousel-prev');
        this.nextBtn = document.querySelector('.carousel-next');
        
        this.currentIndex = 0;
        this.autoPlayInterval = null;
        this.autoPlayDelay = 5000; // 5 segundos entre transiciones

        this.init();
    }

    init() {
        // Event listeners para botones
        this.prevBtn?.addEventListener('click', () => this.prev());
        this.nextBtn?.addEventListener('click', () => this.next());

        // Event listeners para indicadores
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        // Pausar en hover, reanudar al salir
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());

        this.startAutoPlay();
    }

    showSlide(index) {
        // Validar índice
        if (index >= this.items.length) {
            this.currentIndex = 0;
        } else if (index < 0) {
            this.currentIndex = this.items.length - 1;
        } else {
            this.currentIndex = index;
        }

        // Actualizar items
        this.items.forEach((item, i) => {
            item.classList.toggle('active', i === this.currentIndex);
        });

        // Actualizar indicadores
        this.indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === this.currentIndex);
        });
    }

    next() {
        this.showSlide(this.currentIndex + 1);
        this.resetAutoPlay();
    }

    prev() {
        this.showSlide(this.currentIndex - 1);
        this.resetAutoPlay();
    }

    goToSlide(index) {
        this.showSlide(index);
        this.resetAutoPlay();
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.showSlide(this.currentIndex + 1);
        }, this.autoPlayDelay);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// Inicializar carrusel cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new ProjectCarousel();
    });
} else {
    new ProjectCarousel();
}