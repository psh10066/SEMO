import { useGLTF } from "@react-three/drei";
import React, { useRef } from "react";
import { animated } from "@react-spring/three";

export function LampPost(props) {

    const group = useRef();

    const { nodes, materials } = useGLTF("./models/lampPost/lampPost.gltf");
    return (
        <animated.group ref={group} {...props} dispose={null}>

            <mesh geometry={nodes.Cylinder096.geometry} material={materials['Black.012']} />
            <mesh geometry={nodes.Cylinder096_1.geometry} material={materials['Yellow.007']} />

        </animated.group>
    );
}

useGLTF.preload("./models/lampPost/lampPost.gltf");
