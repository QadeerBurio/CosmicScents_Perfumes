import React, { Fragment, useEffect, useContext, useState, useRef } from "react";
import OrderSuccessMessage from "./OrderSuccessMessage";
import { HomeContext } from "./";
import { sliderImages } from "./Action";
import { prevSlide, nextSlide } from "./Mixins";

const Slider = () => {
  const { data, dispatch } = useContext(HomeContext);
  const [slide, setSlide] = useState(0);
  const sliderInterval = useRef(null);
  const totalSlides = data?.sliderImages?.length || 0;

  // Load slider images on mount
  useEffect(() => {
    sliderImages(dispatch);
  }, [dispatch]);

  // Start auto slider
  useEffect(() => {
    if (totalSlides > 1) startSlider();
    return () => clearInterval(sliderInterval.current);
  }, [totalSlides]);

  const startSlider = () => {
    sliderInterval.current = setInterval(() => {
      setSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); // 4 seconds
  };

  const pauseSlider = () => clearInterval(sliderInterval.current);
  const resumeSlider = () => startSlider();

  return (
    <Fragment>
      <style>{`
        @keyframes fadeInZoom {
          from { opacity: 0; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div
        className="relative mt-16 overflow-hidden border-2 rounded-md bg-gray-100"
        onMouseEnter={pauseSlider}
        onMouseLeave={resumeSlider}
        style={{ width: "100%", height: "400px" }}
      >
        {/* Image */}
        {totalSlides > 0 && (
          <img
            src={`http://localhost:8000/uploads/customize/${data.sliderImages[slide].slideImage}`}
            alt="slider"
            className="w-full h-full object-contain transition-all duration-1000"
            style={{ animation: "fadeInZoom 1s ease-in-out" }}
          />
        )}

        {/* Arrows & CTA */}
        {totalSlides > 1 && (
          <>
            {/* Left Arrow */}
            <div className="absolute top-1/2 left-3 transform -translate-y-1/2 z-20">
              <button
                onClick={() => prevSlide(totalSlides, slide, setSlide)}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>

            {/* Right Arrow */}
            <div className="absolute top-1/2 right-3 transform -translate-y-1/2 z-20">
              <button
                onClick={() => nextSlide(totalSlides, slide, setSlide)}
                className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* CTA */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <a
                href="#shop"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded shadow-lg transition"
              >
                Shop Now
              </a>
            </div>
          </>
        )}
      </div>

      <OrderSuccessMessage />
    </Fragment>
  );
};

export default Slider;
