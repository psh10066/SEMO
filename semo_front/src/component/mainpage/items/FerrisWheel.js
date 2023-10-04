import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import { animated } from "@react-spring/three";

export function FerrisWheel(props) {

    const group = useRef();


  const { nodes, materials } = useGLTF("./models/ferrisWheel/ferriswheel.gltf");
  return (
     <animated.group ref={group} {...props} dispose={null}>
      <mesh
        geometry={nodes.Ferris_Wheel.geometry}
        material={materials["Ferris_Wheel_Material"]}
      />
    </animated.group>
  );
}

useGLTF.preload("./models/ferrisWheel/ferriswheel.gltf");
