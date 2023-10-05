import { Button1 } from "../util/Buttons";
import Input from "../util/InputFrm";
import TextEditor from "../util/TextEditor";

const GrBoardFrm = (props) => {
  const grBoardTitle = props.grBoardTitle;
  const setGrBoardTitle = props.setGrBoardTitle;
  const grBoardContent = props.grBoardContent;
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
                  <label htmlFor="grBoardTitle">제목</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={grBoardTitle}
                    setData={setGrBoardTitle}
                    content="grBoardTitle"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="board-content-box">
        <TextEditor
          data={grBoardContent}
          setData={setGrBoardContent}
          url="/groupBoard/contentImg"
        />
      </div>
      <div className="board-btn-box">
        {type === "modify" ? (
          <Button1 text="수정" clickEvent={buttonEvent} />
        ) : (
          <Button1 text="등록" clickEvent={buttonEvent} />
        )}
      </div>
    </div>
  );
};

export default GrBoardFrm;
