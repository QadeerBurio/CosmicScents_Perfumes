import React, { useEffect, useState } from "react";
import { fetchTopCollection } from "./fetchApi"; // ✅ Adjust path if needed
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 8;

const TopCollection = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchTopCollection();
      if (res?.Products) {
        setProducts(res.Products);
      }
    };
    fetchData();
  }, []);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Top Collection
      </h2>

      {currentItems.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {currentItems.map((item) => (
              <div
                key={item._id}
                className="border rounded hover:shadow-lg p-2 relative"
              >
                <img
                  src={`http://localhost:8000/uploads/products/${item.pImages[0]}`}
                  alt={item.pName}
                  onClick={() => navigate(`/products/${item._id}`)}
                  className="w-full h-48 object-cover rounded cursor-pointer"
                />
                <div className="mt-2 font-semibold text-gray-800 truncate">
                  {item.pName}
                </div>
                <div className="text-gray-600 text-sm truncate">
                  {item.pCategory?.cName || "No Category"}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  {item.pOffer > 0 && (
                    <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full">
                      {item.pOffer}% OFF
                    </span>
                  )}
                  <span className="font-bold text-gray-800">
                    ${item.pPrice}
                  </span>
                  {item.oldPrice && (
                    <span className="line-through text-gray-400 text-sm">
                      ${item.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 border rounded ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              ⬅ Prev
            </button>
            <span className="text-gray-700 font-medium text-lg">
              Page <strong>{currentPage}</strong> of {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 border rounded ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              Next ➡
            </button>
          </div>
        </>
      ) : (
        <div className="text-center text-xl text-gray-600 py-20">
          No top collection products found.
        </div>
      )}
    </div>
  );
};

export default TopCollection;
