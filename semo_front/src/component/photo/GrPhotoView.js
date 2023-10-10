import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button2 } from "../util/Buttons";
import Swal from "sweetalert2";

const GrPhotoView = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  const grPhotoNo = location.state.grPhotoNo;
  const [grPhoto, setGrPhoto] = useState({});
  //회원정보 가져오기 위해서
  const [member, setMember] = useState(null);
  const navigate = useNavigate();
  //게시판정보
  useEffect(() => {
    axios
      .get("/groupPhoto/view/" + grPhotoNo)
      .then((res) => {
        console.log(res.data);
        setGrPhoto(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
    if (isLogin) {
      const token = window.localStorage.getItem("token");
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          setMember(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, []);
  //게시판 상세정보 수정
  const modify = () => {
    navigate("/groupPhoto/modify", { state: { grPhoto: grPhoto } });
  };
  //게시판 상세정보 삭제
  const deletePhoto = () => {
    Swal.fire({
      icon: "warning",
      text: "게시글을 삭제하시겠습니까",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/groupPhoto/delete/" + grPhoto.grPhotoNo)
          .then((res) => {
            console.log(res.data);
            if (res.data === 1) {
              navigate("/groupPhoto");
            }
          })
          .catch((res) => {
            console.log(res.response.status);
          });
      }
    });
  };
  return (
    <div className="photo-view-wrap">
      <div className="photo-view-title">{grPhoto.grPhotoNo}</div>
      <div className="photo-view-info">
        <div>{grPhoto.memberId}</div>
        <div>{grPhoto.grPhotodDate}</div>
      </div>
      <div className="photo-view-thumbnail">
        {grPhoto.grPhotoImg ? (
          <img src={"/photo/" + grPhoto.grPhotoImg} />
        ) : (
          <img src="/img/default.png" />
        )}
      </div>
      <div
        className="photo-view-detail"
        dangerouslySetInnerHTML={{ __html: grPhoto.grPhotoContent }}
      ></div>
      <div className="photo-view-btn-zone">
        {isLogin ? (
          member && member.memberNo === grPhoto.grPhotoWriter ? (
            <>
              <Button2 text="수정" clickEvent={modify} />
              <Button2 text="삭제" clickEvent={deletePhoto} />
            </>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
export default GrPhotoView;
