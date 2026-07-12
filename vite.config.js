import { defineConfig } from "vite";

export default defineConfig({
  // Change this from "/sleepoutsidewdd330/" to "./"
  base: "./",

  root: "src/",

  base: "/sleepoutsidewdd330/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
<<<<<<< HEAD
        main: "src/index.html",
        cart: "src/cart/index.html",
        checkout: "src/checkout/index.html",
        product1: "src/product_pages/cedar-ridge-rimrock-2.html",
        product2: "src/product_pages/marmot-ajax-3.html",
        product3: "src/product_pages/northface-alpine-3.html",
        product4: "src/product_pages/northface-talus-4.html",
=======
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
>>>>>>> 5c470f30e8602cb09b061a9c13cf741338a26520
      },
    },
  },
});
