// script.js
import { stackData, additionalKnowledgeData, toolData, projectData } from './data.js';

// --- FUNCIONALIDAD: Efecto Máquina de Escribir ---
const typeWriter = () => {
    const roleElement = document.getElementById('dynamic-role');
    const roles = ["Jr. Backend Developer", "Database Enthusiast", "Software Engineer"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; 
    const deletingSpeed = 50; 
    const pauseTime = 1500; 

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            speed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = pauseTime / 2;
        }

        setTimeout(type, speed);
    }

    type();
};

// --- RENDERIZADO: Stack & Tools ---
function renderTechList(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Crear el elemento de lista (<ul>)
    const ul = document.createElement('ul');
    ul.className = 'list-cols';

    data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = '> ' + item.name; // Añadir el "> "
        ul.appendChild(li);
    });

    container.appendChild(ul);
}

// --- RENDERIZADO: Proyectos ---
function renderProjects(projects) {
    const container = document.getElementById('projects-grid');
    if (!container) return;

    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        card.innerHTML = `
            <div class="icon-top"><i data-lucide="folder"></i></div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p class="tech-stack">${project.stack}</p>
        `;
        
        container.appendChild(card);
    });
    
    // Inicializar los iconos de Lucide que acabamos de crear
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// --- INICIO DE LA APLICACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    typeWriter(); 
    renderTechList(stackData, 'stack-list');
    renderTechList(toolData, 'tools-list');
    renderTechList(additionalKnowledgeData, 'additional-knowledge-list');
    renderProjects(projectData);
});