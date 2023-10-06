import { useState } from "react";
import { Button1 } from "../util/Buttons";
import Input from "../util/InputFrm";
import TextEditor from "../util/TextEditor";

const GrPhotoFrm = (props) => {
  const grPhotoTitle = props.GrPhotoTitle;
  const setGrPhotoTitle = props.setGrPhotoTitle;
  const grPhotoContent = props.grPhotoContent;
  const setGrPhotoContent = props.setGrPhotoContent;
  const grThumbnail = props.grThmbnail;
  const setGrThumbnail = props.setGrThmbnail;
  const grPhotoImg = props.grPhotoImg;
  const setGrPhotoImg = props.setGrPtohoImg;
  const buttonEvent = props.buttonEvent;
  const type = props.type;
  const delFileNo = props.delFileNo;
  const setDelFileNo = props.setDelFileNo;
  const [newFileList, setNewFileList] = useState([]);
  const thumbnailChange = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] != 0) {
      setGrThumbnail(files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setBoardImg(reader.result);
      };
    } else {
      setGrThumbnail({});
      setBoardImg(null);
    }
  };
  const changeFile = (e) => {
    const files = e.currentTarget.files;
    setBoardFile(files);
    const arr = new Array();
    for (let i = 0; i < files.length; i++) {
      arr.push(files[i].name);
    }
    setNewFileList(arr);
  };
  return (
    <div className="photo-frm-wrap">
      <div className="photo-frm-top">
        <div className="board-thumbnail">
          {boardImg === null ? (
            <img src="/img/default.png" />
          ) : (
            <img src={boardImg} />
          )}
        </div>
        <div className="board-info">
          <table className="photo-info-tbl">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="grPhotoTitle">제목</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={grPhotoTitle}
                    setData={setGrPhotoTitle}
                    content="grPhotoTitle"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="thumbnail">대표이미지</label>
                </td>
                <td>
                  <input
                    type="file"
                    id="thumbnail"
                    accept="img/*"
                    onChange={thumbnailChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="boardFile">첨부파일</label>
                </td>
                <td>
                  <input type="file" onChange={changeFile} multiple />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="photo-content-box">
        <TextEditor
          data={grPhotoContent}
          setData={setGrPhotoContent}
          url="/groupPhoto/contentImg"
        />
      </div>
      <div className="photo-btn-box">
        <Button1 text="등록" clickEvent={buttonEvent} />
      </div>
    </div>
  );
};

export default GrPhotoFrm;
