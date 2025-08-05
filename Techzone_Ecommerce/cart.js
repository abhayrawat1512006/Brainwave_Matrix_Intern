const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cartItems");
const emptyMsg = document.getElementById("emptyCart");

if (cartItems.length > 0) {
  emptyMsg.style.display = "none";
  cartItems.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "col-md-4";
    card.innerHTML = `
      <div class="card-3d" onclick="openBuyModal(${index})">
        <img src="${item.img}" class="img-fluid mb-3 rounded">
        <h5>${item.title}</h5>
        <p class="fw-bold">${item.price}</p>
      </div>
    `;
    container.appendChild(card);
  });
} else {
  emptyMsg.style.display = "block";
}

function openBuyModal(index) {
  const product = cartItems[index];
  document.getElementById("buyTitle").innerText = product.title;
  document.getElementById("buyImage").src = product.img;
  document.getElementById("buyQty").value = 1;
  document.getElementById("buyPayment").selectedIndex = 0;

  const modal = new bootstrap.Modal(document.getElementById("buyModal"));
  modal.show();
}

function completePurchase() {
  const qty = document.getElementById("buyQty").value;
  const payment = document.getElementById("buyPayment").value;
  const title = document.getElementById("buyTitle").innerText;

  alert(`✅ Order Placed for ${qty} × ${title}\nPayment Method: ${payment}`);
  const modal = bootstrap.Modal.getInstance(document.getElementById("buyModal"));
  modal.hide();
}