const navigation = [
    {

        links: ["Home", "Shop", "Plant Care", "Blogs"],
        button: "Login",
        bars: "fa-solid fa-bars"
    }
];

function addNavigation() {
    let result = "";

    navigation.forEach(item => {
        item.links.forEach(link => {
            result += `
                        <li class="nav__item">
                            <a href="#">${link}</a>
                        </li>
                    `;
        });

        result += `
                    <li class="nav__item">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <i class="fa-solid fa-cart-shopping"></i>
                        <button class="btn">
                            <i class="fa-solid fa-right-to-bracket"></i>
                            ${item.button}
                        </button>
                    </li>
                `;
    });

    document.getElementById("nav__list").innerHTML = result;
}

addNavigation();

const bars = document.getElementById("bars");
const navList = document.getElementById("nav__list");

bars.addEventListener("click", (e) => {
    e.stopPropagation();
    navList.classList.toggle("active");


    const barsIcon = bars.querySelector("i");
    if (navList.classList.contains("active")) {
        barsIcon.classList.remove("fa-bars");
        barsIcon.classList.add("fa-xmark");

        document.body.style.overflow = "hidden";
    } else {
        barsIcon.classList.remove("fa-xmark");
        barsIcon.classList.add("fa-bars");
        document.body.style.overflow = "";
    }
});


document.addEventListener("click", function (event) {
    if (window.innerWidth <= 768 &&
        navList.classList.contains("active") &&
        !navList.contains(event.target) &&
        !bars.contains(event.target)) {

        navList.classList.remove("active");
        const barsIcon = bars.querySelector("i");
        barsIcon.classList.remove("fa-xmark");
        barsIcon.classList.add("fa-bars");
        document.body.style.overflow = "";
    }
});

document.addEventListener("click", function (event) {
    if (window.innerWidth <= 768 &&
        navList.classList.contains("active") &&
        (event.target.tagName === 'A' ||
            event.target.closest('a') ||
            event.target.tagName === 'BUTTON' ||
            event.target.closest('button'))) {


        setTimeout(() => {
            navList.classList.remove("active");
            const barsIcon = bars.querySelector("i");
            barsIcon.classList.remove("fa-xmark");
            barsIcon.classList.add("fa-bars");
            document.body.style.overflow = "";
        }, 300);
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && navList.classList.contains("active")) {
        navList.classList.remove("active");
        const barsIcon = bars.querySelector("i");
        barsIcon.classList.remove("fa-xmark");
        barsIcon.classList.add("fa-bars");
        document.body.style.overflow = "";
    }
});

// ================================header========================


const headerData = [
    {
        small: "images/1.png", 
        large: "images/2.png", 
        title: "Welcome to GreenShop",
        title2: "Let’s Make a Better <span class='span'>Planet</span>",
        text: "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to <br> create an unique Urban Jungle. Order your favorite plants!",
        button: "SHOP NOW"
    },
    {
        small: "images/1.png", 
        large: "images/4.png", 
       
    },
    {
        small: "images/1.png", 
        large: "images/8.png", 
    }
];

let imageIndex = 0; 
let autoSlideTimeout;


function renderStaticContent() {
    const mainContainer = document.getElementById("main-header-content");
    const staticItem = headerData[0]; 
    
    if (!staticItem) return;

    const contentHTML = `
        <div class="header__content">
            <div class="header__text">
                <h2 class="header__subtitle">${staticItem.title}</h2>
                <h1 class="header__title">${staticItem.title2}</h1> 
                <p class="header__text1">${staticItem.text}</p>
                <button class="header__button">${staticItem.button}</button>
            </div>

            <div class="header__images">
                <img id="small-plant" class="header__img fade" src="${staticItem.small}" alt="Small Plant">
                <img id="large-plant" class="header__image fade" src="${staticItem.large}" alt="Large Plant">
            </div>
        </div>
        
        <a class="prev" onclick="plusImages(-1)">❮</a>
        <a class="next" onclick="plusImages(1)">❯</a>
        <div id="dots-container" class="dots"></div>
    `;

    mainContainer.innerHTML = contentHTML;
    
   
    initializeImageSlider();
}


