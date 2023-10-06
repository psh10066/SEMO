import { Avatar, Stack } from "@mui/material";
import ReactModal from "react-modal";
import "./modal.css";
import { useState } from "react";
import { Button1 } from "./Buttons";

const FeedModal = ({ isOpen, onCancel, onSubmit, member }) => {
  const [thumbnail, setThumbnail] = useState({});
  const [feedImg, setFeedImg] = useState(null);
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${(
    "0" +
    (today.getMonth() + 1)
  ).slice(-2)}-${("0" + today.getDate()).slice(-2)}`;

  return (
    <ReactModal isOpen={isOpen}>
      <div className="feed-write-cancel">
        <span className="material-icons cancel-icon" onClick={onCancel}>
          close
        </span>
      </div>
      <div className="feed-write-all-wrap">
        <div className="feed-write-wrap">
          <div className="feed-write-top">
            <div className="feed-writerImage">
              <Stack direction="row" spacing={2}>
                <Avatar
                  alt="Remy Sharp"
                  src={"/member/" + member.memberImg}
                  sx={{ width: 65, height: 65 }}
                />
              </Stack>
            </div>
            <div className="feed-writerName">{member.memberName}</div>
            <div className="feed-writeDate">{formattedDate}</div>
          </div>
          <FeedInsertImg
            setThumbnail={setThumbnail}
            setFeedImg={setFeedImg}
            feedImg={feedImg}
          />
          <FeedInsertContent />
        </div>
      </div>
    </ReactModal>
  );
};

const FeedInsertImg = (props) => {
  const setThumbnail = props.setThumbnail;
  const setFeedImg = props.setFeedImg;
  const feedImg = props.feedImg;
  const thumbnailChange = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] != 0) {
      setThumbnail(files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setFeedImg(reader.result);
      };
    } else {
      setThumbnail({});
      setFeedImg(null);
    }
    var fileName = document
      .getElementById("feedThumbnail")
      .value.split("\\")
      .pop(); // 파일 경로에서 파일 이름 추출
    document.querySelector(".upload-name").value = fileName; // 다른 요소에 파일 이름 설정
  };
  const feedWriteNext = () => {};
  return (
    <div className="feed-write-image-wrap">
      <div className="feed-write-content">
        <div className="feed-write-content-top">
          <input
            className="upload-name"
            defaultValue="피드 사진을 넣어주세요."
            placeholder="피드 사진"
            disabled
          />
          <label htmlFor="feedThumbnail">파일찾기</label>
          <input
            type="file"
            id="feedThumbnail"
            accept="image/*"
            onChange={thumbnailChange}
          />
        </div>
        <div className="feed-write-content-mid">
          <div className="feed-thumbnail">
            {feedImg === null ? (
              <img src="/image/feedImg.png" className="feedDefaultImg" />
            ) : (
              <img src={feedImg} />
            )}
          </div>
        </div>
      </div>
      <div className="feed-write-btn feed-write-nextBtn">
        <Button1 text="다음" clickEvent={feedWriteNext} />
      </div>
    </div>
  );
};

const FeedInsertContent = () => {
  return (
    <div className="feed-write-letter-wrap">
      <div className="feed-write-content">
        <textarea></textarea>
      </div>
      <div className="feed-write-btn feed-write-submitBtn">
        <Button1 text="작성" />
      </div>
    </div>
  );
};

export default FeedModal;
