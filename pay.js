const paymentMethods = [
    { name: "DANA", logo: "https://seeklogo.com/images/D/dana-logo-EE83B14E4D-seeklogo.com.png" },
    { name: "GoPay", logo: "https://assets.stickpng.com/images/5ef1a296d52acb0004d7d3c0.png" },
    { name: "PayPal", logo: "https://www.paypalobjects.com/webstatic/icon/pp258.png" },
    { name: "ShopeePay", logo: "https://download.logo.wine/logo/Shopee/Shopee-Logo.wine.png" },
    { name: "OVO", logo: "https://play-lh.googleusercontent.com/KI8T3mXMrcDCJgYPv0Jxt1-ZsZ3qDltw0WkK9U6VhItpmphnc4Rvllb7VzPInMmTk8g=w240-h480-rw" },
    { name: "SeaBank", logo: "https://seeklogo.com/images/S/seabank-logo-4B4BA359E2-seeklogo.com.png" },
    { name: "BCA", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/BCA_logo.svg" },
    { name: "BRImo", logo: "https://seeklogo.com/images/B/bri-mobile-logo-7E171DBE43-seeklogo.com.png" },
    { name: "BNI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Bank_BNI_logo.svg/512px-Bank_BNI_logo.svg.png" }
  ];
  
  function loadPaymentMethods() {
    const container = document.getElementById('payment-methods');
    container.innerHTML = '';
  
    paymentMethods.forEach(method => {
      const card = document.createElement('div');
      card.classList.add('payment-card');
      card.innerHTML = `
        <img src="${method.logo}" alt="${method.name}">
        <span>${method.name}</span>
      `;
  
      card.addEventListener('click', () => {
        // Simpan informasi pesanan ke localStorage
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  
        const orderSummary = {
          method: method.name,
          items: cartItems,
          total: totalPrice
        };
  
        localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
  
        // Redirect ke halaman sukses
        window.location.href = "payacc.html";
      });
  
      container.appendChild(card);
    });
  }
  
  document.addEventListener('DOMContentLoaded', loadPaymentMethods);
  