// src/js/utils.mjs

export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}

export function qsAll(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

export function setClick(selector, callback) {
  const element = typeof selector === "string" ? qs(selector) : selector;
  element.addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  element.addEventListener("click", callback);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Add this function:
export function getWishlist() {
  return getLocalStorage("wishlist") || [];
}

export function addToWishlist(product) {
  let wishlist = getLocalStorage("wishlist") || [];
  // Check if already exists
  if (!wishlist.find((item) => item.id === product.id)) {
    wishlist.push(product);
    setLocalStorage("wishlist", wishlist);
    return true; // Added
  }
  return false; // Already exists
}

export async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(
  template,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  const htmlStrings = list.map(template);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

export async function loadTemplate(path) {
  try {
    const response = await fetch(path);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const template = await response.text();

    return template;
  } catch (error) {
    // console.error(error);
  }
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate(
    import.meta.env.BASE_URL + "/partials/header.html",
  );
  const footerTemplate = await loadTemplate(
    import.meta.env.BASE_URL + "/partials/footer.html",
  );

  const headerElement = document.getElementById("header");
  const footerElement = document.getElementById("footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}
