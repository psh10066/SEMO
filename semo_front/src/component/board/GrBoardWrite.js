import { useState } from "react";
import GrBoardFrm from "./GrBoardFrm";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const GrBoardWrite = () => {
  //제목,썸네일,내용,첨부파일 -> 전송용 데이터를 담을 state
  const [GrBoardTitle, setGrBoardTitle] = useState("");
  const [GrBoardContent, setGrBoardContent] = useState("");
  const [boardFile, setBoardFile] = useState([]);
  const navigate = useNavigate();

  //글쓰기 버튼 클릭 시 동작할 함수(서버에 insert요청 함수)
  const write = () => {
    if (GrBoardTitle !== "" && GrBoardContent !== "") {
      //기본적인 문자열 또는 숫자데이터를 전송하는 경우 json을 전송
      //파일이 포함되어 있는 경우 => FormData를 사용
      const form = new FormData();
      form.append("GrBoardTitle", GrBoardTitle);
      form.append("GrBoardContent", GrBoardContent);
      const token = window.localStorage.getItem("token");
      axios
        .post("/groupBoard/insert", form, {
          headers: {
            contentType: "multipart/form-data",
            processData: false,
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data > 0) {
            navigate("/groupBoard");
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
      <div className="board-frm-title">게시글</div>
      <GrBoardFrm
        GrBoardTitle={GrBoardTitle}
        setGrBoardTitle={setGrBoardTitle}
        GrBoardContent={GrBoardContent}
        setGrBoardContent={setGrBoardContent}
        buttonEvent={write}
        type="write"
      />
    </div>
  );
};
export default GrBoardWrite;
