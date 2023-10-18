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
  const [grPhotoContentHtml, setGrPhotoContentHtml] = useState("");
  const navigate = useNavigate();
  //게시판정보
  useEffect(() => {
    axios
      .get("/groupPhoto/view/" + grPhotoNo)
      .then((res) => {
        console.log(res.data);
        setGrPhoto(res.data);
        setGrPhotoContentHtml(
          res.data.grPhotoContent.replaceAll("\r\n", "<br>")
        );
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
    navigate("/group/groupPhoto/modify", { state: { grPhoto: grPhoto } });
  };
  //게시판 상세정보 삭제
  const deletePhoto = () => {
    Swal.fire({
      icon: "warning",
      text: "게시글을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios
          .get("/groupPhoto/delete/" + grPhoto.grPhotoNo)
          .then((res) => {
            console.log(res.data);
            if (res.data === 1) {
              Swal.fire("삭제가 완료되었습니다.");
              navigate("/group/groupPhoto");
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
      <table className="photo-view-table">
        <tbody>
          <tr>
            <th className="photo-view-info">제목</th>
            <td className="photo-view-info-content">{grPhoto.grPhotoTitle}</td>
          </tr>
          <tr>
            <th className="photo-view-info">이미지</th>
            <td className="photo-view-thumbnail">
              {grPhoto.grPhotoImg ? (
                <img src={"/groupPhoto/" + grPhoto.grPhotoImg} />
              ) : (
                <img src="/image/photo.png" />
              )}
            </td>
          </tr>
          <tr>
            <th className="photo-view-info">내용</th>
            <td
              className="photo-view-info-content"
              dangerouslySetInnerHTML={{ __html: grPhotoContentHtml }}
            ></td>
          </tr>
        </tbody>
      </table>
      <div className="photo-view-btn-zone">
        {isLogin ? (
          member && member.memberNo === grPhoto.memberNo ? (
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
