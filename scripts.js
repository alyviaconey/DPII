// JavaScript for basic prototype functionality
let cartItems = [];
let cartCount = 0;

function toggleCart() {
    const cartPanel = document.querySelector('.cart-panel');
    cartPanel.classList.toggle('open');
}

function addToCart(name, size, price) {
    // Store cart in localStorage for persistence between pages
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    cartItems.push({
        name: name,
        size: size,
        price: price
    });
    
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartBadge();
    updateCartItems();
    
    // Show a small notification
    alert(`Added ${size} ${name} to cart!`);
}

function updateCartBadge() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartBadge = document.querySelector('.cart-badge');
    cartBadge.textContent = cartItems.length;
    
    if (cartItems.length > 0) {
        cartBadge.style.display = 'flex';
    } else {
        cartBadge.style.display = 'none';
    }
}

function updateCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) return;
    
    cartItemsContainer.innerHTML = '';
    
    let total = 0;
    
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        const itemDetails = document.createElement('div');
        itemDetails.className = 'cart-item-details';
        
        const itemTitle = document.createElement('div');
        itemTitle.className = 'cart-item-title';
        itemTitle.textContent = item.name;
        
        const itemSubtitle = document.createElement('div');
        itemSubtitle.className = 'cart-item-subtitle';
        itemSubtitle.textContent = item.size;
        
        itemDetails.appendChild(itemTitle);
        itemDetails.appendChild(itemSubtitle);
        
        const itemPrice = document.createElement('div');
        itemPrice.className = 'cart-item-price';
        itemPrice.textContent = `$${item.price.toFixed(2)}`;
        
        itemElement.appendChild(itemDetails);
        itemElement.appendChild(itemPrice);
        
        cartItemsContainer.appendChild(itemElement);
        
        total += item.price;
    });
    
    // Update total
    const cartTotal = document.querySelector('.cart-total span:last-child');
    if (cartTotal) {
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Ticket selection functionality
let tickets = {
    adult: 0,
    child: 0,
    senior: 0
};

function incrementTicket(type) {
    tickets[type]++;
    const ticketElement = document.getElementById(`${type}Tickets`);
    if (ticketElement) {
        ticketElement.textContent = tickets[type];
        updateTicketTotal();
    }
}

function decrementTicket(type) {
    if (tickets[type] > 0) {
        tickets[type]--;
        const ticketElement = document.getElementById(`${type}Tickets`);
        if (ticketElement) {
            ticketElement.textContent = tickets[type];
            updateTicketTotal();
        }
    }
}

function updateTicketTotal() {
    // Simple calculation for demonstration
    const adultPrice = 12.99;
    const childPrice = 8.99;
    const seniorPrice = 10.99;
    
    const total = 
        (tickets.adult * adultPrice) + 
        (tickets.child * childPrice) + 
        (tickets.senior * seniorPrice);
    
    const ticketTotal = document.querySelector('.ticket-total');
    if (ticketTotal) {
        ticketTotal.textContent = `TOTAL: $${total.toFixed(2)}`;
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    updateCartItems();
});