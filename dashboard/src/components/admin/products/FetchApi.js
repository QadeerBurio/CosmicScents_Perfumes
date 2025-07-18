import axios from "axios";

const API_URL = "http://localhost:8000/api/product";

// 📌 Get All Products
export const getAllProduct = async () => {
  try {
    const res = await axios.get(`${API_URL}/all-product`);
    return res.data;
  } catch (error) {
    console.log("Get All Products Error:", error);
  }
};

// 📌 Upload Product Images Only (if needed separately)
export const createProductImage = async ({ pImage }) => {
  let formData = new FormData();
  for (const file of pImage) {
    formData.append("pImage", file);
  }
  // Optionally, send to a specific upload-only endpoint
};

// 📌 Create Product
export const createProduct = async ({
  pName,
  pDescription,
  pImage,
  pStatus,
  pCategory,
  pQuantity,
  oldPrice,
  pPrice,
  pOffer,
  topCollection,
  solarPerfume,
  discount,
  seasonalProduct,
  animation,
}) => {
  const formData = new FormData();

  for (const file of pImage) {
    formData.append("pImage", file);
  }

  formData.append("pName", pName);
  formData.append("pDescription", pDescription);
  formData.append("pStatus", pStatus);
  formData.append("pCategory", pCategory);
  formData.append("pQuantity", pQuantity);
  formData.append("oldPrice", oldPrice);
  formData.append("pPrice", pPrice);
  formData.append("pOffer", pOffer);
  formData.append("topCollection", topCollection);
  formData.append("solarPerfume", solarPerfume);
  formData.append("discount", discount);
  formData.append("seasonalProduct", seasonalProduct);
  formData.append("animation", animation);

  try {
    const res = await axios.post(`${API_URL}/add-product`, formData);
    return res.data;
  } catch (error) {
    console.log("Create Product Error:", error);
  }
};

// 📌 Edit Product
export const editProduct = async (product) => {
  const formData = new FormData();

  if (product.pEditImages) {
    for (const file of product.pEditImages) {
      formData.append("pEditImages", file);
    }
  }

  formData.append("pId", product.pId);
  formData.append("pName", product.pName);
  formData.append("pDescription", product.pDescription);
  formData.append("pStatus", product.pStatus);
  formData.append("pCategory", product.pCategory._id || product.pCategory);
  formData.append("pQuantity", product.pQuantity);
  formData.append("oldPrice", product.oldPrice);
  formData.append("pPrice", product.pPrice);
  formData.append("pOffer", product.pOffer);
  formData.append("pImages", product.pImages);
  formData.append("topCollection", product.topCollection);
  formData.append("solarPerfume", product.solarPerfume);
  formData.append("discount", product.discount);
  formData.append("seasonalProduct", product.seasonalProduct);
  formData.append("animation", product.animation);

  try {
    const res = await axios.post(`${API_URL}/edit-product`, formData);
    return res.data;
  } catch (error) {
    console.log("Edit Product Error:", error);
  }
};

// 📌 Delete Product
export const deleteProduct = async (pId) => {
  try {
    const res = await axios.post(`${API_URL}/delete-product`, { pId });
    return res.data;
  } catch (error) {
    console.log("Delete Product Error:", error);
  }
};

// 📌 Products by Category
export const productByCategory = async (catId) => {
  try {
    const res = await axios.post(`${API_URL}/product-by-category`, { catId });
    return res.data;
  } catch (error) {
    console.log("Product by Category Error:", error);
  }
};

// 📌 Products by Price
export const productByPrice = async (price) => {
  try {
    const res = await axios.post(`${API_URL}/product-by-price`, { price });
    return res.data;
  } catch (error) {
    console.log("Product by Price Error:", error);
  }
};
