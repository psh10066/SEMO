import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GrBoardFrm from "./GrBoardFrm";
import Swal from "sweetalert2";
import axios from "axios";

const GrBoardWrite = () => {
  const location = useLocation();
  const groupNo = location.state.groupNo;
  //전송용 데이터를 담을 state
  const [grBoardTitle, setGrBoardTitle] = useState("");
  const [grBoardContent, setGrBoardContent] = useState("");
  const navigate = useNavigate();

  //글쓰기 버튼 클릭 시 동작할 함수(서버에 insert요청 함수)
  const write = () => {
    if (grBoardTitle !== "" && grBoardContent !== "") {
      //기본적인 문자열 또는 숫자데이터를 전송하는 경우 json을 전송
      //파일이 포함되어 있는 경우 => FormData를 사용
      const form = new FormData();
      form.append("grBoardTitle", grBoardTitle);
      form.append("grBoardContent", grBoardContent);
      form.append("groupNo", groupNo);
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
          if (res.data > 0) {
            Swal.fire("등록이 완료되었습니다.");
            navigate("/group/groupBoard", {
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
      <GrBoardFrm
        grBoardTitle={grBoardTitle}
        setGrBoardTitle={setGrBoardTitle}
        grBoardContent={grBoardContent}
        setGrBoardContent={setGrBoardContent}
        buttonEvent={write}
        type="write"
      />
    </div>
  );
};
export default GrBoardWrite;
