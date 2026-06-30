import { Canvas } from "@react-three/fiber";
import StudioLights from "../three/StudioLights";
import ShoeModel from "../three/ShoeModel";
import { ContactShadows } from "@react-three/drei";

const ShoeCanvas = ({ currentColor }) => {
  return (
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
  );
};

export default ShoeCanvas;
