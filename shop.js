const products = [
    { name: "Dutchki 99", price: 150000, image: "https://storage.googleapis.com/a1aa/image/Gbqyj0m93_Tej_uv_Npn4aYKrLL02gIKXgmdUfRL4ng.jpg" },
    { name: "Dutchki Gold", price: 200000, image: "https://storage.googleapis.com/a1aa/image/WSLR95FrEPdp2myVvy1rExq3J0ugUn-rU07G7V9A8G4.jpg" },
    { name: "Dutchki Silver", price: 180000, image: "https://storage.googleapis.com/a1aa/image/vNZ0H1rlpDY6Ruhb2OP7-5GX4HJI8kHM4v27n0K5sq8.jpg" },
    { name: "Dutchki Platinum", price: 250000, image: "https://storage.googleapis.com/a1aa/image/NqmllsYo7PdF5mnSAu6_9kHG4znVDKDY05PIvaHGCxY.jpg" },
    { name: "Dutchki Black", price: 300000, image: "https://storage.googleapis.com/a1aa/image/JNtI_vZKCQbaDIkAgWrORbQCBaLUp3LDwd6tX4uBJ20.jpg" },
    { name: "Dutchki White", price: 170000, image: "https://storage.googleapis.com/a1aa/image/wuZPK8oyroPqxFnt7xVrE0j3mRpctkrpyi5N-8PlxU0.jpg" },
    { name: "Dutchki Red", price: 190000, image: "https://storage.googleapis.com/a1aa/image/RV0z8Y6WD8PWKz6zzRMU-11OgjAOTXPNe2BqyOaQZ4g.jpg" },
];

const cart = [];

function loadProducts() {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product, index) => {
        const productCard = document.createElement("div");
        productCard.classList.add("card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${product.price.toLocaleString()}</p>
            <button onclick="addToCart(${index})">Tambah ke Keranjang</button>
        `;
        productList.appendChild(productCard);
    });
}

function addToCart(index) {
    const productList = document.getElementById("product-list");
    const buttons = productList.getElementsByTagName("button");
    const button = buttons[index];
    const originalText = button.innerHTML;

    button.disabled = true;
    button.innerHTML = 'Menambahkan <span class="loader"></span>';

    setTimeout(() => {
        cart.push(products[index]);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();

        button.disabled = false;
        button.innerHTML = originalText;
    }, 1000);
}

function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    const checkoutBtn = document.getElementById("checkout-btn");
    cartContainer.innerHTML = "";

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Keranjang kosong</p>";
        checkoutBtn.style.display = "none";
        return;
    }

    cart.forEach((item, idx) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <span>${item.name} - Rp ${item.price.toLocaleString()}</span>
            <button class="remove-btn" onclick="removeFromCart(${idx})">Hapus</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    checkoutBtn.style.display = "block";
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function updateCartCount() {
    document.getElementById('cart-count').innerText = cart.length;
}

function toggleCart() {
    const cartSection = document.getElementById('cart-section');
    if (cartSection.style.display === 'none') {
        cartSection.style.display = 'block';
    } else {
        cartSection.style.display = 'none';
    }
}

function goToCheckout() {
    const btn = document.getElementById("checkout-btn");
    const originalText = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = 'Memproses <span class="loader"></span>';

    setTimeout(() => {
        window.location.href = "co.html";
    }, 1200);
}

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    savedCart.forEach(item => cart.push(item));
    renderCart();
    updateCartCount();
});

// Inject style loader langsung lewat JavaScript supaya tidak perlu edit file CSS
const style = document.createElement('style');
style.innerHTML = `
.loader {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #28a745;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 0.7s linear infinite;
  display: inline-block;
  vertical-align: middle;
  margin-left: 8px;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(style);
