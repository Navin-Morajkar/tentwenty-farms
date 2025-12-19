import Header from "../components/layout/Header";
import Hero from "../components/sections/Hero";

const Home= ()=> {
  return (
    <>
      <div className="home-container">
        <Header />
        <Hero />

        <style>{`
        .home-container {
            position: relative;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            background-color: #f4f4f4;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            }
            `}</style>
      </div>
    </>
  );
}

export default Home