function showImages(n) {
    const smallPlant = document.getElementById("small-plant");
    const largePlant = document.getElementById("large-plant");
    const dots = document.getElementsByClassName("dot");

   
    if (!smallPlant || !largePlant) return;

    
    if (n >= headerData.length) {imageIndex = 0;}    
    if (n < 0) {imageIndex = headerData.length - 1;}

    
    const currentImages = headerData[imageIndex];

    
    smallPlant.classList.remove('fade');
    largePlant.classList.remove('fade');
    void smallPlant.offsetWidth;
    void largePlant.offsetWidth; 

    
    smallPlant.src = currentImages.small;
    largePlant.src = currentImages.large;

   
    smallPlant.classList.add('fade');
    largePlant.classList.add('fade');

  
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[imageIndex].className += " active";

    
    clearTimeout(autoSlideTimeout);
    autoSlideTimeout = setTimeout(() => {
        plusImages(1); 
    }, 4000); 
}


function plusImages(n) {
    imageIndex += n;
    showImages(imageIndex);
}

function currentImage(n) {
    imageIndex = n;
    showImages(imageIndex);
}


function initializeImageSlider() {
    const dotsContainer = document.getElementById("dots-container");
    let dotsHTML = "";

   
    headerData.forEach((_, index) => {
        dotsHTML += `<span class="dot" onclick="currentImage(${index})"></span>`;
    });

    dotsContainer.innerHTML = dotsHTML;

    
    showImages(imageIndex);
}


document.addEventListener('DOMContentLoaded', renderStaticContent);





// =====================main============================




const productsData = [
    {
        id: 1,
        title: "Barberton Daisy",
        text: "$119.00",
         img : "images/a.png", 
        isSale: false
    },
    {
        id: 2,
        title: "Angel Wing Begonia",
        text: "$169.00",
        img: "images/b.png",
        isSale: true,
        salePercent: "25 OFF"
    },
    {
        id: 3,
        title: "African Violet",
        text: "$199.00",
        oldPrice: "$229.00",
        img: "images/c.png",
        isSale: true,
        salePercent: "13% OFF"
    },
    {
        id: 4,
        title: "Beach Spider Lily",
        text: "$129.00",
        img: "images/d.png",
        isSale: false
    },
    {
        id: 5,
        title: "Blushing Bromeliad",
        text: "$139.00",
       img: "images/e.png",
        isSale: false
    },
    {
        id: 6,
        title: "Aluminum Plant",
       text: "$179.00",
        img: "images/f.png",
        isSale: false
    },
     {
        id: 7,
        title: "Bird's Nest Fern",
        text: "$99.00",
        img: "images/g.png",
        isSale: false
    },
     {
        id: 8,
        title: "Broadleaf Lady Palm",
        text: "$59.00",
        img: "images/h.png",
        isSale: false
    },
     {
        id: 9,
       title: "Chinese Evergreen",
        text: "$39.00",
       img: "images/i.png",
        isSale: false
    },

];
document.addEventListener('DOMContentLoaded', () => {
    const productsData = [
        { id: 1, title: "Barberton Daisy", text: "119.00", img: "images/a.png", isSale: false },
        { id: 2, title: "Angel Wing Begonia", text: "169.00", oldPrice: "199.00", img: "images/b.png", isSale: true, salePercent: "25% OFF" },
        { id: 3, title: "African Violet", text: "199.00", oldPrice: "229.00", img: "images/c.png", isSale: true, salePercent: "13% OFF" },
        { id: 4, title: "Beach Spider Lily", text: "129.00", oldPrice: "299.00", img: "images/d.png", isSale: true, salePercent: "20% OFF" },
        { id: 5, title: "Blushing Bromeliad", text: "139.00", img: "images/e.png", isSale: false },
        { id: 6, title: "Aluminum Plant", text: "179.00", oldPrice: "159.00", img: "images/f.png", isSale: true, salePercent: "15% OFF" },
        { id: 7, title: "Bird's Nest Fern", text: "99.00", oldPrice: "159.00", img: "images/g.png", isSale: true, salePercent: "10% OFF" },
        { id: 8, title: "Broadleaf Lady Palm", text: "59.00", img: "images/h.png", isSale: false },
        { id: 9, title: "Chinese Evergreen", text: "39.00", img: "images/i.png", isSale: false },
    ];

    const productList = document.getElementById('main__list');

  
    function createProductItem(product) {
        const li = document.createElement('li');
        li.className = 'product-item';
        
        let priceHtml = `<p class="product__text">$${product.text}</p>`;
        
        if (product.isSale && product.oldPrice) {
            priceHtml = `
                <p class="product__text">$${product.text}
                    <span class="product-old-price">$${product.oldPrice}</span>
                </p>
            `;
        }

        li.innerHTML = `
            <div class="product__image">
                <img src="${product.img}" alt="${product.title}">
                ${product.isSale ? `<span class="sale-badge">${product.salePercent}</span>` : ''}
                
                <!-- Animatsiyali ikonkalar -->
                <div class="product-actions">
                    <a href="#" class="action-btn" title="Sevimlilarga qo'shish">
                        <i class="far fa-heart"></i>
                    </a>
                    <a href="#" class="action-btn" title="Savatga qo'shish">
                        <i class="fas fa-shopping-cart"></i>
                    </a>
                    <a href="#" class="action-btn" title="Tezkor ko'rish">
                        <i class="fas fa-search"></i>
                    </a>
                </div>
            </div>
            
            <div class="product-details">
                <p class="product__title">${product.title}</p>
                ${priceHtml}
            </div>
        `;

        return li;
    }

    function renderProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const item = createProductItem(product);
            productList.appendChild(item);
        });
    }

   
    renderProducts(productsData);

  
    const priceSlider = document.querySelector('.slider');
    const currentPriceDisplay = document.getElementById('current-price');
    
    if (priceSlider) {
        priceSlider.addEventListener('input', (e) => {
            const minPrice = 39;
            currentPriceDisplay.textContent = `$${minPrice} - $${e.target.value}`;
        });
    }

    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            
            if (tab.textContent === 'Sale') {
                const saleProducts = productsData.filter(p => p.isSale);
                renderProducts(saleProducts);
            } else if (tab.textContent === 'New Arrivals') {
                
                renderProducts(productsData.slice(0, 3)); 
            } else {
                renderProducts(productsData);
            }
        });
    });

 
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            let sortedProducts = [...productsData];
            
            if (this.value === 'Price: Low to High') {
                sortedProducts.sort((a, b) => parseFloat(a.text) - parseFloat(b.text));
            } else {
                sortedProducts = productsData;
            }
            
            renderProducts(sortedProducts);
        });
    }

    const categoryItems = document.querySelectorAll('.category-list li');
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.style.backgroundColor = '');
            categoryItems.forEach(i => i.style.color = '');
            
            item.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
            item.style.color = 'var(--primary-color)';
            
            
        });
    });

    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        filterBtn.addEventListener('click', () => {
            const currentPrice = priceSlider.value;
            const filteredProducts = productsData.filter(product => {
                const price = parseFloat(product.text);
                return price <= currentPrice;
            });
            renderProducts(filteredProducts);
            
           
            filterBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                filterBtn.style.transform = '';
            }, 200);
        });
    }
});


