import "./circle.css";
import { Experience } from "./Experience";
import { Canvas } from "@react-three/fiber";
import MainSearch from "./search/MainSearch";

const Mainpage = () => {
  return (
    <div>
      <div className="circle">
        <Canvas shadows camera={{ position: [0, 16, 42], fov: 30 }}>
          <Experience />
        </Canvas>
      </div>
      <MainSearch />
    </div>
  );
};

export default Mainpage;
