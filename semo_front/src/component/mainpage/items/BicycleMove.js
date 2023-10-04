import { Bicycle } from "./Bicycle";
import React, { useState, useEffect } from 'react';

const BycircleMove = () => {
    const [angle, setAngle] = useState(0);
    const radius = 8; // 원의 반지름을 정의합니다.
    const speed = 0.034; // 회전 속도를 정의합니다.
    const yPosition = 2; // y축 위치를 정의합니다.
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setAngle((prev) => prev + speed);
      }, 1000 / 60); // 초당 약 60프레임 속도로 움직입니다.
  
      return () => clearInterval(intervalId); // 컴포넌트가 언마운트되면 인터벌을 정리합니다.
    }, []);
  
    // 원 주위를 도는 x 및 z 위치를 계산합니다.
    const xPosition = radius * Math.cos(angle);
    const zPosition = radius * Math.sin(angle);
   // 원의 중심부터 자전거까지의 각도를 계산합니다.
    const rotationY = Math.atan2(xPosition, zPosition) + Math.PI ;

    return (
      <Bicycle
        position={[xPosition, yPosition, zPosition]}
        scale={[1.5, 1.5, 1.5]}
        rotation-y={rotationY}
      />
    );
  };
  
  export default BycircleMove;