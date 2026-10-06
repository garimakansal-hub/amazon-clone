/**
 * Amazon Clone - Main Application Script
 * Features:
 * - Product catalog rendering & filtering
 * - Dynamic Shopping Cart with LocalStorage persistence
 * - Real-time Search & Department dropdown
 * - Responsive Carousel slider & Horizontal deal scroller
 * - Modal Quick-view & Checkout confirmation
 * - Toast Notification engine
 */

// ================= PRODUCT DATA =================
const products = [
  {
    id: 1,
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    category: "electronics",
    price: 348.00,
    originalPrice: 399.99,
    rating: 4.8,
    reviewsCount: 14280,
    isPrime: true,
    isDeal: true,
    dealTag: "Limited Deal",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "Industry-leading noise cancellation with two processors and 8 microphones. Ultra-comfortable lightweight design with soft fit leather.",
    brand: "Sony",
    inStock: true
  },
  {
    id: 2,
    title: "Apple MacBook Air 15-inch M3 Chip (16GB RAM, 512GB SSD)",
    category: "electronics",
    price: 1299.00,
    originalPrice: 1499.00,
    rating: 4.9,
    reviewsCount: 8920,
    isPrime: true,
    isDeal: true,
    dealTag: "Top Pick",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    description: "Strikingly thin design with fast M3 chip performance. Up to 18 hours of battery life and Liquid Retina display with 500 nits brightness.",
    brand: "Apple",
    inStock: true
  },
  {
    id: 3,
    title: "Garmin Venu 3 GPS Smartwatch with AMOLED Display",
    category: "electronics",
    price: 399.99,
    originalPrice: 449.99,
    rating: 4.6,
    reviewsCount: 3120,
    isPrime: true,
    isDeal: false,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description: "Know the real you with advanced health and fitness tracking, sleep coaching, nap detection, and on-wrist calling.",
    brand: "Garmin",
    inStock: true
  },
  {
    id: 4,
    title: "Nike Air Max 270 Men's Running Shoes (Black/White)",
    category: "fashion",
    price: 145.00,
    originalPrice: 160.00,
    rating: 4.7,
    reviewsCount: 22100,
    isPrime: true,
    isDeal: true,
    dealTag: "Best Seller",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    description: "Boasts Nike's biggest heel Air unit yet for a super-soft ride that feels as impossible as it looks. Breathable knit upper.",
    brand: "Nike",
    inStock: true
  },
  {
    id: 5,
    title: "Fossil Men's Grant Stainless Steel Chronograph Watch",
    category: "fashion",
    price: 99.00,
    originalPrice: 160.00,
    rating: 4.5,
    reviewsCount: 9540,
    isPrime: true,
    isDeal: true,
    dealTag: "38% Off",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
    description: "Inspired by the vintage clock designs, Roman numerals give this classic piece an artistic balance and enduring appeal.",
    brand: "Fossil",
    inStock: true
  },
  {
    id: 6,
    title: "Breville Barista Touch Espresso & Coffee Machine",
    category: "home",
    price: 899.95,
    originalPrice: 999.95,
    rating: 4.7,
    reviewsCount: 4210,
    isPrime: true,
    isDeal: false,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=600&q=80",
    description: "Automated touchscreen technology allows you to simply swipe and select espresso, latte, flat white, or cappuccino with microfoam milk.",
    brand: "Breville",
    inStock: true
  },
  {
    id: 7,
    title: "Ray-Ban Classic Polarized Aviator Sunglasses",
    category: "fashion",
    price: 185.00,
    originalPrice: 220.00,
    rating: 4.6,
    reviewsCount: 16800,
    isPrime: true,
    isDeal: false,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80",
    description: "Original pilot design with crystal green lenses and 100% UV protection. Durable metal frame with comfortable nose pads.",
    brand: "Ray-Ban",
    inStock: true
  },
  {
    id: 8,
    title: "Ninja Air Fryer Pro 4-in-1 with 5 QT Capacity",
    category: "home",
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviewsCount: 38400,
    isPrime: true,
    isDeal: true,
    dealTag: "Prime Deal",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    description: "Air fry with up to 75% less fat than traditional frying methods. Features wide temperature range from 105°F to 400°F.",
    brand: "Ninja",
    inStock: true
  },
  {
    id: 9,
    title: "Dyson Supersonic Hair Dryer with Intelligent Heat Control",
    category: "beauty",
    price: 379.00,
    originalPrice: 429.00,
    rating: 4.7,
    reviewsCount: 11200,
    isPrime: true,
    isDeal: true,
    dealTag: "Save $50",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    description: "Engineered for different hair types, fast drying with no extreme heat to protect hair shine and prevent heat damage.",
    brand: "Dyson",
    inStock: true
  },
  {
    id: 10,
    title: "Dell UltraSharp 27-inch 4K UHD USB-C Hub Monitor",
    category: "electronics",
    price: 529.99,
    originalPrice: 619.99,
    rating: 4.6,
    reviewsCount: 5410,
    isPrime: true,
    isDeal: false,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
    description: "Exceptional color and clarity with IPS Black technology, 90W Power Delivery, and integrated RJ45 Ethernet port.",
    brand: "Dell",
    inStock: true
  },
  {
    id: 11,
    title: "Minimalist Modern Dimmable Floor Lamp with Smart Bulb",
    category: "home",
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.4,
    reviewsCount: 2900,
    isPrime: true,
    isDeal: true,
    dealTag: "37% Off",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    description: "Sleek corner-standing architectural LED floor lamp with foot switch and warm ambient lighting suitable for living room or bedroom.",
    brand: "BrightTech",
    inStock: true
  },
  {
    id: 12,
    title: "Luxury Organic Facial Serum & Skin Glow Repair Kit",
    category: "beauty",
    price: 36.50,
    originalPrice: 48.00,
    rating: 4.6,
    reviewsCount: 7120,
    isPrime: true,
    isDeal: false,
    image: "https://images.unsplash.com/photo-1608248597359-59754f944365?auto=format&fit=crop&w=600&q=80",
    description: "Enriched with Vitamin C, Hyaluronic Acid, and Botanical Extracts to revitalize, hydrate, and brighten all skin complexions.",
    brand: "PureGlow",
    inStock: true
  }
];

