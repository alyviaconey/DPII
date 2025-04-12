// JavaScript for basic prototype functionality
let cartItems = [];
let cartCount = 0;
let selected = 0;

 
function validateSeats(){
    t = JSON.parse(localStorage.getItem('cartItems'));
    if(selected < (t['adult']+t['child']+t['senior'])) alert(`Select ${(t['adult']+t['child']+t['senior']) - selected} more seats`)
    else {
        localStorage.setItem('lastPage', "seat-selection.html");
        window.location.href = 'order-summary.html';
    }
}

function validateFood(){
    food = localStorage.getItem('cartItems');
    if(food == null) alert("Add at least 1 item");
    else{
        localStorage.setItem('lastPage', "food.html");
        window.location.href = 'order-summary.html';
    }
}

function prevPage(current_location){
    // this is to handle where different paths can merge (i.e. checkout pages for food or tickets), also when
    // href attribute is not availible directly from html (i.e. using a button or something)
    console.log(window.location.href);
    // window.location.href = lastPage;
    // lastPage = "../index.html";
    switch (current_location){
        case "select-options.html":
            window.location.href = "../index.html";
            break;
        case "movie-details.html":
            window.location.href = "select-movie.html";
            break;
        case "select-movie.html":
            window.location.href = "select-options.html"
            break;
        case "order-summary.html":
            // this is where the differentiation happens
            window.location.href = localStorage.getItem('lastPage');
            break;
    }
}


