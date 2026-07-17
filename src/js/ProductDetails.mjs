// src/js/ProductDetails.mjs
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // Use our datasource to get the details for the current product
    this.product = await this.dataSource.findProductById(this.productId);
    
    // Render the HTML
    this.renderProductDetails();
    
    // Add a listener to the Add to Cart button
    document.getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    // 1. Get the current cart from local storage
    let cartList = getLocalStorage("so-cart");
    
    // 2. If it's not an array (first time), initialize as empty array
    if (!Array.isArray(cartList)) {
      cartList = [];
    }
    
    // 3. Add the product to the array
    cartList.push(this.product);
    
    // 4. Save the updated list back to local storage
    setLocalStorage("so-cart", cartList);
  }

  renderProductDetails() {
    const detailsElement = document.querySelector('.product-detail');
    detailsElement.innerHTML = `
      <h3>${this.product.Brand.Name}</h3>
      <h2 class="divider">${this.product.NameWithoutBrand}</h2>
      <img class="divider" src="${this.product.Image}" alt="${this.product.NameWithoutBrand}" />
      <p class="product-card__price">$${this.product.FinalPrice}</p>
      <p class="product__color">${this.product.Colors[0].ColorName}</p>
      <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
      </div>`;
  }
}