// ================= APP STATE =================
let cart = JSON.parse(localStorage.getItem('amazon_clone_cart')) || [];
let activeCategory = 'all';
let searchQuery = '';
let currentSort = 'featured';

// ================= DOM ELEMENT REFERENCES =================
const productGrid = document.getElementById('productGrid');
const horizontalDealTrack = document.getElementById('horizontalDealTrack');
const resultsCount = document.getElementById('resultsCount');
const catalogHeaderTitle = document.getElementById('catalogHeaderTitle');
const sortBySelect = document.getElementById('sortBySelect');

// Cart Elements
const cartToggleBtn = document.getElementById('cartToggleBtn');
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartCloseBtn = document.getElementById('cartCloseBtn');
const cartCount = document.getElementById('cartCount');
const cartDrawerCount = document.getElementById('cartDrawerCount');
const cartDrawerItems = document.getElementById('cartDrawerItems');
const cartSubtotalAmount = document.getElementById('cartSubtotalAmount');
const freeShippingText = document.getElementById('freeShippingText');
const shippingProgress = document.getElementById('shippingProgress');
const clearCartBtn = document.getElementById('clearCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');
const startShoppingBtn = document.getElementById('startShoppingBtn');

// Navigation & Side Drawer
const menuToggleBtn = document.getElementById('menuToggleBtn');
const sideDrawer = document.getElementById('sideDrawer');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const drawerCloseBtn = document.getElementById('drawerCloseBtn');

// Search Elements
const searchInput = document.getElementById('searchInput');
const searchCategory = document.getElementById('searchCategory');
const searchBtn = document.getElementById('searchBtn');

// Quick View Modal
const quickViewOverlay = document.getElementById('quickViewOverlay');
const quickViewContent = document.getElementById('quickViewContent');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalBody = document.getElementById('modalBody');

// Order Success Modal
const orderSuccessOverlay = document.getElementById('orderSuccessOverlay');
const placedOrderId = document.getElementById('placedOrderId');
const placedOrderTotal = document.getElementById('placedOrderTotal');
const continueShoppingBtn = document.getElementById('continueShoppingBtn');

// Toast Container
const toastContainer = document.getElementById('toastContainer');

// Back to Top
const backToTopBtn = document.getElementById('backToTopBtn');

