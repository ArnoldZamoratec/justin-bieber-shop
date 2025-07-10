// Global Scripts for Justin Bieber Shop
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    try {
        initializeNavigation();
        initializeProductInteractions();
        initializeImageLazyLoading();
        initializeErrorHandling();
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Navigation Functionality
function initializeNavigation() {
    try {
        // Collections dropdown toggle
        const collectionsBtn = document.querySelector('.nav-button');
        if (collectionsBtn) {
            collectionsBtn.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
            });
        }

        // Smooth scrolling for anchor links
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile menu handling (if needed in future)
        handleMobileMenu();
    } catch (error) {
        console.error('Error initializing navigation:', error);
    }
}

function handleMobileMenu() {
    // Future implementation for mobile hamburger menu
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        // Add mobile-specific navigation behavior
    }
}

// Product Interactions
function initializeProductInteractions() {
    try {
        // Product card hover effects
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const primaryImage = card.querySelector('.product-image.primary');
            const secondaryImage = card.querySelector('.product-image.secondary');
            
            if (primaryImage && secondaryImage) {
                // Mouse enter - show secondary image
                card.addEventListener('mouseenter', function() {
                    primaryImage.style.opacity = '0';
                    secondaryImage.style.opacity = '1';
                });
                
                // Mouse leave - show primary image
                card.addEventListener('mouseleave', function() {
                    primaryImage.style.opacity = '1';
                    secondaryImage.style.opacity = '0';
                });
            }
            
            // Product card click handling
            card.addEventListener('click', function(e) {
                // Prevent default if we want to handle product page navigation
                // e.preventDefault();
                // handleProductClick(this);
            });
        });

        // Navigation buttons
        initializeProductNavigation();
    } catch (error) {
        console.error('Error initializing product interactions:', error);
    }
}

function initializeProductNavigation() {
    try {
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                // Future implementation for pagination
                console.log('Previous products');
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                // Future implementation for pagination
                console.log('Next products');
            });
        }
    } catch (error) {
        console.error('Error initializing product navigation:', error);
    }
}

// Lazy Loading for Images
function initializeImageLazyLoading() {
    try {
        // Check if Intersection Observer is supported
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        loadImage(img);
                        observer.unobserve(img);
                    }
                });
            });

            // Observe all images with loading="lazy"
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            lazyImages.forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without Intersection Observer
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            lazyImages.forEach(loadImage);
        }
    } catch (error) {
        console.error('Error initializing lazy loading:', error);
    }
}

function loadImage(img) {
    try {
        if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        }
        
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            handleImageError(this);
        });
    } catch (error) {
        console.error('Error loading image:', error);
    }
}

// Error Handling
function initializeErrorHandling() {
    try {
        // Handle image loading errors
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('error', function() {
                handleImageError(this);
            });
        });

        // Global error handler
        window.addEventListener('error', function(e) {
            console.error('Global error:', e.error);
        });
    } catch (error) {
        console.error('Error initializing error handling:', error);
    }
}

function handleImageError(img) {
    try {
        // Set a placeholder or fallback image
        img.style.background = '#f5f5f5';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        img.alt = 'Image not available';
        
        // Create a placeholder text
        if (!img.dataset.errorHandled) {
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: #999;
                font-size: 14px;
                text-align: center;
            `;
            placeholder.textContent = 'Image not available';
            
            if (img.parentNode) {
                img.parentNode.style.position = 'relative';
                img.parentNode.appendChild(placeholder);
            }
            
            img.dataset.errorHandled = 'true';
        }
    } catch (error) {
        console.error('Error handling image error:', error);
    }
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Resize handler
const handleResize = debounce(function() {
    try {
        // Handle responsive behavior
        handleMobileMenu();
    } catch (error) {
        console.error('Error handling resize:', error);
    }
}, 250);

window.addEventListener('resize', handleResize);

// Scroll handler for performance optimizations
const handleScroll = throttle(function() {
    try {
        // Future implementation for scroll-based features
        // e.g., header transparency, scroll-to-top button
    } catch (error) {
        console.error('Error handling scroll:', error);
    }
}, 100);

window.addEventListener('scroll', handleScroll);

// Export functions for testing or external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        initializeNavigation,
        initializeProductInteractions,
        handleImageError,
        debounce,
        throttle
    };
}
