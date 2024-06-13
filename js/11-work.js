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

