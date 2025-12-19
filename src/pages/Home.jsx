import React from "react";
import Header from "../components/layout/Header";
import Hero from "../components/sections/Hero";
import Products from "../components/sections/Products";

const Home = () => {
  return (
    <div className="home-container">
      <Header />

      {/* 1. Hero Section (Relative, 100vh) */}
      <Hero />

      {/* 2. Products Section (Flows naturally below) */}
      <Products />

      <style>{`
        .home-container {
          width: 100%;
          /* No fixed height here, let content dictate height */
          background-color: #fff;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Home;
