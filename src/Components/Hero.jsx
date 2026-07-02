import { lazy, useState } from "react";
import { colorDrafts } from "../LocalData/hero-helper";
import { Loading } from "./ui/Loading";
import LazyOnVisible from "./LazyOnVisible";

const ShoeCanvas = lazy(() => import("../Components/model/ShoeCanvas"));

const Hero = () => {
  const [selectedColor, setSelectedColor] = useState("white");

  const currentColor = colorDrafts.find(
    (c) => c.colorName === selectedColor,
  )?.hex;

  return (
    <section id="hero">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl text-primary font-bold text-center max-w-[90%] sm:max-w-[70%] lg:max-w-[50%] leading-normal mx-auto relative z-10">
        Gear Up <span className="text-accent">Every</span> Season{" "}
        <span className="text-accent">Every</span> Activities
      </h1>
      <LazyOnVisible
        fallback={<Loading />}
        className="w-full h-[60vh] flex justify-center"
        rootMargin="200px"
      >
        <ShoeCanvas currentColor={currentColor} />
      </LazyOnVisible>
      <ul className="flex items-center">
        {colorDrafts.map((color, index) => (
          <li
            key={index}
            className={`size-6 sm:size-8 ${color.colorName === selectedColor ? "border border-primary" : "border-none"}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => setSelectedColor(color.colorName)}
          ></li>
        ))}
      </ul>
      <div className="w-auto h-auto mt-8">
        <button className="rounded-full border-none w-auto text-sm sm:text-base h-10 px-4 sm:h-12 sm:px-6 bg-accent text-white font-medium hover:bg-accent-hover hover:cursor-pointer transition-color duration-200 ease-in-out">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
