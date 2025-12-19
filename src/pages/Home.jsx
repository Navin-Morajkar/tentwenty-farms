import { useState } from "react";
import Header from "../components/layout/Header";
import Hero from "../components/sections/Hero";
import Products from "../components/sections/Products";
import Preloader from "../components/ui/Preloader";

const Home = () => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <div className="home-container">
        <Header />

        <Hero />

        <Products />

        <style>{`
        .home-container {
            width: 100%;
            background-color: #fff;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            }
            `}</style>
      </div>
    </>
  );
};

export default Home;
