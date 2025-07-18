import React, { Fragment, createContext, useReducer } from "react";
import Layout from "../layout";
import Slider from "./Slider";
import ProductCategory from "./ProductCategory";
import { homeState, homeReducer } from "./HomeContext";
import SingleProduct from "./SingleProduct";
import TopCollection from "./TopCollection";
import DiscountOffers from "./DiscountOffer";

export const HomeContext = createContext();

const HomeComponent = () => {
  return (
    <Fragment>
      <Slider />
      {/* Category, Search & Filter Section */}
      <section className="m-4 md:mx-8 md:my-6">
        <ProductCategory />
      </section>
      <section>
        <TopCollection/>
      </section>
      {/* Centered Heading */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
          All Products
        </h2>
      </div>
      {/* Product Section */}
      <section className="m-4 md:mx-8 md:my-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      
        <SingleProduct />
      </section>
      <section className="m-4 md:mx-8 md:my-6">
      <DiscountOffers/>
      </section>
    </Fragment>
  );
};

const Home = (props) => {
  const [data, dispatch] = useReducer(homeReducer, homeState);
  return (
    <Fragment>
      <HomeContext.Provider value={{ data, dispatch }}>
        <Layout children={<HomeComponent />} />
      </HomeContext.Provider>
    </Fragment>
  );
};

export default Home;
