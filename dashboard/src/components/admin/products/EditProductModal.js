import React, { Fragment, useContext, useState, useEffect } from "react";
import { ProductContext } from "./index";
import { editProduct, getAllProduct } from "./FetchApi";
import { getAllCategory } from "../categories/FetchApi";

const EditProductModal = () => {
  const { data, dispatch } = useContext(ProductContext);
  const [categories, setCategories] = useState([]);

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [editformData, setEditformdata] = useState({
    pId: "",
    pName: "",
    pDescription: "",
    pImages: null,
    pEditImages: null,
    pStatus: "",
    pCategory: "",
    pQuantity: "",
    oldPrice: "",
    pPrice: "",
    pOffer: "",
    topCollection: false,
    solarPerfume: false,
    discount: false,
    seasonalProduct: false,
    animation: false,
    error: false,
    success: false,
  });

  useEffect(() => {
    const fetchCategoryData = async () => {
      const responseData = await getAllCategory();
      if (responseData?.Categories) {
        setCategories(responseData.Categories);
      }
    };
    fetchCategoryData();
  }, []);

  useEffect(() => {
    setEditformdata({
      ...editformData,
      ...data.editProductModal,
    });
  }, [data.editProductModal]);

  const fetchData = async () => {
    const responseData = await getAllProduct();
    if (responseData?.Products) {
      dispatch({
        type: "fetchProductsAndChangeState",
        payload: responseData.Products,
      });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const responseData = await editProduct(editformData);
      if (responseData.success) {
        fetchData();
        setEditformdata((prev) => ({ ...prev, success: responseData.success }));
        setTimeout(() => {
          setEditformdata((prev) => ({ ...prev, success: false }));
        }, 2000);
      } else if (responseData.error) {
        setEditformdata((prev) => ({ ...prev, error: responseData.error }));
        setTimeout(() => {
          setEditformdata((prev) => ({ ...prev, error: false }));
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div
        onClick={() => dispatch({ type: "editProductModalClose", payload: false })}
        className={`${
          data.editProductModal.modal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />

      <div
        className={`${
          data.editProductModal.modal ? "" : "hidden"
        } fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
        <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Edit Product
            </span>
            <span
              style={{ background: "#303031" }}
              onClick={() => dispatch({ type: "editProductModalClose", payload: false })}
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </div>

          {editformData.error && alert(editformData.error, "red")}
          {editformData.success && alert("Product updated successfully!", "green")}

          <form className="w-full" onSubmit={submitForm}>
            <div className="grid grid-cols-2 gap-4 py-2">
              <div>
                <label>Product Name *</label>
                <input
                  value={editformData.pName}
                  onChange={(e) => setEditformdata({ ...editformData, pName: e.target.value })}
                  className="px-4 py-2 border focus:outline-none w-full"
                  type="text"
                />
              </div>
              <div>
                <label>Old Price *</label>
                <input
                  value={editformData.oldPrice}
                  onChange={(e) => setEditformdata({ ...editformData, oldPrice: e.target.value })}
                  className="px-4 py-2 border focus:outline-none w-full"
                  type="number"
                />
              </div>
              <div>
                <label>New Price *</label>
                <input
                  value={editformData.pPrice}
                  onChange={(e) => setEditformdata({ ...editformData, pPrice: e.target.value })}
                  className="px-4 py-2 border focus:outline-none w-full"
                  type="number"
                />
              </div>
              <div>
                <label>Stock Quantity *</label>
                <input
                  value={editformData.pQuantity}
                  onChange={(e) => setEditformdata({ ...editformData, pQuantity: e.target.value })}
                  className="px-4 py-2 border focus:outline-none w-full"
                  type="number"
                />
              </div>
              <div>
                <label>Offer (%)</label>
                <input
                  value={editformData.pOffer}
                  onChange={(e) => setEditformdata({ ...editformData, pOffer: e.target.value })}
                  className="px-4 py-2 border focus:outline-none w-full"
                  type="number"
                />
              </div>
              <div>
                <label>Status *</label>
                <select
                  value={editformData.pStatus}
                  onChange={(e) => setEditformdata({ ...editformData, pStatus: e.target.value })}
                  className="px-4 py-2 border focus:outline-none w-full"
                >
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
              <div>
                <label>Category *</label>
                <select
                  value={editformData.pCategory._id || editformData.pCategory}
                  onChange={(e) => setEditformdata({ ...editformData, pCategory: e.target.value })}
                  className="px-4 py-2 border focus:outline-none w-full"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.cName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col space-y-2 mt-2">
              <label>Description *</label>
              <textarea
                value={editformData.pDescription}
                onChange={(e) => setEditformdata({ ...editformData, pDescription: e.target.value })}
                className="px-4 py-2 border focus:outline-none"
                rows={3}
              />
            </div>

            <div className="flex flex-col mt-4">
              <label>Product Images *</label>
              {editformData.pImages && editformData.pImages.length >= 2 && (
                <div className="flex space-x-2">
                  {editformData.pImages.map((img, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:8000/uploads/products/${img}`}
                      className="h-16 w-16 object-cover"
                      alt="product"
                    />
                  ))}
                </div>
              )}
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple
                onChange={(e) => setEditformdata({ ...editformData, pEditImages: [...e.target.files] })}
                className="px-4 py-2 border focus:outline-none mt-2"
              />
            </div>

            <div className="grid grid-cols-3 gap-3 py-4 text-sm">
              {["topCollection", "solarPerfume", "discount", "seasonalProduct", "animation"].map((key) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editformData[key]}
                    onChange={() => setEditformdata({ ...editformData, [key]: !editformData[key] })}
                  />
                  <span>{key.replace(/([A-Z])/g, " $1").trim()}</span>
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="rounded-full bg-gray-800 text-white font-semibold text-lg py-2 w-full mt-2"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProductModal;