// ============================article========================

const addArticle = [
    {
        img: "images/e.png",
        title: "SUMMER CACTUS <br> & SUCCULENTS",
        text: "We are an online plant shop offering a wide <br> range of cheap and trendy plants",
        button: "Find More "

    },
    {
        img: "images/c.png",
        title: "STYLING TRENDS <br> & MUCH MORE",
        text: "We are an online plant shop offering a wide <br> range of cheap and trendy plants",
        button: "Find More "

    }
];

function addCactus() {
    let result = "";
    addArticle.forEach((article) => {
        result += `<li class="article__item">
                         <img class="article__img" src="${article.img}" alt="">
                         <span class="article__span">
                         <h1 class="article__title">${article.title}</h1>
                         <p class="article__text">${article.text}</p>
                         <button class="article__button">${article.button}<i class="fas fa-arrow-right"></i></button>
                         </span>
                    </li>
                  `;
                 
                  
    });

     document.getElementById("article__list").innerHTML = result;

};
addCactus();






// ======================section================



const addSection = [
    {
        img: "images/j.png",
        septrmber: "September 12  I Read in 6 minutes",
        subtitle: "Cactus & Succulent <br> Care Tips",
        text: "Cacti are succulents are easy care <br> plants for any home or patio. ",
        link: "Read More"
    },
     {
        img: "images/k.png",
        septrmber: "September 13  I Read in 2 minutes",
        subtitle: "Top 10 Succulents for <br> Your Home",
        text: "Best in hanging baskets. Prefers <br> medium to high light.",
        link: "Read More"
    },
     {
        img: "images/l.png",
        septrmber: "September 15  I Read in 3 minutes",
        subtitle: "Cacti & Succulent <br> Care Tips",
        text: "Cacti and succulents thrive in <br> containers and because most are.. ",
        link: "Read More"
    },
     {
        img: "images/m.png",
        septrmber: "September 15  I Read in 2 minutes",
        subtitle: "Best Houseplants <br> Room by Room",
        text: "The benefits of houseplants are <br> endless. In addition to..",
        link: "Read More"
    },
];


