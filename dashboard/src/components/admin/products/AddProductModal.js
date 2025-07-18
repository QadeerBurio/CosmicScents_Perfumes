import React, { Fragment, useContext, useState, useEffect } from "react";
import { ProductContext } from "./index";
import { createProduct, getAllProduct } from "./FetchApi";
import { getAllCategory } from "../categories/FetchApi";

const AddProductDetail = ({ categories }) => {
  const { data, dispatch } = useContext(ProductContext);

  const alert = (msg, type) => (
    <div className={`bg-${type}-200 py-2 px-4 w-full`}>{msg}</div>
  );

  const [fData, setFdata] = useState({
    pName: "",
    pDescription: "",
    pStatus: "Active",
    pImage: null,
    pCategory: "",
    oldPrice: "",
    pPrice: "",
    pOffer: 0,
    pQuantity: "",
    topCollection: false,
    solarPerfume: false,
    discount: false,
    seasonalProduct: false,
    animation: false,
    success: false,
    error: false,
  });

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

    if (!fData.pImage || fData.pImage.length < 2) {
      setFdata({ ...fData, error: "Please upload at least 2 images" });
      setTimeout(() => {
        setFdata((prev) => ({ ...prev, error: false }));
      }, 2000);
      return;
    }

    const productData = {
      ...fData,
      pImage: fData.pImage,
    };

    try {
      const responseData = await createProduct(productData);
      if (responseData.success) {
        fetchData();
        setFdata({
          pName: "",
          pDescription: "",
          pStatus: "Active",
          pImage: null,
          pCategory: "",
          oldPrice: "",
          pPrice: "",
          pOffer: 0,
          pQuantity: "",
          topCollection: false,
          solarPerfume: false,
          discount: false,
          seasonalProduct: false,
          animation: false,
          success: responseData.success,
          error: false,
        });
        setTimeout(() => {
          setFdata((prev) => ({ ...prev, success: false }));
        }, 2000);
      } else if (responseData.error) {
        setFdata((prev) => ({ ...prev, success: false, error: responseData.error }));
        setTimeout(() => {
          setFdata((prev) => ({ ...prev, error: false }));
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div
        onClick={() => dispatch({ type: "addProductModal", payload: false })}
        className={`${data.addProductModal ? "" : "hidden"} fixed top-0 left-0 z-30 w-full h-full bg-black opacity-50`}
      />
      <div
        className={`${data.addProductModal ? "" : "hidden"} fixed inset-0 flex items-center z-30 justify-center overflow-auto`}
      >
        <div className="mt-32 md:mt-0 relative bg-white w-11/12 md:w-3/6 shadow-lg flex flex-col items-center space-y-4 px-4 py-4 md:px-8">
          <div className="flex items-center justify-between w-full pt-4">
            <span className="text-left font-semibold text-2xl tracking-wider">
              Add Product
            </span>
            <span
              style={{ background: "#303031" }}
              onClick={() => dispatch({ type: "addProductModal", payload: false })}
              className="cursor-pointer text-gray-100 py-2 px-2 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
          </div>

          {fData.error && alert(fData.error, "red")}
          {fData.success && alert("Product created successfully!", "green")}

          <form className="w-full" onSubmit={submitForm}>
            <div className="flex space-x-2 py-2">
              <div className="w-1/2 flex flex-col space-y-1">
                <label>Product Name *</label>
                <input
                  value={fData.pName}
                  onChange={(e) => setFdata({ ...fData, pName: e.target.value })}
                  className="px-4 py-2 border focus:outline-none"
                  type="text"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label>Old Price *</label>
                <input
                  value={fData.oldPrice}
                  onChange={(e) => setFdata({ ...fData, oldPrice: e.target.value })}
                  className="px-4 py-2 border focus:outline-none"
                  type="number"
                />
              </div>
            </div>

            <div className="flex space-x-2 py-2">
              <div className="w-1/2 flex flex-col space-y-1">
                <label>New Price *</label>
                <input
                  value={fData.pPrice}
                  onChange={(e) => setFdata({ ...fData, pPrice: e.target.value })}
                  className="px-4 py-2 border focus:outline-none"
                  type="number"
                />
              </div>
              <div className="w-1/2 flex flex-col space-y-1">
                <label>Quantity in Stock *</label>
                <input
                  value={fData.pQuantity}
                  onChange={(e) => setFdata({ ...fData, pQuantity: e.target.value })}
                  className="px-4 py-2 border focus:outline-none"
                  type="number"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label>Product Description *</label>
              <textarea
                value={fData.pDescription}
                onChange={(e) => setFdata({ ...fData, pDescription: e.target.value })}
                className="px-4 py-2 border focus:outline-none"
                rows={2}
              />
            </div>

            <div className="flex flex-col mt-4">
              <label>Product Images *</label>
              <span className="text-gray-600 text-xs">Upload at least 2 images</span>
              <input
                onChange={(e) => setFdata({ ...fData, pImage: [...e.target.files] })}
                type="file"
                accept=".jpg,.jpeg,.png"
                multiple
                className="px-4 py-2 border focus:outline-none"
              />
            </div>

            <div className="flex space-x-2 py-4">
              <div className="w-1/2 flex flex-col">
                <label>Product Status *</label>
                <select
                  value={fData.pStatus}
                  onChange={(e) => setFdata({ ...fData, pStatus: e.target.value })}
                  className="px-4 py-2 border focus:outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
              <div className="w-1/2 flex flex-col">
                <label>Product Category *</label>
                <select
                  value={fData.pCategory}
                  onChange={(e) => setFdata({ ...fData, pCategory: e.target.value })}
                  className="px-4 py-2 border focus:outline-none"
                >
                  <option value="">Select a category</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.cName}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 py-2 text-sm">
              {["topCollection", "solarPerfume", "discount", "seasonalProduct", "animation"].map((name) => (
                <label key={name} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={fData[name]}
                    onChange={() => setFdata((prev) => ({ ...prev, [name]: !prev[name] }))}
                  />
                  <span>{name.replace(/([A-Z])/g, ' $1')}</span>
                </label>
              ))}
            </div>

            <div className="flex flex-col mt-4">
              <label>Offer (%)</label>
              <input
                value={fData.pOffer}
                onChange={(e) => setFdata({ ...fData, pOffer: e.target.value })}
                type="number"
                className="px-4 py-2 border focus:outline-none"
              />
            </div>

            <div className="flex flex-col space-y-1 w-full pb-4 mt-6">
              <button
                style={{ background: "#303031" }}
                type="submit"
                className="rounded-full bg-gray-800 text-gray-100 text-lg font-medium py-2"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const AddProductModal = () => {
  const [allCat, setAllCat] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await getAllCategory();
      if (res?.Categories) {
        setAllCat(res.Categories);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Fragment>
      <AddProductDetail categories={allCat} />
    </Fragment>
  );
};

export default AddProductModal;
