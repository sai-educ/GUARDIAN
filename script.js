// DOM Elements
const navLinks = document.querySelectorAll('.nav-link');
const pages = document.querySelectorAll('.page');
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');

// Mobile menu toggle functionality
menuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
});

// Page navigation functionality
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetPage = link.getAttribute('data-page');
        
        // Update active states for navigation
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Update active states for pages
        pages.forEach(page => page.classList.remove('active'));
        const targetElement = document.getElementById(targetPage);
        if (targetElement) {
            targetElement.classList.add('active');
        }
        
        // Close mobile menu after selection
        navLinksContainer.classList.remove('active');
        
        // Scroll to top without animation
        window.scrollTo(0, 0);
        
        // Update URL hash without triggering scroll
        history.pushState(null, null, `#${targetPage}`);
    });
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const hash = window.location.hash.slice(1);
    if (hash) {
        const targetLink = document.querySelector(`[data-page="${hash}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
});

// Initialize page based on URL hash
document.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.slice(1);
    if (hash) {
        const targetLink = document.querySelector(`[data-page="${hash}"]`);
        if (targetLink) {
            targetLink.click();
        }
    }
    
    // Initialize map placeholder
    initializeMap();
    
    // Initialize smooth scroll for anchor links
    initializeSmoothScroll();
});

// Map initialization (placeholder for actual implementation)
function initializeMap() {
    const mapContainer = document.getElementById('mapContainer');
    if (mapContainer) {
        console.log('Map container ready for OpenStreetMap/NASA API integration');
        
        // This is where you would initialize the actual map
        // Example structure for future implementation:
        /*
        if (typeof L !== 'undefined') {
            // Initialize Leaflet map
            const map = L.map('mapContainer').setView([0, 0], 2);
            
            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);
            
            // Add NASA data layers
            fetchNASAData().then(data => {
                // Process and add NASA data to map
                addNASALayers(map, data);
            });
            
            // Add interactive markers
            addInteractiveMarkers(map);
        }
        */
    }
}

// Smooth scroll for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Only prevent default for actual anchor links, not page navigation
            if (href !== '#' && !this.hasAttribute('data-page')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'auto',
                        block: 'start'
                    });
                }
            }
        });
    });
}

// NASA API Integration (placeholder)
async function fetchNASAData() {
    // This is where you would fetch NASA data
    // Example:
    /*
    const NASA_API_KEY = 'YOUR_NASA_API_KEY';
    const endpoint = `https://api.nasa.gov/planetary/earth/assets?api_key=${NASA_API_KEY}`;
    
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching NASA data:', error);
        return null;
    }
    */
    console.log('NASA API integration ready for implementation');
    return null;
}

// Add NASA data layers to map
function addNASALayers(map, data) {
    // Process and add NASA data as map layers
    console.log('Ready to add NASA data layers');
}

// Add interactive markers to map
function addInteractiveMarkers(map) {
    // Add markers for affected areas, restoration projects, etc.
    console.log('Ready to add interactive markers');
}

// Form submission handler for "Join Guardian Network"
document.querySelectorAll('.cta-button').forEach(button => {
    if (button.textContent.includes('Join') || button.textContent.includes('Start')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Here you would typically open a modal or redirect to a form
            alert('Guardian Network registration coming soon! Thank you for your interest in joining the movement.');
        });
    }
});

// Dynamic year for footer copyright
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
}

// Performance monitoring (optional)
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
    });
}

// Service Worker Registration (for PWA support - optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment the following lines when you have a service worker file
        /*
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => console.log('ServiceWorker registered'))
            .catch(err => console.log('ServiceWorker registration failed'));
        */
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Responsive image loading (lazy loading)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    // Apply to all images with data-src attribute
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Export functions for potential use in other modules
window.guardianApp = {
    initializeMap,
    fetchNASAData,
    addNASALayers,
    addInteractiveMarkers,
    debounce
};
