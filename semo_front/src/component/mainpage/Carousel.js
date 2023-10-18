import { animated, useSpring } from "@react-spring/three";
import { VolleyBall } from "../mainpage/items/VolleyBall";
import { Book } from "../mainpage/items/Book";
import BycircleMove from "../mainpage/items/BicycleMove";
import { Tree } from "../mainpage/items/Tree";
import { Chair } from "../mainpage/items/Chair";
import { CarouselLights } from "./CarouselLight";

export const STEP_DURATION = 1000;

export const Carousel = (props) => {
  const { carouselRotation, currentStep } = useSpring({
    from: {
      carouselRotation: 0,
      currentStep: 0,
    },
    to: [
      {
        carouselRotation: -Math.PI / 2,
        delay: STEP_DURATION,
        currentStep: 1,
      },
      {
        carouselRotation: -Math.PI,
        delay: STEP_DURATION,
        currentStep: 2,
      },
      {
        carouselRotation: -1.5 * Math.PI,
        delay: STEP_DURATION,
        currentStep: 3,
      },
      {
        carouselRotation: -2 * Math.PI,
        delay: STEP_DURATION,
        currentStep: 0,
      },
    ],
    config: {
      mass: 5,
      tension: 400,
      friction: 50,
    },
    loop: true,
    immediate: true,
  });

  return (
    <>
      <group
        scale={[0.9, 0.9, 0.9]}
        rotation-y={-Math.PI / 4}
        position-y={-0.01}
      >
        <animated.group rotation-y={carouselRotation}>
          <CarouselLights currentStepSpring={currentStep} />
          <mesh position={[0, -2, 0]}>
            <meshStandardMaterial color="#FFFF39" />
            <cylinderGeometry args={[11, 11, 1.5, 64]} />
          </mesh>
          <mesh scale={[1, 6, 24]} position-y={3}></mesh>
          <mesh scale={[24, 6, 1]} position-y={3}></mesh>

          <>
            <VolleyBall />
            <BycircleMove />
            <Tree
              position={[-5, 1, -2]}
              scale={[4, 4.5, 4]}
              rotation-y={Math.PI}
            />
            <Chair position={[3, 0, -3.5]} scale={[2, 2, 2]} rotation-y={0} />
            <Book position={[2, 7, -3]} scale={[4, 4, 4]} rotation-y={0} />
          </>
        </animated.group>
      </group>
    </>
  );
};

export default Carousel;
