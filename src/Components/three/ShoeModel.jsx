import { Bounds, Center, OrbitControls } from "@react-three/drei";
import { Shoes } from "../model/Shoes";

const ShoeModel = ({ changeColor }) => {
  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minDistance={2}
        maxDistance={10}
      />
      <Bounds fit clip observe margin={1}>
        <Center>
          <group rotation={[0.2, Math.PI / -2, 0]}>
            <Shoes changeColor={changeColor} />
          </group>
        </Center>
      </Bounds>
    </>
  );
};

export default ShoeModel;
