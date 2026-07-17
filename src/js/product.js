// Product page functionality
import { findProductById } from "./ProductData.mjs";
import { getParams } from "./utils.mjs";

export async function loadProductDetails() {
  const productId = getParams("product");
  if (!productId) {
    console.error("No product ID provided");
    return;
  }

  try {
    const product = await findProductById(productId);
    if (!product) {
      console.error("Product not found");
      return;
    }

    renderProductDetails(product);
  } catch (error) {
    console.error("Error loading product details:", error);
  }
}

function renderProductDetails(product) {
  const container = document.querySelector(".product-detail");
  if (!container) return;

  const discountedPrice = product.FinalPrice < product.SuggestedRetailPrice;

  container.innerHTML = `
    <h2>${product.Name}</h2>
    <img src="${product.Images?.PrimaryLarge || product.Images?.PrimaryMedium}" alt="${product.Name}">
    <p class="product__brand">${product.Brand?.Name || ""}</p>
    ${
      discountedPrice
        ? `
      <p class="product__price">
        <span class="original-price">$${product.SuggestedRetailPrice?.toFixed(2)}</span>
        <span class="discounted-price">$${product.FinalPrice?.toFixed(2)}</span>
      </p>
    `
        : `
      <p class="product__price">$${product.FinalPrice?.toFixed(2)}</p>
    `
    }
    <p class="product__description">${product.Description || ""}</p>
    <button id="add-to-cart" data-id="${product.Id}">Add to Cart</button>
  `;

  const cartButton = document.getElementById("add-to-cart");
  if (cartButton) {
    cartButton.addEventListener("click", () => addToCart(product));
  }
}

function addToCart(product) {
  // Implementation of add to cart functionality
  // This would use your existing cart logic
  console.log("Adding to cart:", product);
  alert(`${product.Name} added to cart!`);
}