function addPost() {
    let result = "";
    addSection.forEach((section) => {
        result += `<li class="section__item">
                            <img class="section__img" src="${section.img}" alt=""><br>
                            <span class="section__span">
                            <b class="section__sub">${section.septrmber}</b> 
                            <h1 class="section__subtitle">${section.subtitle}</h1>
                            <p class="section__text1">${section.text}</p>
                            <a class="section__link" href="">${section.link}<i class="fas fa-arrow-right"></i></a>
                            </span>
                   </li>
                 `;
    });

    document.getElementById("section__list").innerHTML = result;
};
addPost()




// =============================aside===============


const addAside = [
    {
        img: "images/18.png",
        title: "Garden Care",
        text: "We are an online plant shop offering a wide range of cheap and trendy plants."

    },
    {
        img: "images/18.png",
        title: "Plant Renovation",
        text: "We are an online plant shop offering a wide range of cheap and trendy plants."

    },
    {
        img: "images/19.png",
        title: "Watering Graden",
        text: "We are an online plant shop offering a wide range of cheap and trendy plants."

    },
    {
        title: "Would you like to join newsletters?",
        text: "We usually post offers and challenges in newsletter. We’re your online houseplant destination. We offer a wide range of houseplants and accessories shipped directly from our (green)house to yours! "

    },

];

function addCard(){
    let result = "";
    addAside.forEach((aside, index) =>{
        result += `
            <li class="aside__item">
                ${aside.img ? `<img class="aside__img" src="${aside.img}" alt="">` : ''}
                <h1 class="aside__title">${aside.title}</h1>
                ${index === 3 ? `
                    <div class="newsletter__form">
                        <input type="email" placeholder="Enter your email adress..." class="newsletter__input">
                        <button class="newsletter__button"></button>
                    </div>
                ` : ''}
                <p class="aside__text">${aside.text}</p>
            </li>
        `;
    });

    document.getElementById("aside__list").innerHTML = result;
};

addCard();


// =====================footer==========================


const addFooter = [
    {
        img: "images/logojon.png",
        location: "70 West Buckingham Ave. <br>Farmingdale, NY 11735",
        phone: "+88 01911 717 490",
        email: "contact@greenshop.com"
    }
];

function addLokatsiya(){
    let result = "";
    addFooter.forEach((footer) =>{
        result += `
            <li class="footer__item">
                <img class="footer__img" src="${footer.img}" alt="Logo">
                <a class="footer__link" href="#" style="text-decoration:none;"><i class="fas fa-map-marker-alt"></i> ${footer.location}</a>
                <a class="footer__link" href="tel:${footer.phone}"><i class="fas fa-phone"></i> ${footer.phone}</a>
                <a class="footer__link" href="mailto:${footer.email}"><i class="fas fa-envelope"></i> ${footer.email}</a>
            </li>
        `;
    });

    document.getElementById("box").innerHTML = result;
};

addLokatsiya();


const addLink = [
    {
        title: "My Account",
        links: [
            "My Account",
            "Our Stores",
            "Contact Us",
            "Career",
            "Specials"
        ]
    },
    {
        title: "Help & Guide",
        links: [
            "Help Center",
            "How to Buy",
            "Shipping & Delivery",
            "Product Policy",
            "How to Return"
        ]
    },
    {
        title: "Categories",
        links: [
            "House Plants",
            "Potter Plants",
            "Seeds",
            "Small Plants",
            "Accessories"
        ]
    },
    {
        title: "Social Media",
        icons: [
            { icon: "fab fa-facebook-f", url: "#" },
            { icon: "fab fa-instagram", url: "#" },
            { icon: "fab fa-twitter", url: "#" },
            { icon: "fab fa-linkedin", url: "#" },
            { icon: "fab fa-youtube", url: "#" }
        ]
    },
    {
        title: "We Accept",
        img: "images/paypal.png"
    }
];

function renderFooter() {
    let result = "";

    addLink.forEach(item => {
        result += `<div class="footer__box">
            <h3 class = "title">${item.title}</h3>
            <ul>`; // Asosiy <ul> ni ochdik

        if (item.links) {
            item.links.forEach(link => {
                // Linklarni <li> ichiga joylashtiramiz
                result += `<li><a class = "link" href="#">${link}</a></li>`;
            });
        }

        if (item.icons) {
            result += `<div class="social-icons">`;
            item.icons.forEach(social => {
                result += `<a href="${social.url}"><i class="${social.icon}"></i></a>`;
            });
            result += `</div>`;
        }

        if (item.img) {
            result += `<img class="pay-img" src="${item.img}" alt="">`;
        }

        result += `</ul></div>`; // Asosiy </ul> ni yopdik
    });

    document.getElementById("footer__list").innerHTML = result;
}

