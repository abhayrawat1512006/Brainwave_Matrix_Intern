// Optional: Load cart count from localStorage if needed
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartCountEl = document.getElementById("cart-count");
if (cartCountEl) cartCountEl.innerText = cart.length;