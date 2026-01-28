// Smooth scroll behavior for navigation links
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

// Add scroll animation for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.fact, .feature-item, .roommate-card, .req-item, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============ LIGHTBOX GALLERY ============
const galleryImages = document.querySelectorAll('.gallery-image');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const zoomInBtn = document.getElementById('zoom-in');
const zoomOutBtn = document.getElementById('zoom-out');
const zoomLevel = document.getElementById('zoom-level');
const imageCounter = document.getElementById('image-counter');

let currentImageIndex = 0;
let currentZoom = 100;
const images = Array.from(galleryImages).map(img => img.src);

// Pan variables
let isPanning = false;
let panX = 0;
let panY = 0;
let startX = 0;
let startY = 0;
let lastX = 0;
let lastY = 0;

// Open lightbox on image click
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImageIndex = index;
        currentZoom = 100;
        openLightbox();
    });
});

function openLightbox() {
    lightbox.classList.add('active');
    updateLightboxImage();
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentZoom = 100;
    panX = 0;
    panY = 0;
}

function updateLightboxImage() {
    lightboxImg.src = images[currentImageIndex];
    lightboxImg.style.transform = `scale(${currentZoom / 100}) translate(${panX}px, ${panY}px)`;
    imageCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    zoomLevel.textContent = `${currentZoom}%`;
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    currentZoom = 100;
    panX = 0;
    panY = 0;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    currentZoom = 100;
    panX = 0;
    panY = 0;
    updateLightboxImage();
}

function zoomIn() {
    if (currentZoom < 300) {
        currentZoom += 25;
        lightboxImg.style.transition = 'none';
        lightboxImg.style.transform = `scale(${currentZoom / 100}) translate(${panX}px, ${panY}px)`;
        zoomLevel.textContent = `${currentZoom}%`;
        setTimeout(() => {
            lightboxImg.style.transition = 'transform 0.2s ease';
        }, 0);
    }
}

function zoomOut() {
    if (currentZoom > 100) {
        currentZoom -= 25;
        lightboxImg.style.transition = 'none';
        lightboxImg.style.transform = `scale(${currentZoom / 100}) translate(${panX}px, ${panY}px)`;
        zoomLevel.textContent = `${currentZoom}%`;
        setTimeout(() => {
            lightboxImg.style.transition = 'transform 0.2s ease';
        }, 0);
    }
}

// Event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevImage);
lightboxNext.addEventListener('click', nextImage);
zoomInBtn.addEventListener('click', zoomIn);
zoomOutBtn.addEventListener('click', zoomOut);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// ============ PAN/DRAG FUNCTIONALITY ============
lightboxImg.addEventListener('mousedown', (e) => {
    if (currentZoom > 100) {
        e.preventDefault();
        isPanning = true;
        startX = e.clientX - panX;
        startY = e.clientY - panY;
        lastX = e.clientX;
        lastY = e.clientY;
        lightboxImg.style.cursor = 'grabbing';
        lightboxImg.style.transition = 'none';
    }
});

document.addEventListener('mousemove', (e) => {
    if (isPanning && currentZoom > 100) {
        const deltaX = (e.clientX - lastX) * 0.4; // slower
        const deltaY = (e.clientY - lastY) * 0.4; // slower
        
        let newPanX = panX + deltaX;
        let newPanY = panY + deltaY;
        
        // Calculate max pan distance based on zoom level
        const maxPan = (currentZoom - 100) / 100 * 150; // Scale with zoom
        
        // Clamp pan values to keep image within bounds
        newPanX = Math.max(-maxPan, Math.min(maxPan, newPanX));
        newPanY = Math.max(-maxPan, Math.min(maxPan, newPanY));
        
        panX = newPanX;
        panY = newPanY;
        lastX = e.clientX;
        lastY = e.clientY;
        
        lightboxImg.style.transform = `scale(${currentZoom / 100}) translate(${panX}px, ${panY}px)`;
    }
});

document.addEventListener('mouseup', () => {
    isPanning = false;
    lightboxImg.style.cursor = currentZoom > 100 ? 'grab' : 'auto';
    lightboxImg.style.transition = 'transform 0.2s ease';
});

// Update cursor on hover when zoomed in
lightboxImg.addEventListener('mouseenter', () => {
    if (currentZoom > 100) {
        lightboxImg.style.cursor = 'grab';
    }
});

lightboxImg.addEventListener('mouseleave', () => {
    lightboxImg.style.cursor = 'auto';
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') closeLightbox();
    if (e.key === '+' || e.key === '=') zoomIn();
    if (e.key === '-') zoomOut();
});

console.log('Website loaded - Happy Valley Room Rental 🏠');

// ============ PHONE CONTACT MENU ============
const phoneContactBtn = document.getElementById('phone-contact-btn');
const phoneMenu = document.getElementById('phone-menu');

if (phoneContactBtn && phoneMenu) {
    phoneContactBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        phoneMenu.style.display = phoneMenu.style.display === 'none' ? 'block' : 'none';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!phoneContactBtn.contains(e.target) && !phoneMenu.contains(e.target)) {
            phoneMenu.style.display = 'none';
        }
    });

    // Close menu when clicking a menu item
    const menuItems = phoneMenu.querySelectorAll('.contact-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            phoneMenu.style.display = 'none';
        });
    });
}

