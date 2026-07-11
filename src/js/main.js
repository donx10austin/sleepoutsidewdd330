import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const listElement = document.getElementById("product-list");
const category = "tents";
const products = new ProductData(category);
const productList = new ProductList(category, products, listElement);
productList.init();
