import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");
const product = new ProductDetails(productId, dataSource);
product.init();

// productIds = ["880RR", "1308", "985RF", "1440", "989CG", "1440", "985PR", "1440", "880RT", "1308", "344YJ", "35027"]