renderFooter();





const product = {
            title: "Barberton Daisy",
            price: 119.00,
            originalPrice: 132.22,
            rating: {
                stars: 4.5,
                review_count: 19
            },
            description: "The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground.",
            images: [
                "../images/8.png",
                "../images/a.png",
                "../images/8.png",
                "../images/a.png"
            ],
            sizes: ["S", "M", "L", "XL"],
            sku: "1995751877966",
            categories: ["Potter Plants"],
            tags: ["Home", "Garden", "Plants"]
        };

        // DOM Elements
        const mainImage = document.getElementById('mainImage');
        const thumbnailContainer = document.getElementById('thumbnailContainer');
        const productTitle = document.getElementById('productTitle');
        const productPrice = document.getElementById('productPrice');
        const productDiscount = document.getElementById('productDiscount');
        const productStars = document.getElementById('productStars');
        const productReviews = document.getElementById('productReviews');
        const productDescription = document.getElementById('productDescription');
        const sizeOptions = document.getElementById('sizeOptions');
        const quantityElement = document.getElementById('quantity');
        const productSKU = document.getElementById('productSKU');
        const productCategories = document.getElementById('productCategories');
        const productTags = document.getElementById('productTags');
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        const imageModal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const zoomBtn = document.getElementById('zoomBtn');
        const closeModal = document.getElementById('closeModal');
        
        // State variables
        let currentImageIndex = 0;
        let selectedSize = "M";
        let quantity = 1;
        let isWishlisted = false;
        
        // Calculate discount percentage
        const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        
        // Initialize the page with product data
        function initializePage() {
            // Set product info
            productTitle.textContent = product.title;
            productPrice.textContent = `$${product.price.toFixed(2)}`;
            productDiscount.textContent = `${discountPercentage}% OFF`;
            productDescription.textContent = product.description;
            productSKU.textContent = product.sku;
            productCategories.textContent = product.categories.join(", ");
            productTags.textContent = product.tags.join(", ");
            productReviews.textContent = `${product.rating.review_count} Customer Reviews`;
            
            // Create star rating
            createStarRating(product.rating.stars);
            
            // Load main image
            loadImage(mainImage, product.images[0]);
            
            // Create thumbnails
            createThumbnails();
            
            // Create size options
            createSizeOptions();
            
            // Set up event listeners
            setupEventListeners();
            
            // Initialize animations
            initializeAnimations();
        }
        
        // Load image with fade-in effect
        function loadImage(imgElement, src) {
            imgElement.src = src;
            imgElement.onload = () => {
                imgElement.classList.add('loaded');
                document.querySelector('.loader').style.display = 'none';
            };
        }
        
        // Create star rating display
        function createStarRating(rating) {
            productStars.innerHTML = '';
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;
            
            for (let i = 1; i <= 5; i++) {
                const star = document.createElement('i');
                if (i <= fullStars) {
                    star.className = 'fas fa-star';
                } else if (hasHalfStar && i === fullStars + 1) {
                    star.className = 'fas fa-star-half-alt';
                } else {
                    star.className = 'far fa-star';
                }
                productStars.appendChild(star);
            }
            
            // Add rating number
            const ratingNumber = document.createElement('span');
            ratingNumber.textContent = ` ${rating}`;
            ratingNumber.style.marginLeft = '8px';
            ratingNumber.style.fontWeight = '600';
            ratingNumber.style.color = '#444';
            productStars.appendChild(ratingNumber);
        }
        
        // Create thumbnail images
        function createThumbnails() {
            thumbnailContainer.innerHTML = '';
            
            product.images.forEach((imageSrc, index) => {
                const thumbnail = document.createElement('div');
                thumbnail.className = 'thumbnail';
                if (index === currentImageIndex) {
                    thumbnail.classList.add('active');
                }
                
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = `${product.title} - View ${index + 1}`;
                
                thumbnail.appendChild(img);
                thumbnailContainer.appendChild(thumbnail);
                
                // Add click event to thumbnail
                thumbnail.addEventListener('click', () => {
                    changeMainImage(index);
                });
            });
        }
        
        // Create size selection options
        function createSizeOptions() {
            sizeOptions.innerHTML = '';
            
            product.sizes.forEach(size => {
                const sizeOption = document.createElement('div');
                sizeOption.className = 'size-option';
                if (size === selectedSize) {
                    sizeOption.classList.add('selected');
                }
                sizeOption.textContent = size;
                
                sizeOption.addEventListener('click', () => {
                    // Remove selected class from all sizes
                    document.querySelectorAll('.size-option').forEach(option => {
                        option.classList.remove('selected');
                    });
                    
                    // Add selected class to clicked size
                    sizeOption.classList.add('selected');
                    selectedSize = size;
                    
                    // Show toast notification
                    showToast(`Size changed to ${size}`);
                });
                
                sizeOptions.appendChild(sizeOption);
            });
        }
        
        // Change main image
        function changeMainImage(index) {
            if (index === currentImageIndex) return;
            
            // Update current image index
            currentImageIndex = index;
            
            // Remove active class from all thumbnails
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            
            // Add active class to clicked thumbnail
            document.querySelectorAll('.thumbnail')[index].classList.add('active');
            
            // Fade out current image
            mainImage.classList.remove('loaded');
            
            // Load new image after a short delay
            setTimeout(() => {
                loadImage(mainImage, product.images[index]);
                modalImage.src = product.images[index];
            }, 300);
        }
        
        // Show toast notification
        function showToast(message) {
            toastMessage.textContent = message;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
        
        // Setup event listeners
        function setupEventListeners() {
            // Quantity controls
            document.getElementById('increaseQty').addEventListener('click', () => {
                quantity++;
                quantityElement.textContent = quantity;
            });
            
            document.getElementById('decreaseQty').addEventListener('click', () => {
                if (quantity > 1) {
                    quantity--;
                    quantityElement.textContent = quantity;
                }
            });
            
            // Buy Now button
            document.getElementById('buyNowBtn').addEventListener('click', () => {
                showToast(`Purchased ${quantity} ${product.title} (Size: ${selectedSize})`);
                // In a real app, this would redirect to checkout
            });
            
            // Add to Cart button
            document.getElementById('addToCartBtn').addEventListener('click', () => {
                showToast(`Added ${quantity} ${product.title} (Size: ${selectedSize}) to cart`);
                // In a real app, this would update cart state
            });
            
            // Wishlist button
            document.getElementById('wishlistBtn').addEventListener('click', () => {
                isWishlisted = !isWishlisted;
                const wishlistBtn = document.getElementById('wishlistBtn');
                
                if (isWishlisted) {
                    wishlistBtn.innerHTML = '<i class="fas fa-heart" style="color: #ff5252;"></i>';
                    showToast('Added to wishlist');
                } else {
                    wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
                    showToast('Removed from wishlist');
                }
            });
            
            // Zoom button
            zoomBtn.addEventListener('click', () => {
                modalImage.src = product.images[currentImageIndex];
                imageModal.classList.add('active');
            });
            
            // Close modal
            closeModal.addEventListener('click', () => {
                imageModal.classList.remove('active');
            });
            
            // Close modal when clicking outside the image
            imageModal.addEventListener('click', (e) => {
                if (e.target === imageModal) {
                    imageModal.classList.remove('active');
                }
            });
            
            // Keyboard support
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && imageModal.classList.contains('active')) {
                    imageModal.classList.remove('active');
                }
                
                // Arrow keys for image navigation
                if (!imageModal.classList.contains('active')) {
                    if (e.key === 'ArrowRight') {
                        const nextIndex = (currentImageIndex + 1) % product.images.length;
                        changeMainImage(nextIndex);
                    } else if (e.key === 'ArrowLeft') {
                        const prevIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
                        changeMainImage(prevIndex);
                    }
                }
            });
        }
        
        // Initialize animations on scroll
        function initializeAnimations() {
            const fadeElements = document.querySelectorAll('.fade-in');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });
            
            fadeElements.forEach(element => {
                observer.observe(element);
            });
        }
        
        // Initialize the page when DOM is loaded
        document.addEventListener('DOMContentLoaded', initializePage);
        
        // Add some responsive behavior for window resize
        window.addEventListener('resize', () => {
            // Adjust image container height on resize
            const mainImageContainer = document.querySelector('.main-image-container');
            if (window.innerWidth < 768) {
                mainImageContainer.style.height = '350px';
            } else {
                mainImageContainer.style.height = '450px';
            }
        });