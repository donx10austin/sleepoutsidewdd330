// Add these to your existing src/js/utils.mjs

export function qsAll(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

export function setClick(selector, callback) {
  // Can be a selector string or a DOM element
  const element = typeof selector === 'string' ? qs(selector) : selector;
  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

export function addToWishlist(product) {
  let wishlist = getLocalStorage("wishlist") || [];
  // Check if already exists
  if (!wishlist.find(item => item.id === product.id)) {
    wishlist.push(product);
    setLocalStorage("wishlist", wishlist);
    return true; // Added
  }
  return false; // Already exists
}