// Carousel Elements
const carouselSlides = document.querySelectorAll('.carousel-slide');
const prevSlideBtn = document.getElementById('prevSlideBtn');
const nextSlideBtn = document.getElementById('nextSlideBtn');
const dots = document.querySelectorAll('.carousel-dots .dot');
let currentSlideIndex = 0;
let carouselTimer = null;

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderHorizontalDeals();
  updateCartUI();
  initCarousel();
  initCountdownTimer();
  attachEventListeners();
});

// ================= PRODUCT RENDERING =================
function getFilteredAndSortedProducts() {
  let list = [...products];

  // Category filter
  if (activeCategory === 'deals') {
    list = list.filter(p => p.isDeal);
  } else if (activeCategory !== 'all') {
    list = list.filter(p => p.category === activeCategory);
  }

  // Search filter
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  // Sorting
  switch (currentSort) {
    case 'price-low':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      list.sort((a, b) => b.rating - a.rating);
      break;
    case 'discount':
      list.sort((a, b) => {
        const discA = ((a.originalPrice - a.price) / a.originalPrice);
        const discB = ((b.originalPrice - b.price) / b.originalPrice);
        return discB - discA;
      });
      break;
    default:
      // featured
      break;
  }

  return list;
}

function renderProducts() {
  const filtered = getFilteredAndSortedProducts();
  resultsCount.textContent = `Showing ${filtered.length} item${filtered.length === 1 ? '' : 's'}`;

  if (filtered.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #fff; border-radius: 4px;">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 48px; color: #bbb; margin-bottom: 12px;"></i>
        <h3 style="font-size: 20px; margin-bottom: 8px;">No matching products found</h3>
        <p style="color: #666; font-size: 14px; margin-bottom: 20px;">Try checking your spelling or clearing search filters.</p>
        <button class="shop-now-btn" onclick="resetFilters()">View All Products</button>
      </div>
    `;
    return;
  }

  productGrid.innerHTML = filtered.map(product => {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const starIcons = getStarHTML(product.rating);

    return `
      <article class="product-card" data-id="${product.id}">
        <div>
          <div class="product-img-wrapper" onclick="openQuickView(${product.id})">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <span class="quick-view-overlay-btn"><i class="fa-solid fa-eye"></i> Quick View</span>
          </div>

          <div class="product-category-tag">${product.brand} &bull; ${product.category}</div>
          <h3 class="product-title" onclick="openQuickView(${product.id})" title="${product.title}">${product.title}</h3>

          <div class="rating-row">
            <div class="stars">${starIcons}</div>
            <span class="rating-count">(${product.reviewsCount.toLocaleString()})</span>
          </div>

          <div class="pricing-row">
            <span class="current-price"><span class="price-currency">$</span>${product.price.toFixed(2)}</span>
            <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
            <span class="save-percent">${discount}% off</span>
          </div>

          ${product.isPrime ? `
            <div class="prime-badge">
              <i class="fa-solid fa-check"></i> <span>prime</span>
            </div>
          ` : ''}

          <div class="delivery-info">
            Get it by <strong>Tomorrow, 10 PM</strong> with Free Prime Delivery
          </div>
        </div>

        <div class="product-actions">
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
            <i class="fa-solid fa-cart-plus"></i> Add to Cart
          </button>
          <button class="buy-now-btn" onclick="buyNow(${product.id})">
            Buy Now
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function renderHorizontalDeals() {
  const dealProducts = products.filter(p => p.isDeal);
  horizontalDealTrack.innerHTML = dealProducts.map(item => {
    const discount = Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100);
    return `
      <div class="deal-mini-card" onclick="openQuickView(${item.id})">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="deal-badge-row">
          <span class="deal-discount-badge">${discount}% off</span>
          <span class="deal-tag-label">${item.dealTag || 'Limited Deal'}</span>
        </div>
        <div class="deal-price">$${item.price.toFixed(2)}</div>
        <p class="deal-mini-title">${item.title}</p>
      </div>
    `;
  }).join('');
}

function getStarHTML(rating) {
  let stars = '';
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  for (let i = 0; i < full; i++) stars += '<i class="fa-solid fa-star"></i>';
  if (half) stars += '<i class="fa-solid fa-star-half-stroke"></i>';
  for (let i = 0; i < empty; i++) stars += '<i class="fa-regular fa-star"></i>';
  return stars;
}

// ================= CART LOGIC =================
function addToCart(productId, qty = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = cart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += qty;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: qty
    });
  }

  saveCart();
  updateCartUI();
  showToast(`Added "${product.title.substring(0, 32)}..." to Cart!`, 'fa-cart-plus');
}

