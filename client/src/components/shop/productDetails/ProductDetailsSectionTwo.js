import React, { Fragment, useContext, useEffect, useState } from "react";
import AllReviews from "./AllReviews";
import ReviewForm from "./ReviewForm";
import { ProductDetailsContext } from "./";
import { LayoutContext } from "../layout";
import { isAuthenticate } from "../auth/fetchApi";
import "./style.css";

// --- Tabs (Description & Reviews)
const MenuTabs = ({ showDescription, toggleTab, reviewCount }) => {
  return (
    <div className="flex justify-center gap-6 border-b border-gray-300 py-3 bg-white shadow-sm rounded-t-md">
      <button
        onClick={() => toggleTab(true)}
        className={`text-base font-semibold px-4 pb-2 transition-all ${
          showDescription
            ? "border-b-2 border-yellow-500 text-yellow-700"
            : "text-gray-600 hover:text-yellow-700"
        }`}
      >
        Description
      </button>

      <button
        onClick={() => toggleTab(false)}
        className={`relative text-base font-semibold px-4 pb-2 transition-all ${
          !showDescription
            ? "border-b-2 border-yellow-500 text-yellow-700"
            : "text-gray-600 hover:text-yellow-700"
        }`}
      >
        Reviews
        {reviewCount > 0 && (
          <span className="absolute -top-2 -right-3 bg-yellow-600 text-white text-xs px-2 py-0.5 rounded-full">
            {reviewCount}
          </span>
        )}
      </button>
    </div>
  );
};

// --- Review Section
const RatingReview = () => {
  return (
    <Fragment>
      <AllReviews />
      {isAuthenticate() ? (
        <ReviewForm />
      ) : (
        <div className="my-4 mx-6 bg-red-100 text-red-700 px-4 py-2 rounded shadow">
          You need to login to submit a review.
        </div>
      )}
    </Fragment>
  );
};

// --- Main Product Details Section
const ProductDetailsSectionTwo = () => {
  const { data, dispatch } = useContext(ProductDetailsContext);
  const { data: layoutData } = useContext(LayoutContext);

  const [singleProduct, setSingleProduct] = useState({});
  const [showDescription, setShowDescription] = useState(true);

  useEffect(() => {
    setSingleProduct(layoutData.singleProductDetail || {});
  }, [layoutData.singleProductDetail]);

  const toggleTab = (showDesc) => {
    setShowDescription(showDesc);
    dispatch({ type: "menu", payload: showDesc });
  };

  return (
    <Fragment>
      <section className="mx-4 md:mx-12 my-6 bg-white p-6 rounded-md shadow-md transition-all animate-fade-in">
        <MenuTabs
          showDescription={showDescription}
          toggleTab={toggleTab}
          reviewCount={singleProduct?.pRatingsReviews?.length || 0}
        />

        {showDescription ? (
          <div className="mt-6 text-gray-700 leading-relaxed tracking-wide text-justify">
            {singleProduct?.pDescription || "No description available."}
          </div>
        ) : (
          <div className="mt-6">
            <RatingReview />
          </div>
        )}
      </section>

      {/* Category Footer */}
      <div className="m-4 md:mx-8 mb-8 text-center text-sm text-gray-600 bg-yellow-50 py-3 rounded-md border">
        <strong>Category:</strong>{" "}
        {singleProduct?.pCategory?.cName || "N/A"}
      </div>
    </Fragment>
  );
};

export default ProductDetailsSectionTwo;
