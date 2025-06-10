let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    name: "Dutchki White",
    price: 170000,
    image: "https://storage.googleapis.com/a1aa/image/Gbqyj0m93_Tej_uv_Npn4aYKrLL02gIKXgmdUfRL4ng.jpg",
    qty: 1
  }
];

cart = cart.map(item => ({ ...item, qty: item.qty || 1 }));

function updateCartDisplay() {
  const cartContainer = document.getElementById("cart-items");
  const totalItems = document.getElementById("total-items");
  const subtotal = document.getElementById("subtotal");
  const total = document.getElementById("total");

  cartContainer.innerHTML = "";
  let totalQty = 0;
  let totalPrice = 0;

  cart.forEach((item, index) => {
    const price = item.price;
    const qty = item.qty;
    const itemTotal = price * qty;

    totalQty += qty;
    totalPrice += itemTotal;

    const itemDiv = document.createElement("div");
    itemDiv.className = "item";
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="item-info">
        <strong>${item.name}</strong><br>
        Rp${price.toLocaleString()} x ${qty} = Rp${itemTotal.toLocaleString()}
      </div>
      <div class="item-controls">
        <button onclick="decreaseQty(${index})">-</button>
        <span>${qty}</span>
        <button onclick="increaseQty(${index})">+</button>
      </div>
    `;
    cartContainer.appendChild(itemDiv);
  });

  totalItems.textContent = totalQty;
  subtotal.textContent = "Rp" + totalPrice.toLocaleString();
  total.textContent = "Rp" + totalPrice.toLocaleString();
}

function increaseQty(index) {
  cart[index].qty += 1;
  saveCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  }
  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

// ✅ Saat klik "Lanjut ke Pembayaran", simpan data ke localStorage lalu pindah ke methodpay.html
document.querySelector(".pay").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!name || !phone || !address) {
    alert("Mohon lengkapi semua data pengiriman.");
    return;
  }

  const checkoutData = {
    name,
    phone,
    address,
    cart
  };

  localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
  window.location.href = "methodpay.html";
});

// 🧹 Tombol "Hapus Semua Produk"
document.querySelector(".clear").addEventListener("click", () => {
  if (confirm("Yakin ingin mengosongkan keranjang?")) {
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
  }
});

updateCartDisplay();