function updateCartQuantity(productId, delta) {
  const itemIndex = cart.findIndex(item => item.id === productId);
  if (itemIndex > -1) {
    cart[itemIndex].quantity += delta;
    if (cart[itemIndex].quantity <= 0) {
      cart.splice(itemIndex, 1);
      showToast('Item removed from cart', 'fa-trash');
    }
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  showToast('Item removed from cart', 'fa-trash');
}

function clearCart() {
  if (cart.length === 0) return;
  cart = [];
  saveCart();
  updateCartUI();
  showToast('Cart cleared successfully', 'fa-rotate-left');
}

function buyNow(productId) {
  addToCart(productId, 1);
  openCartDrawer();
}

function saveCart() {
  localStorage.setItem('amazon_clone_cart', JSON.stringify(cart));
}

function updateCartUI() {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Update badges
  cartCount.textContent = totalCount;
  cartDrawerCount.textContent = totalCount;
  cartSubtotalAmount.textContent = `$${subtotal.toFixed(2)}`;

  // Free delivery calculation ($35 threshold)
  const threshold = 35.00;
  if (subtotal >= threshold || totalCount === 0) {
    if (totalCount === 0) {
      freeShippingText.innerHTML = `<i class="fa-solid fa-truck-fast"></i> Add <strong>$${threshold.toFixed(2)}</strong> more to qualify for <strong>FREE Delivery</strong>`;
      shippingProgress.style.width = '0%';
    } else {
      freeShippingText.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #007600;"></i> <strong>Congratulations!</strong> Your order qualifies for <strong>FREE Delivery</strong>!`;
      shippingProgress.style.width = '100%';
    }
  } else {
    const diff = (threshold - subtotal).toFixed(2);
    const percent = Math.min((subtotal / threshold) * 100, 100);
    freeShippingText.innerHTML = `<i class="fa-solid fa-truck-fast"></i> Add <strong>$${diff}</strong> more to qualify for <strong>FREE Delivery</strong>`;
    shippingProgress.style.width = `${percent}%`;
  }

  // Populate cart items list
  if (cart.length === 0) {
    cartDrawerItems.innerHTML = `
      <div class="empty-cart-view">
        <i class="fa-solid fa-basket-shopping empty-icon"></i>
        <p>Your Amazon cart is empty</p>
        <button class="shop-now-btn" id="startShoppingInnerBtn">Start Shopping</button>
      </div>
    `;
    const innerBtn = document.getElementById('startShoppingInnerBtn');
    if (innerBtn) innerBtn.addEventListener('click', closeCartDrawer);
  } else {
    cartDrawerItems.innerHTML = cart.map(item => `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.title}</h4>
          <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
          <div class="cart-item-controls">
            <div class="qty-stepper">
              <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)" aria-label="Decrease quantity">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)" aria-label="Increase quantity">+</button>
            </div>
            <button class="item-delete-btn" onclick="removeFromCart(${item.id})">Delete</button>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// ================= MODAL & DRAWER TOGGLES =================
function openCartDrawer() {
  cartDrawer.classList.add('active');
  cartOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  cartDrawer.classList.remove('active');
  cartOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function openSideDrawer() {
  sideDrawer.classList.add('active');
  sidebarOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSideDrawer() {
  sideDrawer.classList.remove('active');
  sidebarOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

function openQuickView(productId) {
  const p = products.find(item => item.id === productId);
  if (!p) return;

  const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
  const stars = getStarHTML(p.rating);

  modalBody.innerHTML = `
    <div class="modal-img-col">
      <img src="${p.image}" alt="${p.title}">
    </div>
    <div class="modal-info-col">
      <span class="badge-tag">${p.category.toUpperCase()}</span>
      <h2 class="modal-title">${p.title}</h2>
      <div class="rating-row">
        <div class="stars">${stars}</div>
        <span class="rating-count">${p.rating} out of 5 (${p.reviewsCount.toLocaleString()} ratings)</span>
      </div>
      <div class="pricing-row" style="margin-top: 14px;">
        <span class="current-price" style="font-size: 28px;">$${p.price.toFixed(2)}</span>
        <span class="original-price" style="font-size: 16px;">$${p.originalPrice.toFixed(2)}</span>
        <span class="save-percent" style="font-size: 14px;">Save ${discount}%</span>
      </div>
      <p class="modal-desc">${p.description}</p>
      <ul class="modal-specs-list">
        <li><strong>Brand:</strong> ${p.brand}</li>
        <li><strong>Category:</strong> ${p.category}</li>
        <li><strong>Stock:</strong> <span style="color: #007600; font-weight: 600;">In Stock (Ready to Ship)</span></li>
        <li><strong>Warranty:</strong> 1 Year Manufacturer Warranty Included</li>
      </ul>
      <div class="product-actions" style="margin-top: 20px;">
        <button class="add-to-cart-btn" onclick="addToCart(${p.id}); closeQuickView();">
          <i class="fa-solid fa-cart-plus"></i> Add to Cart
        </button>
        <button class="buy-now-btn" onclick="buyNow(${p.id}); closeQuickView();">
          Buy Now
        </button>
      </div>
    </div>
  `;

  quickViewOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  quickViewOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Checkout simulation
function handleCheckout() {
  if (cart.length === 0) {
    showToast('Your cart is empty! Add items first.', 'fa-triangle-exclamation');
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const randomOrderNum = Math.floor(100000 + Math.random() * 900000);

  placedOrderId.textContent = `#AMZ-${randomOrderNum}`;
  placedOrderTotal.textContent = `$${subtotal.toFixed(2)}`;

  // Clear cart
  cart = [];
  saveCart();
  updateCartUI();
  closeCartDrawer();

  // Show success modal
  orderSuccessOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ================= HERO CAROUSEL =================
function initCarousel() {
  showSlide(currentSlideIndex);

  function next() {
    currentSlideIndex = (currentSlideIndex + 1) % carouselSlides.length;
    showSlide(currentSlideIndex);
  }

  function prev() {
    currentSlideIndex = (currentSlideIndex - 1 + carouselSlides.length) % carouselSlides.length;
    showSlide(currentSlideIndex);
  }

  if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => { next(); resetAutoSlide(); });
  if (prevSlideBtn) prevSlideBtn.addEventListener('click', () => { prev(); resetAutoSlide(); });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.dataset.index);
      currentSlideIndex = idx;
      showSlide(currentSlideIndex);
      resetAutoSlide();
    });
  });

  function startAutoSlide() {
    carouselTimer = setInterval(next, 5000);
  }

  function resetAutoSlide() {
    clearInterval(carouselTimer);
    startAutoSlide();
  }

  startAutoSlide();
}

