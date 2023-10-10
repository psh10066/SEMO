import { useState } from "react";
import { Button1 } from "../util/Buttons";
import Input from "../util/InputFrm";
import TextEditor from "../util/TextEditor";

const GrPhotoFrm = (props) => {
  const grPhotoTitle = props.grPhotoTitle;
  const setGrPhotoTitle = props.setGrPhotoTitle;
  const grPhotoContent = props.grPhotoContent;
  const setGrPhotoContent = props.setGrPhotoContent;
  const grThumbnail = props.grThmbnail;
  const setGrThumbnail = props.setGrThmbnail;
  const grPhotoFile = props.grPhotoFile;
  const setGrPhotoFile = props.setGrPhotoFile;
  const grPhotoImg = props.grPhotoImg;
  const setGrPhotoImg = props.setGrPtohoImg;
  const buttonEvent = props.buttonEvent;
  const type = props.type;
  const delFileNo = props.delFileNo;
  const setDelFileNo = props.setDelFileNo;
  //새첨부파일 출력용 state
  const [newFileList, setNewFileList] = useState([]);
  const thumbnailChange = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] != 0) {
      setGrThumbnail(files[0]);
      //화면에 썸네일 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setGrPhotoImg(reader.result);
      };
    } else {
      setGrThumbnail({});
      setGrPhotoImg(null);
    }
  };
  const changeFile = (e) => {
    const files = e.currentTarget.files;
    setGrPhotoFile(files);
    const arr = new Array();
    for (let i = 0; i < files.length; i++) {
      arr.push(files[i].name);
    }
    setNewFileList(arr);
  };
  return (
    <div className="photo-frm-wrap">
      <div className="photo-frm-top">
        <div className="photo-thumbnail">
          {grPhotoImg === null ? (
            <img src="/img/default.png" />
          ) : (
            <img src={grPhotoImg} />
          )}
        </div>
        <div className="photo-info">
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
                  <label htmlFor="photoFile">첨부파일</label>
                </td>
                <td>
                  <input type="file" onChange={changeFile} multiple />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="photo-btn-box">
        {type === "modify" ? (
          <Button1 text="수정" clickEvent={buttonEvent} />
        ) : (
          <Button1 text="등록" clickEvent={buttonEvent} />
        )}
      </div>
    </div>
  );
};

export default GrPhotoFrm;
