import { getProductsByCategory } from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParams } from "./utils.mjs";

// Page-specific initialization
const category = getParams("category") || "tents";
const listElement = document.querySelector("#product-list");

const dataSource = {
  getData: (category) => getProductsByCategory(category),
};

const productList = new ProductList(category, dataSource, listElement);
productList.init();
