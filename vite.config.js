import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  base: "/sleepoutsidewdd330/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        // Since root is "src/", paths should be relative to "src/"
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
      },
    },
  },
});
