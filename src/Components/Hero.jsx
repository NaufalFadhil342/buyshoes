import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import ShoeModel from "./three/ShoeModel";
import StudioLights from "./three/StudioLights";
import { ContactShadows } from "@react-three/drei";
import { colorDrafts } from "../LocalData/hero-helper";

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
      <Canvas
        id="canvas"
        camera={{ position: [0, 0, 7], fov: 50, near: 0.1, far: 100 }}
      >
        <StudioLights />
        <ShoeModel changeColor={currentColor} />
        <ContactShadows
          rotation-x={Math.PI / 2}
          position={[0, -2.25, -0.1]}
          opacity={0.07}
        />
      </Canvas>
      <ul className="flex items-center">
        {colorDrafts.map((color, index) => (
          <li
            key={index}
            className={`size-6 sm:size-8 ${color.colorName === selectedColor ? "border" : "border-none"}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => setSelectedColor(color.colorName)}
          ></li>
        ))}
      </ul>
      <div className="w-auto h-auto mt-8">
        <button className="rounded-full border-none w-auto text-sm sm:text-base h-10 px-4 sm:h-12 sm:px-6 bg-accent text-white font-medium hover:bg-accent-dark hover:cursor-pointer transition-color duration-200 ease-in-out">
          Shop Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
