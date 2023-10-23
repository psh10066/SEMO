import { useEffect, useState } from "react";
import "./grPhoto.css";
import axios from "axios";
import Pagination from "../common/Pagination";
import { Button1 } from "../util/Buttons";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const GrPhotoList = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const [grPhotoList, setGrPhotoList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const groupNo = location.state.groupNo;
  const [groupLevel, setGroupLevel] = useState(0);

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

  useEffect(() => {
    if (isLogin) {
      const token = window.localStorage.getItem("token");
      axios
        .post(
          "/group/groupLevelState",
          { groupNo },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          setGroupLevel(res.data);
        });
    }
  }, []);

  const navigate = useNavigate();
  const write = () => {
    navigate("write", { state: { groupNo: groupNo } });
  };
  return (
    <div>
      {isLogin && (groupLevel === 1 || groupLevel === 2) ? (
        <div className="photo-write-btn">
          <Button1 text="글쓰기" clickEvent={write} />
        </div>
      ) : (
        ""
      )}
      <div className="photo-list-wrap">
        {grPhotoList.map((grPhoto, index) => {
          return (
            <PhotoItem
              key={"grPhoto" + index}
              grPhoto={grPhoto}
              isLogin={isLogin}
              groupLevel={groupLevel}
            />
          );
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
  const isLogin = props.isLogin;
  const groupLevel = props.groupLevel;
  const navigate = useNavigate();
  const photoView = () => {
    if (isLogin && (groupLevel === 1 || groupLevel === 2)) {
      navigate("/group/groupPhoto/view", {
        state: { grPhotoNo: grPhoto.grPhotoNo },
      });
    } else {
      Swal.fire("가입한 멤버만 확인이 가능합니다.");
    }
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
