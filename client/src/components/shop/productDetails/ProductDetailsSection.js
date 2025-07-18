import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailsContext } from "./index";
import { LayoutContext } from "../layout";
import Submenu from "./Submenu";
import ProductDetailsSectionTwo from "./ProductDetailsSectionTwo";

import { getSingleProduct } from "./FetchApi";
import { cartListProduct } from "../partials/FetchApi";
import { isWishReq, unWishReq, isWish } from "../home/Mixins";
import { updateQuantity, slideImage, addToCart, cartList } from "./Mixins";
import { totalCost } from "../partials/Mixins";

const ProductDetailsSection = () => {
  const { id } = useParams();
  const { data, dispatch } = useContext(ProductDetailsContext);
  const { data: layoutData, dispatch: layoutDispatch } = useContext(LayoutContext);

  const [count, setCount] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("100ml");
  const [alertq, setAlertq] = useState(false);
  const [pImages, setPimages] = useState([]);
  const [wList, setWlist] = useState(JSON.parse(localStorage.getItem("wishList")));

  const sProduct = layoutData.singleProductDetail;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      const responseData = await getSingleProduct(id);
      if (responseData?.Product) {
        layoutDispatch({ type: "singleProductDetail", payload: responseData.Product });
        setPimages(responseData.Product.pImages);
        layoutDispatch({ type: "inCart", payload: cartList() });
      }
      dispatch({ type: "loading", payload: false });
    } catch (err) {
      console.log(err);
    }
    fetchCartProduct();
  };

  const fetchCartProduct = async () => {
    try {
      const res = await cartListProduct();
      if (res?.Products) layoutDispatch({ type: "cartProduct", payload: res.Products });
    } catch (err) {
      console.log(err);
    }
  };

  if (data.loading)
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  if (!sProduct)
    return <div className="text-center text-gray-500 mt-10">Product not found.</div>;

  return (
    <Fragment>
      {/* Breadcrumb */}
      <div className="mx-4 md:mx-8 mt-4">
        <Submenu
          value={{
            categoryId: sProduct.pCategory._id,
            product: sProduct.pName,
            category: sProduct.pCategory.cName,
          }}
        />
      </div>

      {/* Product Section */}
      <section className="mx-4 md:mx-8 my-6 max-h-screen overflow-y-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Image Viewer */}
          <div className="space-y-3">
            <div className="relative border rounded-lg overflow-hidden bg-white h-[400px] flex items-center justify-center">
              <img
                src={`http://localhost:8000/uploads/products/${pImages[count]}`}
                alt="product"
                className="max-h-full max-w-full object-contain"
              />
              <div className="absolute inset-0 flex justify-between items-center px-4">
                <button
                  onClick={() => slideImage("decrease", null, count, setCount, pImages)}
                  className="text-2xl text-gray-300 hover:text-yellow-600"
                >
                  ◀
                </button>
                <button
                  onClick={() => slideImage("increase", null, count, setCount, pImages)}
                  className="text-2xl text-gray-300 hover:text-yellow-600"
                >
                  ▶
                </button>
              </div>
            </div>

            <div className="flex space-x-2 overflow-x-auto">
              {pImages.map((img, index) => (
                <img
                  key={index}
                  onClick={() => setCount(index)}
                  src={`http://localhost:8000/uploads/products/${img}`}
                  alt="thumb"
                  className={`w-16 h-16 object-cover border-2 rounded-md cursor-pointer ${
                    count === index
                      ? "border-yellow-600 ring-2 ring-yellow-400 scale-105"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white p-5 border rounded-xl shadow-sm flex flex-col gap-4">
            <h1 className="text-2xl font-semibold text-gray-800">{sProduct.pName}</h1>

            <div className="flex items-center gap-2 text-yellow-600">
              <span className="text-lg">★★★★☆</span>
              <span className="text-sm text-gray-500">
                ({sProduct.pRatingsReviews?.length || 0} reviews)
              </span>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">{sProduct.pDescription}</p>

            <div className="flex items-center gap-3">
              <div className="text-2xl font-bold text-yellow-700">${sProduct.pPrice}.00</div>
              {sProduct.discount && (
                <span className="line-through text-sm text-gray-400">
                  ${sProduct.pPrice + 20}.00
                </span>
              )}
              <button
                onClick={() =>
                  isWish(sProduct._id, wList)
                    ? unWishReq(null, sProduct._id, setWlist)
                    : isWishReq(null, sProduct._id, setWlist)
                }
                className="text-2xl hover:scale-125 transition-transform text-yellow-700"
                title="Wishlist"
              >
                {isWish(sProduct._id, wList) ? "❤️" : "🤍"}
              </button>
            </div>

            {/* Size Selection */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Bottle Size</h4>
              <div className="flex gap-3">
                {["50ml", "100ml", "150ml"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-1 text-sm rounded-full font-medium ${
                      selectedSize === size
                        ? "bg-yellow-600 text-white shadow"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Cart Button */}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center border rounded-full px-3 py-1 space-x-6">
                <button
                  onClick={() =>
                    updateQuantity("decrease", sProduct.pQuantity, quantity, setQuantity, setAlertq)
                  }
                  className="text-xl text-gray-700"
                >
                  −
                </button>
                <span className="text-base">{quantity}</span>
                <button
                  onClick={() =>
                    updateQuantity("increase", sProduct.pQuantity, quantity, setQuantity, setAlertq)
                  }
                  className="text-xl text-gray-700"
                >
                  +
                </button>
              </div>

              {layoutData.inCart?.includes(sProduct._id) ? (
                <button
                  disabled
                  className="bg-gray-400 text-white px-6 py-2 rounded-full uppercase text-sm cursor-not-allowed"
                >
                  In Cart
                </button>
              ) : (
                <button
                  onClick={() =>
                    addToCart(
                      sProduct._id,
                      quantity,
                      sProduct.pPrice,
                      layoutDispatch,
                      setQuantity,
                      setAlertq,
                      fetchData,
                      totalCost
                    )
                  }
                  className="bg-black hover:bg-yellow-600 text-white px-6 py-2 rounded-full uppercase text-sm"
                >
                  Add to Cart
                </button>
              )}
            </div>

            {+quantity === +sProduct.pQuantity && (
              <div className="text-sm text-red-500">
                Only {sProduct.pQuantity} left in stock!
              </div>
            )}
          </div>
        </div>
      </section>

      <ProductDetailsSectionTwo />
    </Fragment>
  );
};

export default ProductDetailsSection;
