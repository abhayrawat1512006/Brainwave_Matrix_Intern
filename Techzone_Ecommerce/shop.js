// 🛒 Load Cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount();

// 🧠 Add to Cart + Fly animation
document.querySelectorAll('.explore-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent card click

    const card = btn.closest('.product-card-inner');
    const title = card.querySelector('h5').innerText;
    const price = card.querySelector('p:nth-of-type(1)').innerText;
    const img = card.querySelector('img');

    const product = { title, price, img: img.src };
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    flyToCart(img);
  });
});

// 🎯 Fly to Cart Animation
function flyToCart(img) {
  const cartIcon = document.querySelector('.cart-icon');
  const clone = img.cloneNode(true);
  const imgRect = img.getBoundingClientRect();
  const cartRect = cartIcon.getBoundingClientRect();

  clone.classList.add("cart-fly");
  clone.style.top = imgRect.top + "px";
  clone.style.left = imgRect.left + "px";
  clone.style.width = img.width + "px";
  clone.style.height = img.height + "px";
  clone.style.position = "fixed";
  clone.style.zIndex = 9999;
  clone.style.transition = "all 1s ease-in-out";
  document.body.appendChild(clone);

  // Trigger animation
  setTimeout(() => {
    clone.style.top = cartRect.top + "px";
    clone.style.left = cartRect.left + "px";
    clone.style.width = "20px";
    clone.style.height = "20px";
    clone.style.opacity = 0;
    clone.style.transform = "scale(0.3)";
  }, 10);

  // Remove after animation
  setTimeout(() => clone.remove(), 1000);
}

// 🔢 Update Cart Count on Navbar
function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.innerText = cart.length;
}

// 🔍 Search Filter
document.getElementById('searchInput')?.addEventListener('input', function () {
  const searchVal = this.value.toLowerCase();
  document.querySelectorAll('.product-card-inner').forEach(card => {
    const title = card.querySelector('h5')?.innerText.toLowerCase();
    card.closest('.col-md-4').style.display = title.includes(searchVal) ? "block" : "none";
  });
});

// 🔁 Category Filter
document.getElementById('categoryFilter')?.addEventListener('change', function () {
  const value = this.value.toLowerCase();
  document.querySelectorAll('.product-card-inner').forEach(card => {
    const title = card.querySelector('h5')?.innerText.toLowerCase();
    card.closest('.col-md-4').style.display = (value === "category" || title.includes(value)) ? "block" : "none";
  });
});

// 💰 Price Filter
document.getElementById('priceFilter')?.addEventListener('change', function () {
  const value = this.value;
  document.querySelectorAll('.product-card-inner').forEach(card => {
    const priceText = card.querySelector('p:nth-of-type(1)').innerText;
    const price = parseInt(priceText.replace(/[^\d]/g, ""));
    let show = false;

    if (value === "Price Range") show = true;
    else if (value === "Under ₹5000" && price < 5000) show = true;
    else if (value === "₹5K - ₹25K" && price >= 5000 && price <= 25000) show = true;
    else if (value === "₹25K+" && price > 25000) show = true;

    card.closest('.col-md-4').style.display = show ? "block" : "none";
  });
});

// 🔃 Sort Filter
document.getElementById("sortFilter")?.addEventListener("change", function () {
  const value = this.value;
  const products = Array.from(document.querySelectorAll('.product-card-inner'));
  const container = document.querySelector('.row.g-4');

  const sorted = products.sort((a, b) => {
    const p1 = parseInt(a.querySelector('p:nth-of-type(1)').innerText.replace(/[^\d]/g, ""));
    const p2 = parseInt(b.querySelector('p:nth-of-type(1)').innerText.replace(/[^\d]/g, ""));
    return value === "low" ? p1 - p2 : p2 - p1;
  });

  sorted.forEach(card => {
    container.appendChild(card.closest('.col-md-4'));
  });
});

// 🔗 View Product Page Redirect
document.querySelectorAll('.product-card-inner').forEach(card => {
  card.addEventListener('click', function (e) {
    if (e.target.classList.contains('explore-btn') || e.target.classList.contains('buy-now')) return;

    const title = card.querySelector('h5')?.innerText;
    const price = card.querySelector('p:nth-of-type(1)')?.innerText;
    const review = card.querySelector('p:nth-of-type(2)')?.innerText;
    const img = card.querySelector('img')?.src;

    const product = { title, price, review, img };
    localStorage.setItem("viewProduct", JSON.stringify(product));
    window.location.href = "product.html";
  });
});