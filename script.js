function addToCart(name, price) {

  let cartString = localStorage.getItem("cart");
  let cart = [];

  if (cartString) {
    let items = cartString.split("|");
    for (let i = 0; i < items.length; i++) {
      let parts = items[i].split(",");
      cart.push({ name: parts[0], price: Number(parts[1]) });
    }
  } else {
    cart = [];
  }
  cart.push({ name, price });

  let newString = "";
  for (let i = 0; i < cart.length; i++) {
    newString += cart[i].name + "," + cart[i].price;
    if (i < cart.length - 1) newString += "|";
  }
  localStorage.setItem("cart", newString);

  alert(name + " added to your cart!");
}

function loadCart() {
  const container = document.getElementById('cartItems');
  if (!container) return;

  let cartString = localStorage.getItem("cart");
  let cart = [];

  if (cartString && cartString.length > 0) {
    let items = cartString.split("|");
    for (let i = 0; i < items.length; i++) {
      let parts = items[i].split(",");
      cart.push({ name: parts[0], price: Number(parts[1]) });
    }
  }

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById('subtotal').textContent = "";
    document.getElementById('vat').textContent = "";
    document.getElementById('total').textContent = "";
    return;
  }

  // عرض العناصر
  container.innerHTML = cart.map((item, index) =>
    `<div class="cart-item">
      <p><strong>${item.name}</strong> – ${item.price} SAR 
      <button class="remove" onclick="removeItem(${index})">❌</button></p>
    </div>`
  ).join('');

  let subtotal = 0;
  for (let i = 0; i < cart.length; i++) {
    subtotal += cart[i].price;
  }

  let vat = subtotal * 0.15;
  let total = subtotal + vat;

  document.getElementById('subtotal').textContent = "Subtotal: " + subtotal.toFixed(2) + " SAR";
  document.getElementById('vat').textContent = "VAT (15%): " + vat.toFixed(2) + " SAR";
  document.getElementById('total').textContent = "Total: " + total.toFixed(2) + " SAR";
}

function removeItem(index) {
  let cartString = localStorage.getItem("cart");
  let cart = [];

  if (cartString) {
    let items = cartString.split("|");
    for (let i = 0; i < items.length; i++) {
      let parts = items[i].split(",");
      cart.push({ name: parts[0], price: Number(parts[1]) });
    }
  }

  cart.splice(index, 1);

  let newString = "";
  for (let i = 0; i < cart.length; i++) {
    newString += cart[i].name + "," + cart[i].price;
    if (i < cart.length - 1) newString += "|";
  }

  localStorage.setItem("cart", newString);

  loadCart();
}

function confirmBooking() {
  const date = document.getElementById('date').value;
  const payment = document.getElementById('payment').value;

  if (!date) {
    alert('Please select a date.');
    return;
  }

  alert("Booking confirmed for " + date + "\nPayment: " + payment);

  localStorage.removeItem("cart");

  window.location.href = "index.html";
}

function toggleCardForm() {
  const payment = document.getElementById('payment').value;
  const cardForm = document.getElementById('cardForm');

  if (payment === "Card") {
    cardForm.style.display = "block";
  } else {
    cardForm.style.display = "none";
  }
}

window.onload = loadCart;
