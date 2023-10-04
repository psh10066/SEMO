import { useState } from "react";
import { Button1 } from "../util/Buttons";
import Input from "../util/InputFrm";
import TextEditor from "../util/TextEditor";
import GrBoardWrite from "./GrBoardWrite";

const GrBoardFrm = (props) => {
  const GrBoardTitle = props.GrBoardTitle;
  const setGrBoardTitle = props.setGrBoardTitle;
  const GrBoardContent = props.GrBoardContent;
  const setGrBoardContent = props.setGrBoardContent;
  const buttonEvent = props.buttonEvent;
  const type = props.type;

  return (
    <div className="board-frm-wrap">
      <div className="board-frm-top">
        <div className="board-info">
          <table className="board-info-tbl">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="GrBoardTitle">제목</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={GrBoardTitle}
                    setData={setGrBoardTitle}
                    content="GrBoardTitle"
                  />
                </td>
              </tr>
              <tr>
                <td>작성자</td>
                <td>테스트</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="board-content-box">
        <TextEditor
          data={GrBoardContent}
          setData={setGrBoardContent}
          url="/groupBoard/contentImg"
        />
      </div>
      <div className="board-btn-box">
        {type === "modify" ? (
          <Button1 text="수정하기" clickEvent={buttonEvent} />
        ) : (
          <Button1 text="작성하기" clickEvent={buttonEvent} />
        )}
      </div>
    </div>
  );
};

export default GrBoardFrm;
