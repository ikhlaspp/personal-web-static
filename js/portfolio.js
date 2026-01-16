// Portfolio Projects - Load from Google Sheets

// Configuration
const CONFIG = {
    // Replace with your Google Sheets ID and API Key
    SHEET_ID: '1f24Jz4OlrRoadBInRjqMXKBCkxFPeU6Lv2Ur2YMCibs',
    API_KEY: 'AIzaSyA7-G6S2SkM9V87P8LtsPdcaBX2c2YArIU',
    SHEET_NAME: 'projects', // Name of your sheet tab
};

// Function to convert Google Drive link to direct image URL
function convertGoogleDriveLink(url) {
    if (!url) return '';
    
    // Check if it's a Google Drive link
    if (url.includes('drive.google.com')) {
        // Extract file ID from various Google Drive URL formats
        let fileId = '';
        
        // Format: https://drive.google.com/file/d/FILE_ID/view
        const match1 = url.match(/\/file\/d\/([^\/]+)/);
        if (match1) {
            fileId = match1[1];
        }
        
        // Format: https://drive.google.com/open?id=FILE_ID
        const match2 = url.match(/[?&]id=([^&]+)/);
        if (match2) {
            fileId = match2[1];
        }
        
        // If we found a file ID, convert to direct link
        // Using thumbnail format which is more reliable for public images
        if (fileId) {
            return `https://lh3.googleusercontent.com/d/${fileId}`;
        }
    }
    
    return url;
}

// Function to fetch projects from Google Sheets
async function fetchProjects() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${CONFIG.SHEET_ID}/values/${CONFIG.SHEET_NAME}?key=${CONFIG.API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.values && data.values.length > 1) {
            // First row is headers, rest are data
            const headers = data.values[0];
            const rows = data.values.slice(1);
            
            // Convert to array of objects
            const projects = rows.map(row => {
                const project = {};
                headers.forEach((header, index) => {
                    project[header.toLowerCase()] = row[index] || '';
                });
                return project;
            }).filter(project => project.title); // Filter out empty rows
            
            displayProjects(projects);
        } else {
            displayEmptyState();
        }
    } catch (error) {
        console.error('Error fetching projects:', error);
        displayError();
    }
}

// Function to display projects
function displayProjects(projects) {
    const container = document.getElementById('projects-container');
    
    if (!container) return;
    
    if (projects.length === 0) {
        displayEmptyState();
        return;
    }
    
    container.innerHTML = projects.map((project, index) => {
        // Parse technologies if it's a comma-separated string
        const technologies = project.technologies 
            ? project.technologies.split(',').map(tech => tech.trim()) 
            : [];
        
        // Convert Google Drive link to direct image URL
        const imageUrl = convertGoogleDriveLink(project.image) || 'https://placehold.co/600x400/1f2937/60a5fa?text=Web+Project';
        
        return `
            <div class="bg-gray-800 rounded-xl overflow-hidden card-hover group portfolio-card" data-project-index="${index}">
                <div class="portfolio-card-overlay"></div>
                <div class="relative overflow-hidden">
                    <img src="${imageUrl}" 
                         alt="${project.title}" 
                         class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                         onerror="this.src='https://placehold.co/600x400/1f2937/60a5fa?text=Web+Project'">
                    <div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                </div>
                <div class="p-6">
                    <h4 class="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">${project.title}</h4>
                    <p class="text-gray-400 text-sm mb-4 line-clamp-2">${project.description || ''}</p>
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${technologies.map(tech => 
                            `<span class="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">${tech}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Store projects data globally for modal
    window.portfolioProjects = projects;
    
    // Add click event listeners to portfolio cards
    addPortfolioCardListeners();
}

// Function to display empty state
function displayEmptyState() {
    const container = document.getElementById('projects-container');
    if (container) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-folder-open text-6xl text-gray-600 mb-4"></i>
                <p class="text-gray-500 text-lg">No projects available yet.</p>
                <p class="text-gray-600 text-sm mt-2">Check back soon for updates!</p>
            </div>
        `;
    }
}

// Function to display error state
function displayError() {
    const container = document.getElementById('projects-container');
    if (container) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <i class="fas fa-exclamation-triangle text-6xl text-yellow-600 mb-4"></i>
                <p class="text-gray-500 text-lg">Failed to load projects.</p>
                <p class="text-gray-600 text-sm mt-2">Please try again later.</p>
            </div>
        `;
    }
}

// Load projects when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if we have valid config
    if (CONFIG.SHEET_ID === 'YOUR_GOOGLE_SHEET_ID_HERE' || CONFIG.API_KEY === 'YOUR_GOOGLE_API_KEY_HERE') {
        // Show demo projects if API not configured
        displayDemoProjects();
    } else {
        fetchProjects();
    }
});

// Demo projects for testing (will be replaced by Google Sheets data)
function displayDemoProjects() {
    const demoProjects = [
        {
            title: 'E-Commerce Website',
            description: 'A fully responsive online store with shopping cart, product catalog, and checkout system.',
            image: 'https://placehold.co/600x400/1f2937/60a5fa?text=E-Commerce',
            technologies: 'HTML, CSS, JavaScript, Laravel',
            url: '#'
        },
        {
            title: 'Portfolio Website',
            description: 'Modern and clean portfolio website showcasing projects and skills.',
            image: 'https://placehold.co/600x400/1f2937/60a5fa?text=Portfolio',
            technologies: 'HTML, Tailwind CSS, JavaScript',
            url: '#'
        },
        {
            title: 'Task Management App',
            description: 'Web application for managing tasks and projects with drag-and-drop functionality.',
            image: 'https://placehold.co/600x400/1f2937/60a5fa?text=Task+App',
            technologies: 'React, Node.js, MongoDB',
            url: '#'
        }
    ];
    
    displayProjects(demoProjects);
}

// Portfolio Modal Functions
function addPortfolioCardListeners() {
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-project-index'));
            openPortfolioModal(index);
        });
    });
}

function openPortfolioModal(index) {
    const project = window.portfolioProjects[index];
    if (!project) return;
    
    const modal = document.getElementById('portfolio-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTechnologies = document.getElementById('modal-technologies');
    const modalLink = document.getElementById('modal-link');
    
    // Set modal content with converted Google Drive link
    const imageUrl = convertGoogleDriveLink(project.image) || 'https://placehold.co/600x400/1f2937/60a5fa?text=Web+Project';
    modalImage.src = imageUrl;
    modalImage.alt = project.title;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description || '';
    
    // Set technologies
    const technologies = project.technologies 
        ? project.technologies.split(',').map(tech => tech.trim()) 
        : [];
    modalTechnologies.innerHTML = technologies.map(tech => 
        `<span class="modal-tech-tag">${tech}</span>`
    ).join('');
    
    // Set project link
    if (project.url) {
        modalLink.href = project.url;
        modalLink.style.display = 'inline-flex';
    } else {
        modalLink.style.display = 'none';
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePortfolioModal() {
    const modal = document.getElementById('portfolio-modal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Initialize modal close handlers
document.addEventListener('DOMContentLoaded', () => {
    // Close button
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closePortfolioModal);
    }
    
    // Click outside modal
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closePortfolioModal);
    }
    
    // ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePortfolioModal();
        }
    });
});
