// Ambil data checkout dari localStorage
const checkoutData = JSON.parse(localStorage.getItem("checkoutData"));

if (!checkoutData) {
  alert("Data checkout tidak ditemukan. Silakan kembali ke halaman checkout.");
  window.location.href = "co.html"; // ganti jika nama file berbeda
}

document.querySelectorAll('.payment-item').forEach(item => {
  item.addEventListener('click', () => {
    const selectedMethod = item.querySelector('img').alt;
    checkoutData.payment_method = selectedMethod;

    fetch("checkout.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(checkoutData)
    })
    .then(response => response.text())
    .then(result => {
      alert("Pesanan berhasil diproses dengan metode: " + selectedMethod);
      localStorage.removeItem("cart");
      localStorage.removeItem("checkoutData");
      window.location.href = "payacc.html";
    })
    .catch(error => {
      console.error("Gagal mengirim data ke server:", error);
      alert("Terjadi kesalahan saat mengirim pesanan.");
    });
  });
});
