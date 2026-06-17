/* ===== Navigation Toggle ===== */
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/* ===== Active Nav Link on Scroll ===== */
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 150;
        const bottom = top + section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

/* ===== Typing Effect ===== */
const typedEl = document.getElementById('typed');
const words = ['Développeur Fullstack', 'Étudiant en Licence Informatique', 'Passionné par le Web'];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (!isDeleting && charIndex <= currentWord.length) {
        typedEl.textContent = currentWord.substring(0, charIndex);
        charIndex++;
        if (charIndex > currentWord.length) {
            isWaiting = true;
            setTimeout(() => {
                isWaiting = false;
                isDeleting = true;
                typeEffect();
            }, 1500);
            return;
        }
        setTimeout(typeEffect, 80);
    } else if (isDeleting) {
        typedEl.textContent = currentWord.substring(0, charIndex);
        charIndex--;
        if (charIndex < 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 400);
            return;
        }
        setTimeout(typeEffect, 40);
    }
}

typeEffect();

/* ===== Scroll Reveal Animations ===== */
const revealElements = document.querySelectorAll(
    '.about-card, .skill-item, .timeline-item, .project-card, .contact-item, .contact-form'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal', 'visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => observer.observe(el));

/* ===== Skill Bars Animation on Scroll ===== */
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

/* ===== Contact Form ===== */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Veuillez remplir les champs obligatoires.');
        return;
    }

    const mailtoLink = `mailto:ranaivolisonfitahianamihary@gmail.com?subject=${encodeURIComponent(subject || 'Contact Portfolio')}&body=${encodeURIComponent(
        `Nom: ${name}\nEmail: ${email}\n\n${message}`
    )}`;

    window.open(mailtoLink, '_blank');

    contactForm.reset();
});

/* ===== Sticky Header Shadow ===== */
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.style.boxShadow = window.scrollY > 50
        ? '0 4px 20px rgba(0,0,0,0.3)'
        : 'none';
});
