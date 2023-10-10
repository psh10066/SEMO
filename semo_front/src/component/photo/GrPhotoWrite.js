import { useState } from "react";
import PhotoFrm from "./GrPhotoFrm";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BoardWrite = () => {
  //제목,썸네일,내용,첨부파일 -> 전송용 데이터를 담을 state
  const [grPhotoTitle, setGrPhotoTitle] = useState("");
  const [thumbnail, setThumbnail] = useState({});
  const [grPhotoContent, setGrPhotoContent] = useState("");
  const [grPhotoFile, setGrPhotoFile] = useState([]);
  //boardImg -> 썸네일 미리보기용, fileList -> 첨부파일 목록 출력용
  const [grPhotoImg, setGrPhotoImg] = useState(null);
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  //글쓰기 버튼 클릭 시 동작할 함수(서버에 insert요청 함수)
  const write = () => {
    if (grPhotoTitle !== "" && grPhotoContent !== "") {
      //기본적인 문자열 또는 숫자데이터를 전송하는 경우 json을 전송
      //파일이 포함되어 있는 경우 => FormData를 사용
      const form = new FormData();
      form.append("grPhotoTitle", grPhotoTitle);
      form.append("grPhotoContent", grPhotoContent);
      form.append("thumbnail", thumbnail); //첨부파일을 전송하는 경우 File객체를 전송
      //첨부파일이 여러개인 경우(multiple인 경우 -> 같은 이름으로 첨부파일이 여러개인 경우)
      for (let i = 0; i < grPhotoFile.length; i++) {
        form.append("grPhotoFile", grPhotoFile[i]);
      }
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
            navigate("/groupPhoto");
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire("입력값을 확인하세요.");
    }
  };
  return (
    <div>
      <div className="board-frm-title">게시글 작성</div>
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
        fileList={fileList}
        setFileList={setFileList}
        buttonEvent={write}
        type="write"
      />
    </div>
  );
};
export default BoardWrite;
