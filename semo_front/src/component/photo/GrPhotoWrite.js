import { useState } from "react";
import GrPhotoFrm from "./GrPhotoFrm";
import Swal from "sweetalert2";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const GrPhotoWrite = () => {
  const location = useLocation();
  const groupNo = location.state.groupNo;
  const [grPhotoTitle, setGrPhotoTitle] = useState("");
  const [thumbnail, setThumbnail] = useState({});
  const [grPhotoContent, setGrPhotoContent] = useState("");
  const [grPhotoFile, setGrPhotoFile] = useState([]);
  const [grPhotoImg, setGrPhotoImg] = useState(null);
  const navigate = useNavigate();

  const write = () => {
    if (grPhotoTitle !== "" && grPhotoContent !== "") {
      const form = new FormData();
      form.append("grPhotoTitle", grPhotoTitle);
      form.append("grPhotoContent", grPhotoContent);
      form.append("grPhotoImg", grPhotoImg);
      form.append("thumbnail", thumbnail); //첨부파일을 전송하는 경우 File객체를 전송
      form.append("groupNo", groupNo);
      const token = window.localStorage.getItem("token");
      axios
        .post("/groupPhoto/insert", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data > 0) {
            Swal.fire("등록이 완료되었습니다.");
            navigate("/group/groupPhoto", {
              state: { groupNo: groupNo },
            });
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire("내용을 입력하세요.");
    }
  };
  return (
    <div>
      <GrPhotoFrm
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
        buttonEvent={write}
        type="write"
      />
    </div>
  );
};
export default GrPhotoWrite;
