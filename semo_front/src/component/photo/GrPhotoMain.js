import { Route, Routes } from "react-router-dom";
import "./grPhoto.css";
import GrPhotoList from "./GrPhotoList";
import GrPhotoWrite from "./GrPhotoWrite";
import GrPhotoView from "./GrPhotoView";
import GrPhotoModify from "./GrPhotoModify";

const GrPhotoMain = (props) => {
  const isLogin = props.isLogin;
  const setIsLogin = props.setIsLogin;
  return (
    <div className="photo-all-wrap">
      <div className="photo-title">나의 모임 사진첩</div>
      <Routes>
        <Route path="view" element={<GrPhotoView isLogin={isLogin} />} />
        <Route path="write" element={<GrPhotoWrite />} />
        <Route path="modify" element={<GrPhotoModify />} />
        <Route path="*" element={<GrPhotoList isLogin={isLogin} />}></Route>
      </Routes>
    </div>
  );
};

export default GrPhotoMain;
