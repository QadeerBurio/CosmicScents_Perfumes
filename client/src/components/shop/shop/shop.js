import React, { Fragment, useReducer, useState, useEffect } from "react";
import Layout from "../layout";
import { homeReducer, homeState } from "../home/HomeContext";
import { HomeContext } from "../home/index";
import { getAllProduct } from "../home/fetchApi";
import { isWishReq, unWishReq, isWish } from "../home/Mixins";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 12;

const Shop = () => {
  const [data, dispatch] = useReducer(homeReducer, homeState);
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [wList, setWlist] = useState(JSON.parse(localStorage.getItem("wishList")));
  const navigate = useNavigate();

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const fetchProducts = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      const res = await getAllProduct();
      if (res?.Products) {
        dispatch({ type: "setProducts", payload: res.Products });
        setProducts(res.Products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({ type: "loading", payload: false });
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <HomeContext.Provider value={{ data, dispatch }}>
      <Layout>
        <div className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto pt-24">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-wide">
            Explore Our Fragrances
          </h1>

          {data.loading ? (
            <div className="flex justify-center py-20">
              <Loader />
            </div>
          ) : currentItems.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {currentItems.map((item, index) => (
                  <div
                    key={index}
                    className="relative border p-2 rounded hover:shadow-lg transition"
                  >
                    <img
                      onClick={() => navigate(`/products/${item._id}`)}
                      className="w-full h-64 object-cover rounded cursor-pointer"
                      src={`http://localhost:8000/uploads/products/${item.pImages[0]}`}
                      alt={item.pName}
                    />

                    <div className="mt-2 text-gray-700 font-medium truncate">
                      {item.pName}
                    </div>

                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 fill-current text-yellow-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                      <span>{item.pRatingsReviews.length}</span>
                    </div>

                    <div className="flex items-center mt-1 space-x-2">
                      {item.pOffer > 0 && (
                        <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                          {item.pOffer}% OFF
                        </span>
                      )}
                      <span className="text-gray-900 font-semibold text-lg">
                        ${item.pPrice}
                      </span>
                      {item.oldPrice && (
                        <span className="line-through text-sm text-gray-400">
                          ${item.oldPrice}
                        </span>
                      )}
                    </div>

                    {/* Wishlist icons */}
                    <div className="absolute top-0 right-0 m-2">
                      <svg
                        onClick={(e) => isWishReq(e, item._id, setWlist)}
                        className={`${
                          isWish(item._id, wList) && "hidden"
                        } w-6 h-6 cursor-pointer text-yellow-700`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <svg
                        onClick={(e) => unWishReq(e, item._id, setWlist)}
                        className={`${
                          !isWish(item._id, wList) && "hidden"
                        } w-6 h-6 cursor-pointer text-yellow-700`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-12 space-x-4 items-center">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-5 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  ⬅ Prev
                </button>
                <span className="text-gray-700 font-medium text-lg">
                  Page <span className="font-bold">{currentPage}</span> of {totalPages}
                </span>
                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-5 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition ${
                    currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Next ➡
                </button>
              </div>
            </>
          ) : (
            <div className="text-center text-xl text-gray-500 py-20">
              No products found.
            </div>
          )}
        </div>
      </Layout>
    </HomeContext.Provider>
  );
};

export default Shop;
