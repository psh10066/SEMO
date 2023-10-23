import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BoardFrm from "./GrBoardFrm";
import axios from "axios";
import Swal from "sweetalert2";

const GrBoardModify = () => {
  const location = useLocation();
  const grBoard = location.state.grBoard;
  //제목,내용 -> 전송용 데이터를 담을 state
  const [grBoardTitle, setGrBoardTitle] = useState(grBoard.grBoardTitle);
  const [grBoardContent, setGrBoardContent] = useState(grBoard.grBoardContent);
  const navigate = useNavigate();

  //수정하기 클릭시 동작할 함수
  const modify = () => {
    if (
      grBoardTitle !== "" &&
      grBoardContent !== "" &&
      grBoardContent !== "<p><br></p>"
    ) {
      const form = new FormData();
      form.append("grBoardNo", grBoard.grBoardNo);
      form.append("grBoardTitle", grBoardTitle);
      form.append("grBoardContent", grBoardContent);
      const token = window.localStorage.getItem("token");
      axios
        .post("/groupBoard/modify", form, {
          headers: {
            contentType: "muitlpart/form-data",
            processDate: false,
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          if (res.data === 1) {
            Swal.fire({ icon: "success", text: "수정이 완료되었습니다." });
            navigate("/group/groupBoard", {
              state: { groupNo: grBoard.groupNo },
            });
          } else {
            Swal.fire({
              icon: "info",
              text: "수정 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.",
            });
          }
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    } else {
      Swal.fire({
        icon: "info",
        text: "내용을 입력하세요.",
      });
    }
  };
  return (
    <div>
      <BoardFrm
        grBoardTitle={grBoardTitle}
        setGrBoardTitle={setGrBoardTitle}
        grBoardContent={grBoardContent}
        setGrBoardContent={setGrBoardContent}
        buttonEvent={modify}
        type="modify"
      />
    </div>
  );
};
export default GrBoardModify;
