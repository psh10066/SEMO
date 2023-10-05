import "./circle.css";
import { Experience } from "./Experience";
import { Canvas } from "@react-three/fiber";
import Black from "./black/Black";

const Mainpage = () => {
  return (
    <div className="mainpage">
      <div className="circle">
        <Canvas shadows camera={{ position: [0, 16, 42], fov: 30 }}>
          <Experience />
        </Canvas>
      </div>
      <Black />
    </div>
  );
};

export default Mainpage;
