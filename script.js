/* ============================================================
    ACCESSIBLE LIGHTBOX / MODAL
============================================================ */

// Open Modal
function openModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
}

// Close Modal
function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

let lightboxIndex = 1;
showLightboxSlides(lightboxIndex);

// Next/previous (LIGHTBOX ONLY)
function plusLightboxSlides(n) {
  showLightboxSlides(lightboxIndex += n);
}

// Thumbnail controls (LIGHTBOX)
function currentLightboxSlide(n) {
  showLightboxSlides(lightboxIndex = n);
}

function showLightboxSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");

  if (n > slides.length) lightboxIndex = 1;
  if (n < 1) lightboxIndex = slides.length;

  for (let slide of slides) slide.style.display = "none";
  for (let dot of dots) dot.classList.remove("active");

  slides[lightboxIndex - 1].style.display = "block";
  dots[lightboxIndex - 1].classList.add("active");
}


/* ============================================================
    MAIN PRODUCT IMAGE GALLERY
============================================================ */

let slideIndex = 1;
showMainSlides(slideIndex);

function currentSlide(n) {
  showMainSlides(slideIndex = n);
}
function plusSlides(n) {
  showMainSlides(slideIndex += n);
}
function showMainSlides(n) {
  let slides = document.getElementsByClassName("mySlide");
  let dots = document.getElementsByClassName("hover-shadow");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let slide of slides) slide.style.display = "none";
  for (let dot of dots) dot.classList.remove("active");

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}


/* ============================================================
    CART DROPDOWN + ACCESSIBILITY
============================================================ */

const cartIcon = document.getElementById("cartIcon");
const cartDropdown = document.getElementById("cartDropdown");
const cartCount = document.getElementById("cartCount");
const cartContent = document.getElementById("cartContent");

// Toggle cart
function toggleCart() {
  const isOpen = cartDropdown.classList.toggle("show");
  cartIcon.setAttribute("aria-expanded", isOpen);
  cartDropdown.setAttribute("aria-hidden", !isOpen);
}

// Click to toggle
cartIcon.addEventListener("click", toggleCart);

// Keyboard support
cartIcon.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    toggleCart();
  }
});


/* ============================================================
    QUANTITY CONTROL
============================================================ */

const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const quantityBox = document.querySelector(".quantity");
let quantity = 0;

plus.addEventListener("click", () => {
  quantity++;
  quantityBox.textContent = quantity;
});

minus.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    quantityBox.textContent = quantity;
  }
});


/* ============================================================
    ADD TO CART
============================================================ */

const addBtn = document.getElementById("addToCart");

addBtn.addEventListener("click", () => {
  if (quantity === 0) return; // prevent adding zero items

  cartCount.textContent = quantity;
  cartCount.style.display = "flex";

  const price = 125.0;
  const total = (price * quantity).toFixed(2);

  cartContent.innerHTML = `
    <div class="cart-item">
      <img src="images/image-product-1-thumbnail.jpg" class="thumb" alt="Sneaker thumbnail">
      <div class="info">
        <p>Fall Limited Edition Sneakers</p>
        <p>$125.00 × ${quantity} <strong>$${total}</strong></p>
      </div>

      <button class="delete-btn" id="deleteItem" aria-label="Remove item" style="background:none; border:none; padding:0; margin:0;">
        <img src="images/icon-delete.svg" class="del" alt="delete">
      <div class="info">
      </button>
    </div>

    <button class="checkout-btn" aria-label="Proceed to checkout">Checkout</button>
  `;

  // DELETE ITEM
  document.getElementById("deleteItem").addEventListener("click", () => {
    cartContent.textContent = "Your cart is empty.";
    cartCount.style.display = "none";
  });
});


/* ============================================================
    ESC KEY CLOSE HANDLER
============================================================ */

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    // Close cart
    if (cartDropdown.classList.contains("show")) {
      cartDropdown.classList.remove("show");
      cartIcon.setAttribute("aria-expanded", "false");
      cartDropdown.setAttribute("aria-hidden", "true");
      cartIcon.style.background = "none";
      cartIcon.style.border = "none";
      cartIcon.style.padding = "0";
      cartIcon.style.margin = "0";
    }

    // Close lightbox
    if (document.getElementById("myModal").style.display === "block") {
      closeModal();
    }
  }
});

(function(){
  // Toggle mobile menu open/close
  const menuBtn = document.querySelector('.menu-btn');

menuBtn.addEventListener('keydown', function(e){
  if(e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    menuBtn.click();
  }
});
  const nav = document.querySelector('.nav');
  if(!menuBtn || !nav) return;

  menuBtn.addEventListener('click', function(){
    const linksPanel = nav.querySelector('.links');
    const isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when clicking outside the panel (optional)
  document.addEventListener('click', function(e){
    if(!nav.classList.contains('open')) return;
    const target = e.target;
    // if click is inside nav or button, ignore
    if(nav.contains(target) || menuBtn.contains(target)) return;
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && nav.classList.contains('open')){
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      menuBtn.focus();
    }
  });

  // Panel close button inside links
  const panelClose = nav.querySelector('.panel-close');
  if(panelClose){
    panelClose.addEventListener('click', function(e){
      e.stopPropagation();
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      menuBtn.focus();
    });
  }

  // Close nav when any link inside the panel is clicked (allow navigation)
  const navLinks = nav.querySelectorAll('.links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function(){
      // close the panel but don't prevent default navigation
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
})();

