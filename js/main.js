// Load components
async function loadComponent(id, path) {
    try {
        const response = await fetch(path);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${id}:`, error);
    }
}

// Load all components
async function loadAllComponents() {
    await Promise.all([
        loadComponent('header', 'sections/header.html'),
        loadComponent('hero', 'sections/hero.html'),
        loadComponent('about', 'sections/about.html'),
        loadComponent('skills', 'sections/skills.html'),
        loadComponent('experience', 'sections/experience.html'),
        loadComponent('projects', 'sections/projects.html'),
        loadComponent('contact', 'sections/contact.html'),
        loadComponent('footer', 'sections/footer.html')
    ]);

    // Initialize after components are loaded
    initializePage();
}

function initializePage() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
        });
    }

    // Initialize scroll animations
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
}

// Scroll animation for sections
function animateOnScroll() {
    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
            element.classList.add('animate-appear');
        } else {
            element.classList.remove('animate-appear');
        }
    });
}

// Load components when the page loads
document.addEventListener('DOMContentLoaded', loadAllComponents);
