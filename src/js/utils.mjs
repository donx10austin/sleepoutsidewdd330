export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate(
    import.meta.env.BASE_URL + "partials/header.html",
  );
  const footerTemplate = await loadTemplate(
    import.meta.env.BASE_URL + "partials/footer.html",
  );

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function addToWishlist(product) {
  const wishlist = getLocalStorage("wishlist") || [];
  // Check if it's already there to avoid duplicates
  const exists = wishlist.find((item) => item.id === product.id);
  if (!exists) {
    wishlist.push(product);
    setLocalStorage("wishlist", wishlist);
    return true; // Added
  }
  return false; // Already exists
}
