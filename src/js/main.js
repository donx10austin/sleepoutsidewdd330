import { getProductsByCategory } from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParams } from "./utils.mjs";

// Initialize product listing with search
function initProductListing() {
  const category = getParams("category") || "tents";
  const listElement = document.querySelector(".product-list");

  if (listElement) {
    const dataSource = {
      getData: (category) => getProductsByCategory(category),
    };

    const productList = new ProductList(category, dataSource, listElement);
    productList.init();
  }
}

// Initialize based on page
document.addEventListener("DOMContentLoaded", () => {
  // Check if we're on a product listing page
  if (document.querySelector(".product-list")) {
    initProductListing();
  }
});
