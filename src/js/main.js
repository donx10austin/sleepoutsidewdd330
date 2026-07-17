// src/js/main.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { qs, addToWishlist } from "./utils.mjs";

const dataSource = new ProductData("tents");
const listElement = qs(".product-list");
const myList = new ProductList("tents", dataSource, listElement);

async function init() {
  await myList.init();

  // Event Delegation: Listen for clicks on the list, filter for the button
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
