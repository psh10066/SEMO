import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./mypage.css";

const Myinfo = () => {
  const navigate = useNavigate();

  const modifyMyinfo = () => {
    navigate("/mypage/modifyMyInfo");
  };
  const modifyMyFeed = () => {
    navigate("/mypage/modifyMyFeed");
  };
  const modifyMyLike = () => {
    navigate("/mypage/modifyMyLike");
  };
  return (
    <>
      <div className="mypage-form">
        <div className="mypage-buttons">
          <div className="mypage-myfeed edit">
            <div className="textb" onClick={modifyMyinfo}>
              내 정보 수정
            </div>
          </div>
          <div className="mypage-myfeed edit">
            <div className="textb" onClick={modifyMyFeed}>
              내 피드 수정
            </div>
          </div>
          <div className="mypage-myfeed edit">
            <div className="textb" onClick={modifyMyLike}>
              내 관심사·지역 수정
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Myinfo;
