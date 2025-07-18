import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HomeContext } from "../home";
import { isWishReq, unWishReq, isWish } from "../home/Mixins";

const ProductCard = ({ item }) => {
  const { _id, pImages, pName, pPrice, pRatingsReviews } = item;
  const navigate = useNavigate();
  const [wList, setWlist] = useState(JSON.parse(localStorage.getItem("wishList")) || []);
  const { data } = useContext(HomeContext);

  return (
    <div className="group bg-white shadow-md rounded-xl overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl relative">
      {/* Product Image */}
      <div className="overflow-hidden">
        <img
          src={`http://localhost:8000/uploads/products/${pImages[0]}`}
          alt={pName}
          onClick={() => navigate(`/products/${_id}`)}
          className="w-full h-56 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-md font-semibold text-gray-800 truncate">{pName}</h3>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L4.96 10.1c-.784-.57-.38-1.81.588-1.81h4.915a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
            <span className="text-sm text-gray-500">{pRatingsReviews.length}</span>
          </div>
        </div>

        <div className="text-lg font-bold text-gray-900">${pPrice}.00</div>
      </div>

      {/* Wishlist Icon */}
      <div className="absolute top-2 right-2 z-10">
        {!isWish(_id, wList) ? (
          <svg
            onClick={(e) => isWishReq(e, _id, setWlist)}
            className="w-7 h-7 text-yellow-600 cursor-pointer hover:scale-125 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        ) : (
          <svg
            onClick={(e) => unWishReq(e, _id, setWlist)}
            className="w-7 h-7 text-yellow-600 cursor-pointer hover:scale-125 transition-transform duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
