// Animating the main heading element
gsap.from("#main-heading", {
  opacity: 0,             // Starting opacity
  fontSize: "2rem",       // Starting font size
  duration: 1,            // Animation duration in seconds
  ease: "back.out(1.7)"   // Easing function
});

// Animating the "New" label element
gsap.from("#new-label", {
  opacity: 0,             // Starting opacity
  x: -50,                 // Starting position along the X-axis
  duration: 1,            // Animation duration in seconds
  delay: 0.5              // Delay before the animation starts in seconds
});

// Animating the "Featured" label element
gsap.from("#featured-label", {
  opacity: 0,             // Starting opacity
  x: 50,                  // Starting position along the X-axis
  duration: 1,            // Animation duration in seconds
  delay: 0.5              // Delay before the animation starts in seconds
});

// Animating all elements with class "shoe"
gsap.from(".shoe", {
  opacity: 0,             // Starting opacity
  y: 50,                  // Starting position along the Y-axis
  duration: 1,            // Animation duration in seconds
  stagger: 0.5            // Stagger animation for each element in seconds
});

// Selecting all elements with class "add-to-cart" and adding event listeners
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartLink = document.querySelector('.cart');

let cartItemsCount = 0; // Initializing cart items count

// Adding click event listeners to each "add to cart" button
addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
      cartItemsCount++;   // Incrementing cart items count
      updateCartCount();  // Updating cart count displayed in the cart link
  });
});

// Function to update the cart count displayed in the cart link
function updateCartCount() {
  cartLink.textContent = `Cart (${cartItemsCount})`; // Updating cart link text content
}

