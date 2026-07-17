import { debounce, renderListWithTemplate } from "./utils.mjs";

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
    this.filteredProducts = [];
    this.searchTerm = "";
  }

  async init() {
    // Load products
    this.products = await this.dataSource.getData(this.category);
    this.filteredProducts = [...this.products];

    // Render initial list
    this.renderList(this.filteredProducts);

    // Setup search functionality
    this.setupSearch();

    // Update results count
    this.updateResultsCount(this.products.length);
  }

  setupSearch() {
    const searchInput = document.getElementById("search-input");
    const clearBtn = document.getElementById("clear-search");
    const resultsCount = document.getElementById("results-count");

    if (!searchInput) return;

    // Search handler with debounce for performance
    const handleSearch = (e) => {
      this.searchTerm = e.target.value.toLowerCase().trim();
      this.filterProducts(this.searchTerm);

      // Show/hide clear button
      if (clearBtn) {
        clearBtn.style.display = this.searchTerm ? "block" : "none";
      }
    };

    // Add event listener with debounce
    searchInput.addEventListener("input", debounce(handleSearch, 300));

    // Clear button functionality
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        this.searchTerm = "";
        this.filterProducts("");
        clearBtn.style.display = "none";
        searchInput.focus();

        // Update results count
        this.updateResultsCount(this.products.length);
      });
    }

    // Handle Enter key for immediate search
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        // Force immediate search without debounce
        this.searchTerm = searchInput.value.toLowerCase().trim();
        this.filterProducts(this.searchTerm);
        if (clearBtn) {
          clearBtn.style.display = this.searchTerm ? "block" : "none";
        }
      }
    });
  }

  filterProducts(searchTerm) {
    if (!searchTerm) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter((product) => {
        // Search in multiple fields
        const nameMatch =
          product.Name && product.Name.toLowerCase().includes(searchTerm);
        const descriptionMatch =
          product.Description &&
          product.Description.toLowerCase().includes(searchTerm);
        const brandMatch =
          product.Brand &&
          product.Brand.Name &&
          product.Brand.Name.toLowerCase().includes(searchTerm);
        const categoryMatch =
          product.Category &&
          product.Category.toLowerCase().includes(searchTerm);

        return nameMatch || descriptionMatch || brandMatch || categoryMatch;
      });
    }

    this.renderList(this.filteredProducts);
    this.updateResultsCount(this.filteredProducts.length);
  }

  renderList(products) {
    if (!this.listElement) return;

    if (products.length === 0) {
      this.listElement.innerHTML = `
        <div class="no-results">
          <p>No products found matching "<span class="search-term">${this.searchTerm}</span>"</p>
          <p class="no-results-hint">Try adjusting your search terms or browse our categories above.</p>
        </div>
      `;
      return;
    }

    renderListWithTemplate(
      this.productCardTemplate.bind(this),
      this.listElement,
      products,
    );
  }

  productCardTemplate(product) {
    const discountedPrice = product.FinalPrice < product.SuggestedRetailPrice;

    // Highlight search term in product name
    let nameHtml = product.Name || "Unnamed Product";
    if (this.searchTerm) {
      const regex = new RegExp(`(${this.searchTerm})`, "gi");
      nameHtml = nameHtml.replace(regex, '<span class="highlight">$1</span>');
    }

    return `
      <li class="product-card">
        <a href="/product-pages/?product=${product.Id}">
          <img 
            src="${product.Images?.PrimarySmall || product.Images?.PrimaryMedium || "/images/placeholder.png"}" 
            alt="${product.Name || "Product"}"
            loading="lazy"
          >
          <h3 class="card__brand">${product.Brand?.Name || ""}</h3>
          <h2 class="card__name">${nameHtml}</h2>
          ${
            discountedPrice
              ? `
            <p class="product-card__price">
              <span class="original-price">$${product.SuggestedRetailPrice?.toFixed(2) || "0.00"}</span>
              <span class="discounted-price">$${product.FinalPrice?.toFixed(2) || "0.00"}</span>
            </p>
          `
              : `
            <p class="product-card__price">$${product.FinalPrice?.toFixed(2) || "0.00"}</p>
          `
          }
          ${discountedPrice ? `<span class="discount-badge">Sale!</span>` : ""}
        </a>
      </li>
    `;
  }

  updateResultsCount(count) {
    const countElement = document.getElementById("results-count");
    if (countElement) {
      const total = this.products.length;
      if (this.searchTerm) {
        countElement.textContent = `Found ${count} product${count !== 1 ? "s" : ""} matching "${this.searchTerm}"`;
      } else {
        countElement.textContent = `${total} product${total !== 1 ? "s" : ""} available`;
      }
    }
  }
}
