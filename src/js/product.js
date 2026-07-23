import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const dataSource = new ExternalServices("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);

loadHeaderFooter();
product.init();
