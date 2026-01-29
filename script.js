/* ===== ROOM SELECTOR ===== */
const roomOptions = document.querySelectorAll('.room-option');
const heroImage = document.getElementById('hero-image');
const priceTag = document.getElementById('price-tag');

const roomData = {
    charlotte: {
        image: 'images/main-bedroom-view.jpg',
        alt: 'Cozy bedroom with natural light',
        price: '$625'
    },
    other: {
        image: 'images/cheaper-room.jpg',
        alt: 'Spacious room with direct bathroom access',
        price: '$575'
    }
};

roomOptions.forEach(option => {
    option.addEventListener('click', () => {
        const room = option.dataset.room;
        
        // Update active state
        roomOptions.forEach(o => o.classList.remove('active'));
        option.classList.add('active');
        
        // Update hero image and price
        heroImage.src = roomData[room].image;
        heroImage.alt = roomData[room].alt;
        priceTag.innerHTML = `${roomData[room].price}<span>/mo</span>`;
    });
});

/* ===== SMOOTH SCROLL ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

/* ===== SCROLL ANIMATIONS ===== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fact, .feature-item, .req-item, .process-step').forEach(el => {
    el.style.cssText = 'opacity: 0; transform: translateY(20px); transition: opacity 0.6s, transform 0.6s;';
    observer.observe(el);
});

/* ===== LIGHTBOX GALLERY ===== */
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

// Pan state
let isPanning = false;
let panX = 0, panY = 0, startX = 0, startY = 0, lastX = 0, lastY = 0;

// Open lightbox
galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        currentImageIndex = index;
        currentZoom = 100;
        lightbox.classList.add('active');
        updateLightboxImage();
        document.body.style.overflow = 'hidden';
    });
});

// Close lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentZoom = 100;
    panX = panY = 0;
}

function updateLightboxImage() {
    lightboxImg.style.transform = `scale(${currentZoom / 100}) translate(${panX}px, ${panY}px)`;
    imageCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
    zoomLevel.textContent = `${currentZoom}%`;
    lightboxImg.src = images[currentImageIndex];
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    currentZoom = 100;
    panX = panY = 0;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    currentZoom = 100;
    panX = panY = 0;
    updateLightboxImage();
}

function zoomIn() {
    if (currentZoom < 300) {
        currentZoom += 25;
        lightboxImg.style.transition = 'none';
        lightboxImg.style.transform = `scale(${currentZoom / 100}) translate(${panX}px, ${panY}px)`;
        zoomLevel.textContent = `${currentZoom}%`;
        setTimeout(() => { lightboxImg.style.transition = 'transform 0.2s ease'; }, 0);
    }
}

function zoomOut() {
    if (currentZoom > 100) {
        currentZoom -= 25;
        lightboxImg.style.transition = 'none';
        lightboxImg.style.transform = `scale(${currentZoom / 100}) translate(${panX}px, ${panY}px)`;
        zoomLevel.textContent = `${currentZoom}%`;
        setTimeout(() => { lightboxImg.style.transition = 'transform 0.2s ease'; }, 0);
    }
}

// Lightbox controls
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevImage);
lightboxNext.addEventListener('click', nextImage);
zoomInBtn.addEventListener('click', zoomIn);
zoomOutBtn.addEventListener('click', zoomOut);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

/* ===== PAN/DRAG ===== */
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
    if (!isPanning || currentZoom <= 100) return;
    
    const deltaX = (e.clientX - lastX) * 0.4;
    const deltaY = (e.clientY - lastY) * 0.4;
    const maxPan = (currentZoom - 100) / 100 * 150;
    
    panX = Math.max(-maxPan, Math.min(maxPan, panX + deltaX));
    panY = Math.max(-maxPan, Math.min(maxPan, panY + deltaY));
    
    lastX = e.clientX;
    lastY = e.clientY;
    lightboxImg.style.transform = `scale(${currentZoom / 100}) translate(${panX}px, ${panY}px)`;
});

document.addEventListener('mouseup', () => {
    isPanning = false;
    lightboxImg.style.cursor = currentZoom > 100 ? 'grab' : 'auto';
    lightboxImg.style.transition = 'transform 0.2s ease';
});

lightboxImg.addEventListener('mouseenter', () => { if (currentZoom > 100) lightboxImg.style.cursor = 'grab'; });
lightboxImg.addEventListener('mouseleave', () => { lightboxImg.style.cursor = 'auto'; });

/* ===== KEYBOARD NAV ===== */
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') closeLightbox();
    if (e.key === '+' || e.key === '=') zoomIn();
    if (e.key === '-') zoomOut();
});

/* ===== PHONE CONTACT MENU ===== */
const phoneContactBtn = document.getElementById('phone-contact-btn');
const phoneMenu = document.getElementById('phone-menu');

if (phoneContactBtn && phoneMenu) {
    phoneContactBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        phoneMenu.style.display = phoneMenu.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', (e) => {
        if (!phoneContactBtn.contains(e.target) && !phoneMenu.contains(e.target)) {
            phoneMenu.style.display = 'none';
        }
    });

    phoneMenu.querySelectorAll('.contact-menu-item').forEach(item => {
        item.addEventListener('click', () => { phoneMenu.style.display = 'none'; });
    });
}
