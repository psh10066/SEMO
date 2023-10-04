import { useSpring } from "@react-spring/three";
import Duck from "./characters/Duck";
import { BeachBall } from "./BeachBall";

export const VolleyBall = (props) => {
  const { beachBallPosition } = useSpring({
    from: {
      beachBallPosition: 0,
    },
    to: [
      {
        beachBallPosition: 1,
      },
      {
        beachBallPosition: 2,
      },
    ],
    config: {
      mass: 2,
      tension: 170,
      friction: 36,
    },
    loop: true,
  });

  const ballY = beachBallPosition.to([0, 0.5, 1, 1.5, 2], [5, 7, 5, 7, 5]);
  const ballX = beachBallPosition.to([0, 1, 2, 3], [-2, 4, -2]);
  const duck1Jump = beachBallPosition.to([0, 0.4, 0.7, 2], [0, 0.3, 0, 0]);
  const duck2Jump = beachBallPosition.to(
    [0, 1, 1.4, 1.7, 2],
    [0, 0, 0.3, 0, 0]
  );

  return (
    <group {...props}>
      <BeachBall
        scale={[1, 1, 1]}
        position-x={ballX}
        position-y={ballY}
        position-z={3}
      />
      <Duck
        color={"skyblue"}
        scale={[2.5, 2.5, 2.5]}
        position={[-2, 0, 3]}
        rotation-y={Math.PI / 2}
        position-y={duck1Jump}
      />
      <Duck
        color={"pink"}
        scale={[2.5, 2.5, 2.5]}
        position={[4.5, 0, 3]}
        rotation-y={-Math.PI / 2}
        position-y={duck2Jump}
      />
    </group>
  );
};
