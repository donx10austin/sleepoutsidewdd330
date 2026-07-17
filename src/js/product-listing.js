import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();
const category = getParam("category");
const dataSource = new ProductData();
const listElement = document.getElementById("product-list");
const myList = new ProductList(category, dataSource, listElement);
myList.init();

const titleElement = document.querySelector(".title");
const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
titleElement.textContent = `Top Products: ${formattedCategory}`;
