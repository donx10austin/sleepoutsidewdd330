import ProductData, { categories } from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const topCategoryHeading = (categoryName) => {
  const topProductsElement = document.getElementById("top-products");
  const categoryLabel = categories.find((c) => c.id === categoryName).name;
  topProductsElement.textContent = `Top Products: ${categoryLabel}`;
};

const category = getParam("category") || "tents";
const listElement = document.getElementById("product-list");
const products = new ProductData(category);

const productList = new ProductList(category, products, listElement);
loadHeaderFooter();
topCategoryHeading(category);
productList.init();
