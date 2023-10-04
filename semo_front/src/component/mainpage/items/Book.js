import { animated, useSpring } from "@react-spring/three";
import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";

export function Book(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("./models/book/book.gltf");

  const { shelfPosition, booksScale } = useSpring({
    from: {
      shelfPosition: [0, 0, 0],
      booksScale: 0,
    },
    to: [
      {
        shelfPosition: [0, 0.3, 0],
        booksScale: 1,
      },
      {
        shelfPosition: [0, 0, 0],
      },
    ],
    config: {
      mass: 5,
      tension: 100,
      friction: 40,
    },
    loop: true,
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <animated.group rotation={[Math.PI / -3, 0, 0]} position={shelfPosition}>
        <mesh
          geometry={nodes.Cube012.geometry}
          material={materials["White.040"]}
        />
        <mesh
            geometry={nodes.Cube012_1.geometry}
            material={materials["Brown.018"]}
          />

        <animated.group
          scale-x={booksScale}
          scale-y={booksScale}
          scale-z={booksScale}
        >

        </animated.group>
      </animated.group>
    </group>
  );
}
