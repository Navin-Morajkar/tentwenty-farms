import Header from "../components/layout/Header";
import Hero from "../components/sections/Hero";
import ProductShowcase from "../components/sections/ProductShowcase";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex-1 h-full bg-amber-200">
        <Hero />
        <ProductShowcase />
      </main>
    </>
  );
}
