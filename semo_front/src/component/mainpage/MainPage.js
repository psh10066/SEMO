import React, { useState, useEffect } from "react";
import { Experience } from "./Experience";
import { Canvas } from "@react-three/fiber";
import Black from "./Black";
import "./mainpage.css";
import { Fade, Zoom } from "react-awesome-reveal";

const Mainpage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingUp, setIsScrollingUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const circleStyle = {
    opacity: Math.max(1 - scrollY / window.innerHeight, 0),
    backgroundColor: `rgba(0, 0, 0, ${Math.min(
      scrollY / window.innerHeight,
      1
    )})`,
  };

  return (
    <div className="mainpage">
      <Fade in={isScrollingUp}>
        <div className="circle">
          <Canvas
            shadows
            camera={{ position: [0, 16, 42], fov: 30 }}
            style={circleStyle}
          >
            <Experience />
          </Canvas>
        </div>
      </Fade>

      <div className="black">
        <Black />
      </div>
    </div>
  );
};

export default Mainpage;
