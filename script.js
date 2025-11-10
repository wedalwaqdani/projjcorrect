function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push({ name, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${name} added to your cart!`);
}

function loadCart() {
  const container = document.getElementById('cartItems');
  if (!container) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    document.getElementById('subtotal').textContent = "";
    document.getElementById('vat').textContent = "";
    document.getElementById('total').textContent = "";
    return;
  }

  container.innerHTML = cart.map((i, index) => 
    `<div class="cart-item">
      <p><strong>${i.name}</strong> – ${i.price} SAR 
      <button class="remove" onclick="removeItem(${index})">❌</button></p>
    </div>`
  ).join('');

  const subtotal = cart.reduce((sum, i) => sum + i.price, 0);
  const vat = subtotal * 0.15;
  const total = subtotal + vat;

  document.getElementById('subtotal').textContent = `Subtotal: ${subtotal.toFixed(2)} SAR`;
  document.getElementById('vat').textContent = `VAT (15%): ${vat.toFixed(2)} SAR`;
  document.getElementById('total').textContent = `Total: ${total.toFixed(2)} SAR`;
}

function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function confirmBooking() {
  const date = document.getElementById('date').value;
  const payment = document.getElementById('payment').value;
  if (!date) {
    alert('Please select a date.');
    return;
  }
  alert(`Booking confirmed for ${date}\nPayment: ${payment}`);
  localStorage.removeItem('cart');
  window.location.href = 'index.html';
}

function toggleCardForm() {
  const payment = document.getElementById('payment').value;
  const cardForm = document.getElementById('cardForm');

  if (payment === 'Card') {
    cardForm.style.display = 'block'; 
  } else {
    cardForm.style.display = 'none'; 
  }
}



window.onload = loadCart;
