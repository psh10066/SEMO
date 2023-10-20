import { useEffect, useState } from "react";
import "./grPhoto.css";
import axios from "axios";
import Pagination from "../common/Pagination";
import { Button1 } from "../util/Buttons";
import { useLocation, useNavigate } from "react-router-dom";

const GrPhotoList = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const [grPhotoList, setGrPhotoList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const groupNo = location.state.groupNo;
  useEffect(() => {
    axios
      .get("/groupPhoto/list/" + groupNo + "/" + reqPage)
      .then((res) => {
        setGrPhotoList(res.data.groupPhotoList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);
  const navigate = useNavigate();
  const write = () => {
    navigate("write", { state: { groupNo: groupNo } });
  };
  return (
    <div>
      {isLogin ? (
        <div className="photo-write-btn">
          <Button1 text="글쓰기" clickEvent={write} />
        </div>
      ) : (
        ""
      )}
      <div className="photo-list-wrap">
        {grPhotoList.map((grPhoto, index) => {
          return <PhotoItem key={"grPhoto" + index} grPhoto={grPhoto} />;
        })}
      </div>
      {/* 게시물 페이징 */}
      <div className="photo-page">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </div>
  );
};
const PhotoItem = (props) => {
  const grPhoto = props.grPhoto;
  const navigate = useNavigate();
  const photoView = () => {
    navigate("/group/groupPhoto/view", {
      state: { grPhotoNo: grPhoto.grPhotoNo },
    });
  };
  return (
    <div className="photo-item" onClick={photoView}>
      <div className="photo-item-img">
        {grPhoto.grPhotoImg === null ? (
          <img src="/image/photo.png" />
        ) : (
          <img src={"/groupPhoto/" + grPhoto.grPhotoImg} />
        )}
      </div>
    </div>
  );
};
export default GrPhotoList;
