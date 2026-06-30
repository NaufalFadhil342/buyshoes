import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export function Shoes(props) {
  const { nodes, materials } = useGLTF("/assets/shoes-transformed.glb");
  const shoeRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    shoeRef.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
    shoeRef.current.rotation.x = Math.cos(t / 4) / 8;
    shoeRef.current.rotation.y = Math.sin(t / 4) / 8;
    shoeRef.current.rotation.y = (1 + Math.sin(t / 1.5)) / 10;
  });

  return (
    <group {...props} dispose={null} ref={shoeRef}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials.material_0}
        material-color={props.changeColor}
        rotation={[-Math.PI, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("/assets/shoes-transformed.glb");
