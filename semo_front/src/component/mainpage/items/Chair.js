import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import { animated } from "@react-spring/three";

export function Chair(props) {
  const group = useRef();

  const { nodes, materials } = useGLTF("./models/chair/chair.gltf");
  return (
    <group>
      <animated.group ref={group} {...props} dispose={null}>
        <mesh geometry={nodes.bench.geometry} material={materials["metal.004"]}>
          <mesh
            geometry={nodes.Plane001.geometry}
            material={materials["wood.004"]}
          />
          <mesh
            geometry={nodes.Plane005.geometry}
            material={materials["wood.003"]}
          />
          <mesh
            geometry={nodes.Vert001.geometry}
            material={materials["metal.003"]}
          />
        </mesh>
      </animated.group>
    </group>
  );
}
