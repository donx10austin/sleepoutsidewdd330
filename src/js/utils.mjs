// Utility functions

export function renderListWithTemplate(templateFn, parentElement, list) {
  if (!parentElement || !list || list.length === 0) {
    parentElement.innerHTML = "";
    return;
  }

  const htmlString = list.map(templateFn).join("");
  parentElement.innerHTML = htmlString;
}

export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
