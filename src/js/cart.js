import {
  getLocalStorage,
  loadHeaderFooter,
  setLocalStorage,
} from "./utils.mjs";

function renderCartContents() {
  // Show placeholders while loading
  renderCartPlaceholders(4);

  // Simulate loading delay
  const cartItems = getLocalStorage("so-cart");

  setTimeout(() => {
    if (cartItems && cartItems.length > 0) {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      document.querySelector(".product-list").innerHTML = htmlItems.join("");
      attachRemoveListeners();
    } else {
      document.querySelector(".product-list").innerHTML =
        "<p>Your cart is empty.</p>";
    }
  }, 250);
}

function renderCartPlaceholders(count) {
  const placeholders = Array(count).fill(null);
  document.querySelector(".product-list").innerHTML = placeholders
    .map(() => cartPlaceholderTemplate())
    .join("");
}

function cartPlaceholderTemplate() {
  return `<li class="product-card placeholder">
    <div class="placeholder-link">
      <div class="placeholder-image shimmer"></div>
      <h2 class="card__brand">
        <div class="placeholder-text shimmer" style="width: 60%;"></div>
      </h2>
      <h3 class="card__name">
        <div class="placeholder-text shimmer" style="width: 85%;"></div>
        <div class="placeholder-text shimmer" style="width: 70%; margin-top: 0.3em;"></div>
      </h3>
      <p class="product-card__price">
        <div class="placeholder-text shimmer" style="width: 45%;"></div>
      </p>
    </div>
  </li>`;
}

function cartItemTemplate(item) {
  const totalPrice = (item.FinalPrice * item.Quantity).toFixed(2);

  return `
    <li class="product-card cart-item">
      <button class="remove-item" data-id="${item.Id}">
        <span class="remove-item-icon">&times;</span>
        Remove
      </button>
      <a href="#">
        <img src="${item.Images.PrimaryLarge}" alt="Image of ${item.Name}">
        <h2 class="card__brand">${item.Colors[0].ColorName}</h2>
        <h3 class="card__name">${item.Name}</h3>
        <p class="product-card__quantity">Qty: ${item.Quantity}</p>
        <p class="product-card__price">$${totalPrice}</p>
      </a>
    </li>
  `;
}

function removeFromCart(id) {
  let cartItems = getLocalStorage("so-cart");

  cartItems = cartItems.filter((item) => item.Id !== id);

  setLocalStorage("so-cart", cartItems);

  renderCartContents();
  attachRemoveListeners();
}

function attachRemoveListeners() {
  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(button.dataset.id);
    });
  });
}

loadHeaderFooter();
renderCartContents();
