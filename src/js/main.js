import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { addToWishlist, getParam, loadHeaderFooter, qs } from "./utils.mjs";

// Use getParam to grab the category from the URL
const category = getParam("category");

// Initialize ProductData
const dataSource = new ProductData();
const listElement = qs(".product-list");
const myList = new ProductList(category, dataSource, listElement);

async function init() {
  await loadHeaderFooter();
  await myList.init();

  // Event Delegation
  listElement.addEventListener("click", (e) => {
    if (e.target.classList.contains("wishlist-btn")) {
      const btn = e.target;
      const product = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: btn.dataset.price,
        image: btn.dataset.img,
      };
      const wasAdded = addToWishlist(product);
      alert(
        wasAdded
          ? `🎉 ${product.name} added!`
          : `👀 ${product.name} is already there!`,
      );
    }
  });
}

init();
