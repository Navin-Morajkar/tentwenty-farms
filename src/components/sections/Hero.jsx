export default function Hero() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <h1 className="text-4xl font-bold">Build better experiences faster</h1>

        <p className="mt-6 max-w-xl text-lg">
          A short value proposition that clearly explains what this product or
          service does.
        </p>

        <div className="mt-8 flex gap-4">
          <button className="px-6 py-3 bg-black text-white">Get Started</button>
          <button className="px-6 py-3 border">Learn More</button>
        </div>
      </div>
    </section>
  );
}
