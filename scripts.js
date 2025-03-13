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

// Movie data array
const movies = [
    {
        title: "Avengers: End Game",
        length: "3h 1m",
        genre: "Action/Sci-Fi",
        synopsis: `The surviving members of the Avengers and their allies attempt to 
        reverse Thanos's actions and bring back humanity.`,
        rating: "PG",
        trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c",
        poster: "images/movies/avengers-end-game.jpg"
    },
    {
        title: "A Complete Unknown",
        length: "2h 20m",
        genre: "Music, Drama",
        synopsis: `In the early 1960s, 19-year-old Bob Dylan arrives in New York with his 
        guitar and revolutionary talent, destined to change the course of American music.`,
        rating: "PG",
        trailer: "https://www.youtube.com/watch?v=FdV-Cs5o8mc",
        poster: "images/movies/a-complete-unknown.jpg"
    },
    {
        title: "Conclave",
        length: "2h",
        genre: "Thriller/Mystery",
        synopsis: `Cardinal Lawrence has one of the world's most secretive and ancient events, 
        participating in the selection of a new pope. Surrounded by powerful religious leaders 
        in the halls of the Vatican, he soon uncovers a trail of deep secrets that could shake 
        the very foundation of the Roman Catholic Church.`,
        rating: "PG",
        trailer: "https://www.youtube.com/watch?v=JX9jasdi3ic",
        poster: "images/movies/conclave.jpg"
    },
    {
        title: "Dune: Part Two",
        length: "2h 46m",
        genre: "Sci-Fi/Adventure",
        synopsis: `Paul Atreides unites with Chani and the Fremen while seeking revenge 
        against the conspirators who destroyed his family. 
        Facing a choice between the love of his life and the fate of the universe, 
        he must prevent a terrible future only he can foresee.`,
        rating: "PG",
        trailer: "https://www.youtube.com/watch?v=Way9Dexny3w",
        poster: "images/movies/dune-2.jpeg"
    },
    {
        title: "Flow",
        length: "1h 25m",
        genre: "Adventure/Family/Animation",
        synopsis: `Cat is a solitary animal, but as its home is devastated by a great flood, 
        he finds refuge on a boat populated by various species, and will have to team up with 
        them despite their differences.`,
        rating: "PG",
        trailer: "https://www.youtube.com/watch?v=ZgZccxuj2RY",
        poster: "images/movies/flow.jpg"
    },
    {
        title: "I'm Still Here",
        length: "2h 15m",
        genre: "Drama/Historical drama",
        synopsis: `Eunice Paiva begins a lonely battle to learn the truth behind the disappearance of 
        her husband, former PTB deputy Rubens Paiva, while trying to keep her family together.`,
        rating: "PG-18",
        trailer: "https://www.youtube.com/watch?v=gDunV808Yf4",
        poster: "images/movies/im-still-here.jpg"
    },
    {
        title: "Nickel Boys",
        length: "2h 20m",
        genre: "Drama/Historical drama",
        synopsis: `Elwood Curtis' college dreams are shattered when he's sentenced to Nickel Academy, 
        a brutal reformatory in the Jim Crow South. Clinging to his optimistic worldview, 
        Elwood strikes up a friendship with Turner, a fellow Black teen who dispenses fundamental tips 
        for survival.`,
        rating: "PG-16",
        trailer: "https://www.youtube.com/watch?v=-2qZ429rUZw",
        poster: "images/movies/nickel-boys.jpg"
    },
    {
        title: "Nosferatu",
        length: "2h 12m",
        genre: "Horror/Mystery",
        synopsis: `In the 1830s, estate agent Thomas Hutter travels to Transylvania for a fateful 
        meeting with Count Orlok, a prospective client. In his absence, Hutter's new bride, Ellen, 
        is left under the care of their friends, Friedrich and Anna Harding. Plagued by horrific visions
        and an increasing sense of dread, Ellen soon encounters an evil force that's far beyond her 
        control.`,
        rating: "PG-18",
        trailer: "https://www.youtube.com/watch?v=nulvWqYUM8k",
        poster: "images/movies/nosferatu.jpg"
    },
    {
        title: "The Substance",
        length: "2h 20m",
        genre: " Horror/Sci-fi",
        synopsis: `Fading actress Elisabeth Sparkle becomes distressed when her chauvinistic boss 
        fires her from her aerobics show. She soon injects herself with a mysterious serum that 
        promises a younger, better version of herself, but things go horribly wrong.`,
        trailer: "https://www.youtube.com/watch?v=LNlrGhBpYjc",
        rating: "PG-18",
        poster: "images/movies/the-substance.jpg"
    },
    {
        title: "Wicked",
        length: "2h 40m",
        genre: "Musical/Fantasy",
        synopsis: `Misunderstood because of her green skin, a young woman named Elphaba forges an 
        unlikely but profound friendship with Glinda, a student with an unflinching desire for 
        popularity. Following an encounter with the Wizard of Oz, their relationship soon reaches 
        a crossroad as their lives begin to take very different paths.`,
        trailer: "https://www.youtube.com/watch?v=6COmYeLsz4c",
        rating: "PG",
        poster: "images/movies/wicked.jpg"
    }
];


// Function to render movies
function renderMovies() {
    const moviesGrid = document.querySelector(".movies-grid");
    if (! moviesGrid) {
        return
    }
    moviesGrid.innerHTML = ""; // Clear existing content

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-item");

        movieCard.innerHTML = `
            <a class = "movie-item">
                <div class="movie-poster">
                    <img src="${movie.poster}" alt="${movie.title}" class="poster-image"/>
                </div>
                <div class="movie-title">${movie.title}</div>
                <div class="movie-showtime">Next Showing: XX:XX</div>
            </a>
            
        `;

        movieCard.addEventListener('click', () => {
            localStorage.setItem('selectedMovie', JSON.stringify(movie));
            window.location.href = 'movie-details.html';
        });

        moviesGrid.appendChild(movieCard);
    });
}


// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    updateCartItems();
    renderMovies();
});