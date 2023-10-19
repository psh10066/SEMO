import React, { useState, useEffect, useRef } from "react";
import { Experience } from "./Experience";
import { Canvas } from "@react-three/fiber";
import Black from "./Black";
import "./mainpage.css";
import { Fade } from "react-awesome-reveal";
import { BsCaretDownFill } from "react-icons/bs";
import PopularGroup from "./PopularGroup";

const Mainpage = () => {
  const [isLoading, setIsLoading] = useState(true); // 로딩중..

  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 클리어 > 로딩 끝
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrollingUp(currentScrollY < lastScrollY); //스크롤 위로 올리기
      setLastScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const circleStyle = {
    opacity: Math.max(1 - scrollY / window.innerHeight, 0),
  };

  const blackRef = useRef(null);
  const scrollToBlack = () => {
    if (blackRef.current) {
      blackRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (isLoading) {
    return <div className="loading-main">로딩중...</div>;
  }

  return (
    <div className="mainpage">
      <Fade in={isScrollingUp}>
        <div className="circle-main">
          <Canvas
            shadows
            camera={{ position: [0, 16, 42], fov: 30 }}
            style={circleStyle}
          >
            <Experience />
          </Canvas>
        </div>
        <div className="scroll-icon">
          <BsCaretDownFill
            size={85}
            style={circleStyle}
            onClick={scrollToBlack}
          />
        </div>
      </Fade>

      <div className="black-main" ref={blackRef}>
        <Black />
      </div>
      <div className="popular-main">
        <PopularGroup />
      </div>
      <div className="local-main"></div>
    </div>
  );
};

export default Mainpage;
