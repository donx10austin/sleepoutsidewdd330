import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
<<<<<<< HEAD
import { getLocalStorage, getParam, setLocalStorage } from "./utils.mjs";
=======
import { getParam } from "./utils.mjs";
>>>>>>> 5c470f30e8602cb09b061a9c13cf741338a26520

const dataSource = new ProductData("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
product.init();
<<<<<<< HEAD

function addProductToCart(product) {
  let cartList = getLocalStorage("so-cart");
  if (!Array.isArray(cartList)) {
    cartList = [];
  }
  cartList.push(product);
  setLocalStorage("so-cart", cartList);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
=======
>>>>>>> 5c470f30e8602cb09b061a9c13cf741338a26520