function showSlide(index) {
  carouselSlides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

// ================= TOAST NOTIFICATION ENGINE =================
function showToast(message, iconClass = 'fa-check') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid ${iconClass}"></i>
    <span>${message}</span>
  `;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

// ================= COUNTDOWN TIMER FOR DEALS =================
function initCountdownTimer() {
  const timerElem = document.getElementById('dealTimer');
  if (!timerElem) return;

  let totalSeconds = 8 * 3600 + 42 * 60 + 19;

  setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
      const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
      const secs = String(totalSeconds % 60).padStart(2, '0');
      timerElem.textContent = `${hours}:${mins}:${secs}`;
    }
  }, 1000);
}

// Reset filters helper
function resetFilters() {
  activeCategory = 'all';
  searchQuery = '';
  searchInput.value = '';
  searchCategory.value = 'all';
  sortBySelect.value = 'featured';
  currentSort = 'featured';
  catalogHeaderTitle.textContent = 'All Products';

  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active-filter', el.dataset.category === 'all');
  });

  renderProducts();
}

// ================= EVENT LISTENERS =================
function attachEventListeners() {
  // Cart Drawer
  cartToggleBtn.addEventListener('click', openCartDrawer);
  cartCloseBtn.addEventListener('click', closeCartDrawer);
  cartOverlay.addEventListener('click', closeCartDrawer);
  clearCartBtn.addEventListener('click', clearCart);
  checkoutBtn.addEventListener('click', handleCheckout);
  if (startShoppingBtn) startShoppingBtn.addEventListener('click', closeCartDrawer);

  // Side Drawer
  menuToggleBtn.addEventListener('click', openSideDrawer);
  drawerCloseBtn.addEventListener('click', closeSideDrawer);
  sidebarOverlay.addEventListener('click', closeSideDrawer);

  // Side drawer navigation links
  document.querySelectorAll('.drawer-section ul li[data-filter]').forEach(item => {
    item.addEventListener('click', () => {
      const cat = item.dataset.filter;
      setCategory(cat);
      closeSideDrawer();
      document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Sub-navbar categories
  document.querySelectorAll('.nav-links .nav-item[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.category;
      document.querySelectorAll('.nav-links .nav-item').forEach(b => b.classList.remove('active-filter'));
      btn.classList.add('active-filter');
      setCategory(cat);
    });
  });

  // Feature cards & quad items category clicks
  document.querySelectorAll('[data-filter], [data-category]').forEach(el => {
    el.addEventListener('click', (e) => {
      const targetCat = el.dataset.category || el.dataset.filter;
      if (targetCat && !el.classList.contains('nav-item') && !el.closest('.drawer-section')) {
        setCategory(targetCat);
        document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Search execution
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') performSearch();
  });

  searchCategory.addEventListener('change', () => {
    activeCategory = searchCategory.value;
    updateCategoryHeader(activeCategory);
    renderProducts();
  });

  // Sort dropdown
  sortBySelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
  });

  // Horizontal deal scroll arrows
  const scrollLeftBtn = document.getElementById('scrollLeftBtn');
  const scrollRightBtn = document.getElementById('scrollRightBtn');
  if (scrollLeftBtn && scrollRightBtn && horizontalDealTrack) {
    scrollLeftBtn.addEventListener('click', () => {
      horizontalDealTrack.scrollBy({ left: -300, behavior: 'smooth' });
    });
    scrollRightBtn.addEventListener('click', () => {
      horizontalDealTrack.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }

  // Quick View Modal
  modalCloseBtn.addEventListener('click', closeQuickView);
  quickViewOverlay.addEventListener('click', (e) => {
    if (e.target === quickViewOverlay) closeQuickView();
  });

  // Order success modal close
  continueShoppingBtn.addEventListener('click', () => {
    orderSuccessOverlay.classList.remove('active');
    document.body.style.overflow = '';
  });

  // Back to top
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Mock handlers for accounts/location/prime/customer service
  const locationBtn = document.getElementById('locationBtn');
  if (locationBtn) {
    locationBtn.addEventListener('click', () => {
      const country = prompt('Enter delivery country or zip code:', 'India');
      if (country) {
        document.querySelector('.nav-location-text .nav-line-2').textContent = country;
        showToast(`Delivery location set to: ${country}`, 'fa-location-dot');
      }
    });
  }

  const accountBtn = document.getElementById('accountBtn');
  if (accountBtn) {
    accountBtn.addEventListener('click', () => {
      const name = prompt('Sign In to Amazon Clone:\nEnter your name:', 'Guest User');
      if (name) {
        document.querySelector('.nav-account .nav-line-1').textContent = `Hello, ${name}`;
        showToast(`Welcome back, ${name}!`, 'fa-circle-user');
      }
    });
  }

  const primeBtn = document.getElementById('primeBtn');
  if (primeBtn) {
    primeBtn.addEventListener('click', () => {
      showToast('Prime Members enjoy Free Same-Day & 1-Day Delivery!', 'fa-bolt');
    });
  }

  const customerServiceBtn = document.getElementById('customerServiceBtn');
  if (customerServiceBtn) {
    customerServiceBtn.addEventListener('click', () => {
      showToast('Amazon Clone 24/7 Help Desk is active.', 'fa-headset');
    });
  }
}

function setCategory(cat) {
  activeCategory = cat;
  searchCategory.value = (cat === 'deals' ? 'all' : cat);
  updateCategoryHeader(cat);
  renderProducts();
}

function updateCategoryHeader(cat) {
  const titles = {
    all: 'All Products',
    deals: "Today's Lightning Deals",
    electronics: 'Electronics, Audio & Computers',
    fashion: 'Trending Fashion & Apparel',
    home: 'Home Living & Kitchen Essentials',
    beauty: 'Beauty & Personal Care'
  };
  catalogHeaderTitle.textContent = titles[cat] || 'Products';
}

function performSearch() {
  searchQuery = searchInput.value.trim();
  renderProducts();
  document.getElementById('productsSection').scrollIntoView({ behavior: 'smooth' });
  if (searchQuery) {
    showToast(`Searching for "${searchQuery}"...`, 'fa-magnifying-glass');
  }
}
