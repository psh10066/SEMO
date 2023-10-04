import { Carousel } from "./Carousel";
import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Depth, LayerMaterial } from "lamina";
import { useRef } from "react";
import * as THREE from "three";
import { ContactShadows } from "@react-three/drei";





const BG_SPEED = 0.3;

const Background = () => {
  const ref = useRef();

  useFrame((_state, delta) => {
    ref.current.rotation.x =
      ref.current.rotation.y =
      ref.current.rotation.z +=
        delta * BG_SPEED;
  });

  return (
    <mesh scale={100} ref={ref}>
      <sphereGeometry args={[1, 64, 64]} />
      <LayerMaterial side={THREE.BackSide}>
      <Depth
          colorA="#5457E9"
          colorB="#8BB4FF"
          alpha={1}
          mode="normal"
          near={150}
          far={400}
          origin={[100, 100, -100]}
        />
      </LayerMaterial>
    </mesh>
  );
};


export const Experience = () => {
  
  return (
    <>
      <OrbitControls enableZoom={false}/>
      <ContactShadows scale={30} opacity={0.32} />
      <ambientLight intensity={1} />
      <directionalLight
        position={[4, 5, 6]}
        intensity={3}
        color={"#000000"}
      />

      <directionalLight
        position={[-4, 5, 6]}
        intensity={2}
        color={"#ffffff"}
      />
    
      <Carousel />


      <Background />
    
    </>
  );
};
