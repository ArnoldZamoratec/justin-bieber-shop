// Shopping Cart Functionality for Justin Bieber Shop
class ShoppingCart {
    constructor() {
        this.items = [];
        this.isOpen = false;
        this.storageKey = 'jb_shop_cart';
        this.init();
    }

    init() {
        try {
            this.loadCartFromStorage();
            this.bindEvents();
            this.updateCartUI();
        } catch (error) {
            console.error('Error initializing cart:', error);
        }
    }

    // Event Binding
    bindEvents() {
        try {
            // Cart toggle button
            const cartToggle = document.getElementById('cartToggle');
            if (cartToggle) {
                cartToggle.addEventListener('click', () => this.toggleCart());
            }

            // Cart close button
            const cartClose = document.getElementById('cartClose');
            if (cartClose) {
                cartClose.addEventListener('click', () => this.closeCart());
            }

            // Continue shopping button
            const continueShopping = document.getElementById('continueShopping');
            if (continueShopping) {
                continueShopping.addEventListener('click', () => this.closeCart());
            }

            // Close cart when clicking overlay
            const cartOverlay = document.getElementById('cartOverlay');
            if (cartOverlay) {
                cartOverlay.addEventListener('click', (e) => {
                    if (e.target === cartOverlay) {
                        this.closeCart();
                    }
                });
            }

            // Escape key to close cart
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.closeCart();
                }
            });

            // Add to cart buttons (future implementation)
            this.bindAddToCartButtons();
        } catch (error) {
            console.error('Error binding cart events:', error);
        }
    }

    bindAddToCartButtons() {
        try {
            // Future implementation for add to cart buttons
            const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const productData = this.extractProductData(button);
                    this.addItem(productData);
                });
            });
        } catch (error) {
            console.error('Error binding add to cart buttons:', error);
        }
    }

    // Cart Operations
    addItem(product) {
        try {
            if (!product || !product.id) {
                throw new Error('Invalid product data');
            }

            const existingItem = this.items.find(item => item.id === product.id);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.items.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }

            this.saveCartToStorage();
            this.updateCartUI();
            this.showNotification(`${product.title} added to cart`);
            
            return true;
        } catch (error) {
            console.error('Error adding item to cart:', error);
            this.showNotification('Failed to add item to cart', 'error');
            return false;
        }
    }

    removeItem(productId) {
        try {
            const itemIndex = this.items.findIndex(item => item.id === productId);
            
            if (itemIndex > -1) {
                const removedItem = this.items.splice(itemIndex, 1)[0];
                this.saveCartToStorage();
                this.updateCartUI();
                this.showNotification(`${removedItem.title} removed from cart`);
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error removing item from cart:', error);
            this.showNotification('Failed to remove item from cart', 'error');
            return false;
        }
    }

    updateQuantity(productId, quantity) {
        try {
            if (quantity < 0) {
                throw new Error('Quantity cannot be negative');
            }

            const item = this.items.find(item => item.id === productId);
            
            if (item) {
                if (quantity === 0) {
                    return this.removeItem(productId);
                }
                
                item.quantity = quantity;
                this.saveCartToStorage();
                this.updateCartUI();
                return true;
            }
            
            return false;
        } catch (error) {
            console.error('Error updating item quantity:', error);
            this.showNotification('Failed to update quantity', 'error');
            return false;
        }
    }

    clearCart() {
        try {
            this.items = [];
            this.saveCartToStorage();
            this.updateCartUI();
            this.showNotification('Cart cleared');
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    }

    // Cart UI Management
    toggleCart() {
        try {
            if (this.isOpen) {
                this.closeCart();
            } else {
                this.openCart();
            }
        } catch (error) {
            console.error('Error toggling cart:', error);
        }
    }

    openCart() {
        try {
            const cartOverlay = document.getElementById('cartOverlay');
            if (cartOverlay) {
                cartOverlay.classList.add('active');
                this.isOpen = true;
                document.body.style.overflow = 'hidden';
                
                // Focus management for accessibility
                const cartClose = document.getElementById('cartClose');
                if (cartClose) {
                    cartClose.focus();
                }
            }
        } catch (error) {
            console.error('Error opening cart:', error);
        }
    }

    closeCart() {
        try {
            const cartOverlay = document.getElementById('cartOverlay');
            if (cartOverlay) {
                cartOverlay.classList.remove('active');
                this.isOpen = false;
                document.body.style.overflow = '';
                
                // Return focus to cart toggle button
                const cartToggle = document.getElementById('cartToggle');
                if (cartToggle) {
                    cartToggle.focus();
                }
            }
        } catch (error) {
            console.error('Error closing cart:', error);
        }
    }

    updateCartUI() {
        try {
            this.updateCartCount();
            this.updateCartContent();
        } catch (error) {
            console.error('Error updating cart UI:', error);
        }
    }

    updateCartCount() {
        try {
            const totalItems = this.getTotalItems();
            const cartToggle = document.getElementById('cartToggle');
            
            if (cartToggle) {
                // Update cart button text or add badge
                const existingBadge = cartToggle.querySelector('.cart-badge');
                
                if (totalItems > 0) {
                    if (!existingBadge) {
                        const badge = document.createElement('span');
                        badge.className = 'cart-badge';
                        badge.style.cssText = `
                            position: absolute;
                            top: -8px;
                            right: -8px;
                            background: #ff0000;
                            color: white;
                            border-radius: 50%;
                            width: 20px;
                            height: 20px;
                            font-size: 12px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: bold;
                        `;
                        cartToggle.style.position = 'relative';
                        cartToggle.appendChild(badge);
                    }
                    
                    const badge = cartToggle.querySelector('.cart-badge');
                    if (badge) {
                        badge.textContent = totalItems;
                    }
                } else if (existingBadge) {
                    existingBadge.remove();
                }
            }
        } catch (error) {
            console.error('Error updating cart count:', error);
        }
    }

    updateCartContent() {
        try {
            const cartBody = document.querySelector('.cart-body');
            if (!cartBody) return;

            if (this.items.length === 0) {
                cartBody.innerHTML = `
                    <p>Time to fill up the cart</p>
                    <button class="continue-shopping-btn" id="continueShopping">Continue shopping</button>
                `;
                
                // Re-bind continue shopping button
                const continueShopping = document.getElementById('continueShopping');
                if (continueShopping) {
                    continueShopping.addEventListener('click', () => this.closeCart());
                }
            } else {
                cartBody.innerHTML = this.generateCartItemsHTML();
                this.bindCartItemEvents();
            }

            // Update cart header
            const cartHeader = document.querySelector('.cart-header h2');
            if (cartHeader) {
                cartHeader.textContent = this.items.length === 0 ? 'Your cart is empty' : `Cart (${this.getTotalItems()})`;
            }
        } catch (error) {
            console.error('Error updating cart content:', error);
        }
    }

    generateCartItemsHTML() {
        try {
            const itemsHTML = this.items.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <p class="cart-item-price">$${item.price}</p>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" data-action="decrease">-</button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn plus" data-action="increase">+</button>
                        </div>
                    </div>
                    <button class="remove-item-btn" data-id="${item.id}">×</button>
                </div>
            `).join('');

            const total = this.getTotal();

            return `
                <div class="cart-items">
                    ${itemsHTML}
                </div>
                <div class="cart-footer">
                    <div class="cart-total">
                        <strong>Total: $${total.toFixed(2)}</strong>
                    </div>
                    <button class="checkout-btn">Checkout</button>
                    <button class="continue-shopping-btn" id="continueShopping">Continue shopping</button>
                </div>
            `;
        } catch (error) {
            console.error('Error generating cart items HTML:', error);
            return '<p>Error loading cart items</p>';
        }
    }

    bindCartItemEvents() {
        try {
            // Quantity buttons
            const quantityBtns = document.querySelectorAll('.quantity-btn');
            quantityBtns.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const cartItem = e.target.closest('.cart-item');
                    const productId = cartItem.dataset.id;
                    const action = e.target.dataset.action;
                    const currentQuantity = parseInt(cartItem.querySelector('.quantity').textContent);
                    
                    if (action === 'increase') {
                        this.updateQuantity(productId, currentQuantity + 1);
                    } else if (action === 'decrease') {
                        this.updateQuantity(productId, Math.max(0, currentQuantity - 1));
                    }
                });
            });

            // Remove item buttons
            const removeButtons = document.querySelectorAll('.remove-item-btn');
            removeButtons.forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = e.target.dataset.id;
                    this.removeItem(productId);
                });
            });

            // Continue shopping button
            const continueShopping = document.getElementById('continueShopping');
            if (continueShopping) {
                continueShopping.addEventListener('click', () => this.closeCart());
            }
        } catch (error) {
            console.error('Error binding cart item events:', error);
        }
    }

    // Storage Management
    saveCartToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.items));
        } catch (error) {
            console.error('Error saving cart to storage:', error);
        }
    }

    loadCartFromStorage() {
        try {
            const savedCart = localStorage.getItem(this.storageKey);
            if (savedCart) {
                this.items = JSON.parse(savedCart);
            }
        } catch (error) {
            console.error('Error loading cart from storage:', error);
            this.items = [];
        }
    }

    // Utility Methods
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotal() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    extractProductData(button) {
        try {
            const productCard = button.closest('.product-card');
            if (!productCard) return null;

            return {
                id: productCard.dataset.id || Date.now().toString(),
                title: productCard.querySelector('.product-title')?.textContent || 'Unknown Product',
                price: parseFloat(productCard.querySelector('.product-price')?.textContent.replace('$', '') || '0'),
                image: productCard.querySelector('.product-image')?.src || ''
            };
        } catch (error) {
            console.error('Error extracting product data:', error);
            return null;
        }
    }

    showNotification(message, type = 'success') {
        try {
            // Create a simple notification
            const notification = document.createElement('div');
            notification.className = `notification notification-${type}`;
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'error' ? '#ff4444' : '#44ff44'};
                color: white;
                padding: 1rem;
                border-radius: 4px;
                z-index: 10000;
                animation: slideIn 0.3s ease;
            `;
            notification.textContent = message;

            document.body.appendChild(notification);

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        } catch (error) {
            console.error('Error showing notification:', error);
        }
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        window.cart = new ShoppingCart();
    } catch (error) {
        console.error('Error initializing shopping cart:', error);
    }
});

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .cart-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid #e5e5e5;
        gap: 1rem;
    }
    
    .cart-item-image {
        width: 60px;
        height: 60px;
        object-fit: cover;
        border-radius: 4px;
    }
    
    .cart-item-details {
        flex: 1;
    }
    
    .cart-item-title {
        font-size: 0.9rem;
        font-weight: 500;
        margin-bottom: 0.25rem;
    }
    
    .cart-item-price {
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 0.5rem;
    }
    
    .cart-item-quantity {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .quantity-btn {
        background: #f5f5f5;
        border: 1px solid #e5e5e5;
        width: 30px;
        height: 30px;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .quantity-btn:hover {
        background: #e5e5e5;
    }
    
    .remove-item-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #999;
        padding: 0.5rem;
    }
    
    .remove-item-btn:hover {
        color: #ff4444;
    }
    
    .cart-footer {
        padding: 1rem;
        border-top: 1px solid #e5e5e5;
    }
    
    .cart-total {
        margin-bottom: 1rem;
        text-align: center;
        font-size: 1.1rem;
    }
    
    .checkout-btn {
        width: 100%;
        background: #000;
        color: #fff;
        border: none;
        padding: 1rem;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 4px;
        margin-bottom: 0.5rem;
    }
    
    .checkout-btn:hover {
        background: #333;
    }
`;

document.head.appendChild(notificationStyles);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShoppingCart;
}
