import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import "./mainpage.css";

const Black = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isCursorVisible, setIsCursorVisible] = useState(false); // 원 보이는지 안보이는지
  const blackRef = useRef(null);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const blackElement = blackRef.current;
    if (blackElement) {
      blackElement.addEventListener("mousemove", mouseMove); // ref를 사용하여 이벤트 리스너를 추가
      return () => {
        blackElement.removeEventListener("mousemove", mouseMove); // 이벤트 리스너를 제거
      };
    }
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 300,
      width: 300,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "#fff",
      mixBlendMode: "difference",
    },
  };

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  return (
    <div
      className="black"
      ref={blackRef}
      onMouseEnter={() => setIsCursorVisible(true)} // 마우스가 컴포넌트 안으로 들어왔을 때 원
      onMouseLeave={() => setIsCursorVisible(false)} // 마우스가 컴포넌트 밖으로 나갔을 때 원
    >
      <div>
        <h1
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
          className="black-title"
        >
          당신의 취향을<br></br>
          찾아보세요!
        </h1>
        <h3
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
          className="black-subTitle"
        >
          세상의 모든 모임 SEMOMO
        </h3>
      </div>
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
        style={{ display: isCursorVisible ? "block" : "none" }} // 원의 가시성을 제어합니다.
      />
    </div>
  );
};

export default Black;
