// src/js/product.js

import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// 1. Get the product ID from the URL
const productId = getParam("product");

// 2. Create an instance of the ProductData class
const dataSource = new ProductData("tents");

// 3. Create an instance of the ProductDetails class
const product = new ProductDetails(productId, dataSource);

// 4. Initialize the page
product.init();