function toggleCart() {
    const cartPanel = document.getElementById('cartPanel');
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

    let tickets = JSON.parse(localStorage.getItem('tickets')) || {};
    const ticketPrices = { adult: 12.99, child: 8.99, senior: 10.99 };

    // Add food items
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item flex justify-between items-center p-2 border-b border-gray-600';

        const itemDetails = document.createElement('div');
        itemDetails.className = 'cart-item-details flex-1 text-white';

        const itemTitle = document.createElement('div');
        itemTitle.className = 'cart-item-title font-bold';
        itemTitle.textContent = item.name;

        const itemSubtitle = document.createElement('div');
        itemSubtitle.className = 'cart-item-subtitle text-sm text-gray-300';
        itemSubtitle.textContent = item.size;

        itemDetails.appendChild(itemTitle);
        itemDetails.appendChild(itemSubtitle);

        const itemPrice = document.createElement('div');
        itemPrice.className = 'cart-item-price font-bold text-white';
        itemPrice.textContent = `$${item.price.toFixed(2)}`;

        const removeBtn = document.createElement('button');
        removeBtn.className = 'text-red-400 hover:text-red-600 text-xs ml-2';
        removeBtn.textContent = '✕';
        removeBtn.title = 'Remove';
        removeBtn.onclick = () => removeCartItem(index);

        itemElement.appendChild(itemDetails);
        itemElement.appendChild(itemPrice);
        itemElement.appendChild(removeBtn);

        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    // Add ticket items
    Object.entries(ticketPrices).forEach(([type, price]) => {
        const quantity = tickets[type] || 0;
        if (quantity > 0) {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item flex justify-between items-center p-2 border-b border-gray-600';

            const itemDetails = document.createElement('div');
            itemDetails.className = 'cart-item-details flex-1 text-white';

            const itemTitle = document.createElement('div');
            itemTitle.className = 'cart-item-title font-bold';
            itemTitle.text


function removeCartItem(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartBadge();
    updateCartItems();
}

function clearCart() {
    // Remove cart items from localStorage
    localStorage.removeItem('cartItems');
    localStorage.removeItem('tickets');
    localStorage.removeItem('movie');
    // Update the badge and cart items container
    updateCartBadge();
    updateCartItems();
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

function saveTickets(){
    console.log(tickets);
    if(tickets['adult'] + tickets['child'] + tickets['senior'] == 0) alert("Add at least 1 ticket");
    else{ 
        localStorage.setItem('tickets', JSON.stringify(tickets));
        window.location.href = "seat-selection.html"
    }
}


// Movie data array
const movies = [
    {
        title: "ANORA",
        length: "2h 19m",
        genre: "Drama/Comedy/Romance",
        synopsis: `A young sex worker from Brooklyn gets her chance at a Cinderella story when she 
        meets and impulsively marries the son of an oligarch. 
        Once the news reaches Russia, her fairytale is threatened as his parents set out to get 
        the marriage annulled.`,
        rating: "R",
        poster: "../assets/images/movies/anora.jpg",
        trailer: "../assets/videos/anora.mp4"
    },
    {
        title: "AVENGERS: ENDGAME",
        length: "3h 1m",
        genre: "Action/Sci-Fi",
        synopsis: `The surviving members of the Avengers and their allies attempt to 
        reverse Thanos's actions and bring back humanity.`,
        rating: "PG",
        poster: "../assets/images/movies/avengers-end-game.jpg",
        trailer: "../assets/videos/avengers-endgame.mp4"
    },
    {
        title: "A COMPLETE UNKNOWN",
        length: "2h 20m",
        genre: "Music, Drama",
        synopsis: `In the early 1960s, 19-year-old Bob Dylan arrives in New York with his 
        guitar and revolutionary talent, destined to change the course of American music.`,
        rating: "PG",
        poster: "../assets/images/movies/a-complete-unknown.jpg",
        trailer: "../assets/videos/a-complete-unknown.mp4"
    },
    {
        title: "CONCLAVE",
        length: "2h",
        genre: "Thriller/Mystery",
        synopsis: `Cardinal Lawrence has one of the world's most secretive and ancient events, 
        participating in the selection of a new pope. Surrounded by powerful religious leaders 
        in the halls of the Vatican, he soon uncovers a trail of deep secrets that could shake 
        the very foundation of the Roman Catholic Church.`,
        rating: "PG",
        poster: "../assets/images/movies/conclave.jpg",
        trailer: "../assets/videos/conclave.mp4"
    },
    {
        title: "DUNE: PART TWO",
        length: "2h 46m",
        genre: "Sci-Fi/Adventure",
        synopsis: `Paul Atreides unites with Chani and the Fremen while seeking revenge 
        against the conspirators who destroyed his family. 
        Facing a choice between the love of his life and the fate of the universe, 
        he must prevent a terrible future only he can foresee.`,
        rating: "PG",
        poster: "../assets/images/movies/dune-2.jpg",
        trailer: "../assets/videos/dune-2.mp4"
    },
    {
        title: "FLOW",
        length: "1h 25m",
        genre: "Adventure/Family/Animation",
        synopsis: `Cat is a solitary animal, but as its home is devastated by a great flood, 
        he finds refuge on a boat populated by various species, and will have to team up with 
        them despite their differences.`,
        rating: "PG",
        poster: "../assets/images/movies/flow.jpg",
        trailer: "../assets/videos/flow.mp4"
    },
    {
        title: "I'M STILL HERE",
        length: "2h 15m",
        genre: "Drama/Historical drama",
        synopsis: `Eunice Paiva begins a lonely battle to learn the truth behind the disappearance of 
        her husband, former PTB deputy Rubens Paiva, while trying to keep her family together.`,
        rating: "PG-18",
        poster: "../assets/images/movies/im-still-here.jpg",
        trailer: "../assets/videos/im-still-here.mp4"
    },
    {
        title: "NICKEL BOYS",
        length: "2h 20m",
        genre: "Drama/Historical drama",
        synopsis: `Elwood Curtis' college dreams are shattered when he's sentenced to Nickel Academy, 
        a brutal reformatory in the Jim Crow South. Clinging to his optimistic worldview, 
        Elwood strikes up a friendship with Turner, a fellow Black teen who dispenses fundamental tips 
        for survival.`,
        rating: "PG-16",
        poster: "../assets/images/movies/nickel-boys.jpg",
        trailer: "../assets/videos/nickel-boys.mp4"
    },
    {
        title: "NOSFERATU",
        length: "2h 12m",
        genre: "Horror/Mystery",
        synopsis: `In the 1830s, estate agent Thomas Hutter travels to Transylvania for a fateful 
        meeting with Count Orlok, a prospective client. In his absence, Hutter's new bride, Ellen, 
        is left under the care of their friends, Friedrich and Anna Harding. Plagued by horrific visions
        and an increasing sense of dread, Ellen soon encounters an evil force that's far beyond her 
        control.`,
        rating: "PG-18",
        poster: "../assets/images/movies/nosferatu.jpg",
        trailer: "../assets/videos/nosferatu.mp4"
    },
    {
        title: "SING SING",
        length: "1h 47m",
        genre: "Drama",
        synopsis: `Divine G, imprisoned at Sing Sing for a crime he didn't commit, 
        finds purpose by acting in a theatre group alongside other incarcerated men in this story of resilience,
         humanity, and the transformative power of art.`,
        rating: "PG-13",
        poster: "../assets/images/movies/sing-sing.jpg",
        trailer: "../assets/videos/sing-sing.mp4"
    },
    {
        title: "THE SUBSTANCE",
        length: "2h 20m",
        genre: " Horror/Sci-fi",
        synopsis: `Fading actress Elisabeth Sparkle becomes distressed when her chauvinistic boss 
        fires her from her aerobics show. She soon injects herself with a mysterious serum that 
        promises a younger, better version of herself, but things go horribly wrong.`,
        rating: "PG-18",
        poster: "../assets/images/movies/the-substance.jpg",
        trailer: "../assets/videos/the-substance.mp4"
    },
    {
        title: "WICKED",
        length: "2h 40m",
        genre: "Musical/Fantasy",
        synopsis: `Misunderstood because of her green skin, a young woman named Elphaba forges an 
        unlikely but profound friendship with Glinda, a student with an unflinching desire for 
        popularity. Following an encounter with the Wizard of Oz, their relationship soon reaches 
        a crossroad as their lives begin to take very different paths.`,
        rating: "PG",
        poster: "../assets/images/movies/wicked.png",
        trailer: "../assets/videos/wicked.mp4"
    }
];


function renderMovies() {
    const moviesGrid = document.querySelector(".movies-grid");
    if (!moviesGrid) return;
    
    moviesGrid.innerHTML = ""; // Clear existing content
    const detailPage = window.location.href.includes('movie-preview.html') ? 'preview-details.html' : 'movie-details.html';
    
    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-item");
        
        movieCard.innerHTML = `
            <a class="movie-item group" href="${detailPage}">
                <div class="bg-gray-800 rounded-lg overflow-hidden shadow-md transition-transform duration-300 group-hover:scale-105">
                    <div class="relative w-full aspect-[2/3]">
                        <img src="${movie.poster}" alt="${movie.title}" class="absolute inset-0 object-cover w-full h-full"/>
                    </div>
                </div>
                <div class="mt-2 text-center">
                    <div class="movie-title text-white font-bold text-sm">${movie.title}</div>
                    <div class="movie-showtime text-gray-400 text-xs">Next Showing: XX:XX</div>
                </div>
            </a>
        `;
        
        movieCard.addEventListener('click', () => {
            localStorage.setItem('selectedMovie', JSON.stringify(movie));
            window.location.href = detailPage;
        });
        
        moviesGrid.appendChild(movieCard);
    });
}



function getMovie() {
    if (!(window.location.href).includes("movie-details.html")) {
        return
    }
    const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));

    if (selectedMovie) {
        document.getElementsByClassName('movie-title')[0].textContent = selectedMovie.title;
        document.getElementsByClassName('movie-length')[0].textContent = `LENGTH: ${selectedMovie.length}`;
        document.getElementsByClassName('movie-genre')[0].textContent = `GENRE: ${selectedMovie.genre}`;
        document.getElementsByClassName('movie-rating')[0].textContent = `RATED: ${selectedMovie.rating}`;
        document.getElementsByClassName('movie-synopsis')[0].textContent = `SYNOPSIS: ${selectedMovie.synopsis}`;

        // Update the poster image
        const posterElement = document.getElementsByClassName('poster-image-large');
        posterElement[0].src = selectedMovie.poster;
        ;

        // Update the inline trailer video source if present
        const videoElement = document.querySelector('video');
        if (videoElement) {
            videoElement.src = selectedMovie.trailer;
        }

    } else {
        console.error('No movie data found in localStorage.');
    }
    
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCartBadge();
    updateCartItems();
    renderMovies();
    getMovie();
});

// Add seat selection functionality
function toggleSeatSelection(seat) {
    t = JSON.parse(localStorage.getItem('tickets'));
    if (seat.classList.contains('bg-green-300') && selected < (t['adult']+t['child']+t['senior'])) {
      // If seat is available, mark it as selected.
      seat.classList.remove('bg-green-300', 'border-green-500');
      seat.classList.add('bg-pink-300', 'border-pink-500');
      selected++;
    } else if (seat.classList.contains('bg-pink-300')) {
      // If seat is selected, revert back to available.
      seat.classList.remove('bg-pink-300', 'border-pink-500');
      seat.classList.add('bg-green-300', 'border-green-500');
      selected--;
    }
    
    // // Update selected seats counter (counts all elements with bg-pink-300)
    const selectedSeats = document.querySelectorAll('.bg-pink-300').length;
    document.querySelector('.seat-counter').textContent = `${selectedSeats}/${t['adult']+t['child']+t['senior']}`;
  }
