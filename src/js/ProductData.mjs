import { convertToJson } from "./utils.mjs";

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `../json/${this.category}.json`;
  }
  async getData() {
    const res = await fetch(this.path);
    const data = await convertToJson(res);
    return data;
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}
