import Hero from "./Components/Hero";
import ProductCategories from "./Components/ProductCategories";
import Promotion from "./Components/Promotion";
import Shopping from "./Components/Shopping";
import ProductInterested from "./Components/Interested";

function App() {
  return (
    <div className="w-full h-auto">
      <Hero />
      <ProductCategories />
      <Promotion />
      <Shopping />
      <ProductInterested />
    </div>
  );
}

export default App;
