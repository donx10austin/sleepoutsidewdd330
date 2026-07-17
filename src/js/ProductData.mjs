// Product data management

const baseURL =
  import.meta.env.VITE_BASE_URL || "https://wdd330-backend.onrender.com";

export async function getProductsByCategory(category) {
  try {
    const response = await fetch(`${baseURL}/products/search/${category}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.Result || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function findProductById(id) {
  try {
    const response = await fetch(`${baseURL}/product/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.Result || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export function getProductName(product) {
  return product.Name || "";
}

export function getProductPrice(product) {
  return product.FinalPrice || 0;
}

export function getProductImage(product) {
  return product.Images?.PrimarySmall || product.Images?.PrimaryMedium || "";
}
