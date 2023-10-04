import { Route, Routes } from "react-router-dom";
import "./grPhoto.css";
import GrPhotoList from "./GrPhotoList";
import GrPhotoWrite from "./GrPhotoWrite";
import GrPhotoView from "./GrPhotoView";

const GrPhotoMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  return (
    <div className="photo-all-wrap">
      <div className="photo-title">나의 모임 사진첩</div>
      <Routes>
        <Route path="view" element={<GrPhotoView />} />
        <Route path="write" element={<GrPhotoWrite />} />
        <Route path="*" element={<GrPhotoList />}></Route>
      </Routes>
    </div>
  );
};

export default GrPhotoMain;
