import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import { animated } from "@react-spring/three";

export function Tree(props) {
  const group = useRef();

  const { nodes, materials } = useGLTF("./models/tree/tree.gltf");
  return (
    <group>
      <animated.group ref={group} {...props} dispose={null}>
        <mesh geometry={nodes.Tree.geometry} material={materials["wood.005"]}>
          <mesh
            geometry={nodes.Cube004.geometry}
            material={materials["tree.004"]}
          />
          <mesh
            geometry={nodes.Cube008.geometry}
            material={materials["tree.008"]}
          />
          <mesh
            geometry={nodes.Cube012.geometry}
            material={materials["tree.012"]}
          />
          <mesh
            geometry={nodes.Cube.geometry}
            material={materials["tree.001"]}
          />
          <mesh
            geometry={nodes.Cube006.geometry}
            material={materials["tree.006"]}
          />
          <mesh
            geometry={nodes.Cube003.geometry}
            material={materials["tree.003"]}
          />
          <mesh
            geometry={nodes.Cube002.geometry}
            material={materials["tree.002"]}
          />
          <mesh
            geometry={nodes.Cube009.geometry}
            material={materials["tree.009"]}
          />
          <mesh
            geometry={nodes.Cube007.geometry}
            material={materials["tree.007"]}
          />
          <mesh
            geometry={nodes.Cube005.geometry}
            material={materials["tree.005"]}
          />
          <mesh
            geometry={nodes.Cube011.geometry}
            material={materials["tree.011"]}
          />
          <mesh
            geometry={nodes.Cube010.geometry}
            material={materials["tree.010"]}
          />
          <mesh geometry={nodes.Cube025.geometry} material={materials.tree} />
        </mesh>
      </animated.group>
    </group>
  );
}
