import { categories } from "./ProductData.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  //Week02 Individual-Task2:Discount Indicator on Product Listing
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const percentOff = Math.round(
    ((product.SuggestedRetailPrice - product.FinalPrice) /
      product.SuggestedRetailPrice) *
      100,
  );
  const discountBadge = isDiscounted
    ? `<span class="discount-indicator">${percentOff}% OFF</span>`
    : "";

  const retailPrice = isDiscounted
    ? `<span class="retail-price"><s>$${product.SuggestedRetailPrice.toFixed(2)}</s></span> `
    : "";

  return `<li class="product-card">
    <a href="${import.meta.env.BASE_URL}product_pages/?product=${product.Id}">
      <img src="${product.Images.PrimaryLarge}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">
        ${retailPrice}$${product.FinalPrice.toFixed(2)} ${discountBadge}
      </p>
    </a>
  </li>`;
}

function placeholderCardTemplate() {
  return `<li class="product-card placeholder">
    <a class="placeholder-link">
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
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.categories = categories;
  }
  async init() {
    // Show placeholder cards while loading
    this.renderPlaceholders(12);

    const list = await this.dataSource.getData(this.category);

    if (list.length > 0) {
      this.renderList(list);
    } else {
      this.listElement.innerHTML = `<p>No products found for category: ${this.getCategoryName()}</p>`;
    }
  }

  getCategoryName() {
    const categoryObj = this.categories.find((c) => c.id === this.category);
    return categoryObj ? categoryObj.name : "Unknown Category";
  }

  renderPlaceholders(count) {
    const placeholders = Array(count).fill(null);
    this.listElement.innerHTML = placeholders
      .map(() => placeholderCardTemplate())
      .join("");
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true,
    );
  }
}
