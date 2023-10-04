import "./circle.css";
import { Experience } from "./Experience";
import { Canvas } from "@react-three/fiber";

const Mainpage = () => {
  return (
    <div className="circle">
      <Canvas shadows camera={{ position: [0, 16, 42], fov: 30 }}>
        <Experience />
      </Canvas>
    </div>
  );
};

export default Mainpage;
