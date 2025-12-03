const navigation = [
    {

         links: [
            { name: "Home", href: "index.html" },
            { name: "Shop", href: "shop.html" },
            { name: "Plant Care", href: "plant-care.html" },
            { name: "Blogs", href: "blogs.html" }
        ],
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
                            <a href="${link.href}">${link.name}</a>
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


// =======================product================

 const productData = {
            title: "Barberton Daisy",
            price: 119.00,
            description: "The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground.",
            sizes: ["M", "L", "XL"],
            sku: "1995/51827966",
            categories: "Porter Plants",
            tags: "Home, Garden, Plants",
            images: [
                { thumbnail: "images/8.png", full: "images/8.png" },
                { thumbnail: "images/6.png", full: "images/6.png" },
                { thumbnail: "images/8.png", full: "images/8.png" },
                { thumbnail: "images/7.png", full: "images/7.png" }
            ]
        };

        
        const mainImage = document.getElementById('main-image');
        const thumbnails = document.querySelectorAll('.thumbnail');
        const productTitle = document.getElementById('product-title');
        const productPrice = document.getElementById('product-price');
        const productDescription = document.getElementById('product-description');
        const productSku = document.getElementById('product-sku');
        const productCategories = document.getElementById('product-categories');
        const productTags = document.getElementById('product-tags');
        const sizeOptions = document.querySelectorAll('.size-option');
        const decreaseBtn = document.getElementById('decrease-btn');
        const increaseBtn = document.getElementById('increase-btn');
        const resetBtn = document.getElementById('reset-btn');
        const quantityDisplay = document.getElementById('quantity-display');
        const buyNowBtn = document.getElementById('buy-now-btn');
        const addToCartBtn = document.getElementById('add-to-cart-btn');
        const notification = document.getElementById('notification');
        const notificationText = document.getElementById('notification-text');

       
        function initializeProductData() {
            productTitle.textContent = productData.title;
            productPrice.textContent = `$${productData.price.toFixed(2)}`;
            productDescription.textContent = productData.description;
            productSku.textContent = productData.sku;
            productCategories.textContent = productData.categories;
            productTags.textContent = productData.tags;
            
            
            if (productData.images.length > 0) {
                mainImage.src = productData.images[0].full;
            }
            
           
            thumbnails.forEach((thumbnail, index) => {
                if (productData.images[index]) {
                    thumbnail.src = productData.images[index].thumbnail;
                    thumbnail.dataset.full = productData.images[index].full;
                }
            });
        }

       
        let quantity = 1;
        
        function updateQuantityDisplay() {
    quantityDisplay.textContent = quantity;
    quantityDisplay.classList.add('updated');
    setTimeout(() => {
        quantityDisplay.classList.remove('updated');
    }, 300);
}
        
        decreaseBtn.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                updateQuantityDisplay();
            }
        });
        
        increaseBtn.addEventListener('click', () => {
            quantity++;
            updateQuantityDisplay();
        });
        
        resetBtn.addEventListener('click', () => {
            quantity = 1;
            updateQuantityDisplay();
            showNotification("Quantity reset to 1");
        });

        
       thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        this.classList.add('active');
        
        mainImage.classList.remove('fade-in');
        void mainImage.offsetWidth; 
        mainImage.classList.add('fade-in');
        
        mainImage.src = this.dataset.full; 
        
        mainImage.classList.add('zoom');
        setTimeout(() => {
            mainImage.classList.remove('zoom');
        }, 500);
    });
});


        sizeOptions.forEach(option => {
            option.addEventListener('click', function() {
                
                sizeOptions.forEach(opt => opt.classList.remove('selected'));
                
                
                this.classList.add('selected');
                
                
                const selectedSize = this.dataset.size;
                showNotification(`Size ${selectedSize} selected`);
            });
        });

       
        buyNowBtn.addEventListener('click', () => {
            const selectedSize = document.querySelector('.size-option.selected').dataset.size;
            showNotification(`Purchased ${quantity} ${productData.title} (Size: ${selectedSize}) for $${(quantity * productData.price).toFixed(2)}`);
            
           
            quantity = 1;
            updateQuantityDisplay();
        });
        
        addToCartBtn.addEventListener('click', () => {
            const selectedSize = document.querySelector('.size-option.selected').dataset.size;
            showNotification(`Added ${quantity} ${productData.title} (Size: ${selectedSize}) to cart`);
        });

        
        function showNotification(message) {
            notificationText.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        
        document.addEventListener('DOMContentLoaded', initializeProductData);






