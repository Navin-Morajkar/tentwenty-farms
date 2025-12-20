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
      <div className="w-full min-h-screen bg-white">
        <Header />

        <Hero />

        <Products />
      </div>
    </>
  );
};

export default Home;
