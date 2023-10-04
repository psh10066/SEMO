import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import { animated } from "@react-spring/three";

export function Heart(props) {

    const group = useRef();

    const { nodes, materials } = useGLTF("./models/heart/heart.gltf");
    return (
        <animated.group ref={group} {...props} dispose={null}>

            <mesh geometry={nodes.heart_teamRed.geometry} material={materials['Red.015']} rotation={[Math.PI / 2, 0, 0,]} />


        </animated.group>
    );
}

useGLTF.preload("./models/heart/heart.gltf");
