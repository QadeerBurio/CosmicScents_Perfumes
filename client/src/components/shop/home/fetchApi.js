import axios from "axios";

export const getAllProduct = async () => {
  try {
    let res = await axios.get(`http://localhost:8000/api/product/all-product`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPorductImage = async ({ pImage }) => {
  /* Most important part for uploading multiple image  */
  let formData = new FormData();
  for (const file of pImage) {
    formData.append("pImage", file);
  }
  /* Most important part for uploading multiple image  */
};

export const createProduct = async ({
  pName,
  pDescription,
  pImage,
  pStatus,
  pCategory,
  pQuantity,
  pPrice,
  pOffer,
}) => {
  /* Most important part for uploading multiple image  */
  let formData = new FormData();
  for (const file of pImage) {
    formData.append("pImage", file);
  }
  /* Most important part for uploading multiple image  */
  formData.append("pName", pName);
  formData.append("pDescription", pDescription);
  formData.append("pStatus", pStatus);
  formData.append("pCategory", pCategory);
  formData.append("pQuantity", pQuantity);
  formData.append("pPrice", pPrice);
  formData.append("pOffer", pOffer);

  try {
    let res = await axios.post(`http://localhost:8000/api/product/add-product`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editProduct = async (product) => {
  console.log(product);
  /* Most important part for updating multiple image  */
  let formData = new FormData();
  if (product.pEditImages) {
    for (const file of product.pEditImages) {
      formData.append("pEditImages", file);
    }
  }
  /* Most important part for updating multiple image  */
  formData.append("pId", product.pId);
  formData.append("pName", product.pName);
  formData.append("pDescription", product.pDescription);
  formData.append("pStatus", product.pStatus);
  formData.append("pCategory", product.pCategory._id);
  formData.append("pQuantity", product.pQuantity);
  formData.append("pPrice", product.pPrice);
  formData.append("pOffer", product.pOffer);
  formData.append("pImages", product.pImages);

  try {
    let res = await axios.post(`http://localhost:8000/api/product/edit-product`, formData);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (pId) => {
  try {
    let res = await axios.post(`http://localhost:8000/api/product/delete-product`, { pId });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const productByCategory = async (catId) => {
  try {
    let res = await axios.post(`http://localhost:8000/api/product/product-by-category`, {
      catId,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const productByPrice = async (price) => {
  try {
    let res = await axios.post(`http://localhost:8000/api/product/product-by-price`, {
      price,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchTopCollection = async () => {
  try {
    const res = await axios.get(`http://localhost:8000/api/product/products/top-collection`);
    if (res.status === 200 && res.data?.Products) {
      return res.data; // returns { Products: [...] }
    } else {
      console.warn("Unexpected response:", res);
      return { Products: [] };
    }
  } catch (err) {
    console.error("Top Collection Fetch Error:", err.message || err);
    return { Products: [] };
  }
};

export const fetchDiscountProducts = async () => {
  try {
    const res = await axios.get(`http://localhost:8000/api/product/products/discount`);
    return res.data;
  } catch (err) {
    console.error("Discount Products Fetch Error:", err);
    return { Products: [] };
  }
};
export const getSliderImages = async () => {
  try {
    let res = await axios.get(`http://localhost:8000/api/customize/get-slide-image`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const BearerToken = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).token
    : false;
const Headers = () => {
  return {
    headers: {
      token: `Bearer ${BearerToken()}`,
    },
  };
};

export const getAllCategory = async () => {
  try {
    let res = await axios.get(`http://localhost:8000/api/category/all-category`, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};