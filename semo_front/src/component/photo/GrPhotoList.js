import ".grPhoto.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../common/Pagination";
import { Button1 } from "../util/Buttons";
import { useNavigate } from "react-router-dom";
const GrPhotoList = (props) => {
  const isLogin = props.isLogin;
  const [grPhotoList, setGrPhotoList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  console.log(isLogin);
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    axios
      .get("/groupPhoto/list/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setGrPhotoList(res.data.groupPhotoList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);
  const navigate = useNavigate();
  const write = () => {
    navigate("write");
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
        {grPhotoList.map((photo, index) => {
          return <PhotoItem key={"photo" + index} photo={photo} />;
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
  const photo = props.photo;
  const navigate = useNavigate();
  const photoView = () => {
    navigate("/photo/view", { state: { photoNo: photo.photoNo } });
  };
  return (
    <div className="photo-item" onClick={photoView}>
      <div className="photo-item-img">
        {photo.photoImg === null ? (
          <img src="/img/default.png" />
        ) : (
          <img src={"/photo/" + photo.photoImg} />
        )}
      </div>
      <div className="photo-item-info">
        <div className="photo-item-title">{photo.photoTitle}</div>
      </div>
    </div>
  );
};
export default GrPhotoList;
