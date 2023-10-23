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
            Swal.fire({ icon: "success", text: "등록이 완료되었습니다." });
            navigate("/group/groupBoard", {
              state: { groupNo: groupNo },
            });
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire({ icon: "info", text: "내용을 입력하세요." });
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
