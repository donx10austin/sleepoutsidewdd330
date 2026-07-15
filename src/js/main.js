import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const listElement = document.getElementById("product-list");
const category = "tents";
const products = new ProductData(category);
const productList = new ProductList(category, products, listElement);
await loadHeaderFooter();
productList.init();
