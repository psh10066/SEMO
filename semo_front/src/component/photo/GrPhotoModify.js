import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PhotoFrm from "./GrPhotoFrm";
import axios from "axios";
import Swal from "sweetalert2";

const GrPhotoModify = () => {
  const location = useLocation();
  const grPhoto = location.state.grPhoto;
  console.log(grPhoto);
  //제목,썸네일,내용,첨부파일 -> 전송용 데이터를 담을 state
  const [grPhotoTitle, setGrPhotoTitle] = useState(grPhoto.grPhotoTitle);
  const [thumbnail, setThumbnail] = useState({});
  const [grPhotoContent, setGrPhotoContent] = useState(grPhoto.grPhotoContent);
  const [grPhotoFile, setGrPhotoFile] = useState([]);
  const [grPhotoImg, setGrPhotoImg] = useState(grPhoto.grPhotoImg);
  const [delFileNo, setDelFileNo] = useState([]); //삭제파일용(추가)

  const navigate = useNavigate();

  //수정하기 클릭시 동작할 함수
  const modify = () => {
    const form = new FormData();
    form.append("grPhotoNo", grPhoto.grPhotoNo);
    form.append("grPhotoTitle", grPhotoTitle);
    form.append("grPhotoContent", grPhotoContent);
    form.append("grPhotoImg", grPhotoImg);
    form.append("thumbnail", thumbnail);
    for (let i = 0; i < grPhotoFile.length; i++) {
      form.append("grPhotoFile", grPhotoFile[i]);
    }
    //join 문자열로 합치기
    form.append("delFileNo", delFileNo.join("/"));
    const token = window.localStorage.getItem("token");
    axios
      .post("/groupPhoto/modify", form, {
        headers: {
          contentType: "muitlpart/form-data",
          processDate: false,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          Swal.fire("수정이 완료되었습니다.");
          navigate("/group/groupPhoto");
        } else {
          Swal.fire(
            "수정 중 문제가 발생하였습니다. 잠시 후 다시 시도해주세요."
          );
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  return (
    <div>
      <PhotoFrm
        grPhotoTitle={grPhotoTitle}
        setGrPhotoTitle={setGrPhotoTitle}
        grPhotoContent={grPhotoContent}
        setGrPhotoContent={setGrPhotoContent}
        thumbnail={thumbnail}
        setThumbnail={setThumbnail}
        grPhotoFile={grPhotoFile}
        setGrPhotoFile={setGrPhotoFile}
        grPhotoImg={grPhotoImg}
        setGrPhotoImg={setGrPhotoImg}
        buttonEvent={modify}
        delFileNo={delFileNo}
        setDelFileNo={setDelFileNo}
        type="modify"
      />
    </div>
  );
};
export default GrPhotoModify;
