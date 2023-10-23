import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { el } from "date-fns/locale";

const ModifyMyFeed = (props) => {
  const navigate = useNavigate();
  const member = props.member;
  const setMember = props.setMember;
  const token = window.localStorage.getItem("token");

  const [memberContent, setMemberContent] = useState(member.memberContent);
  const [memberImg, setMemberImg] = useState(member.memberImg); //기존 이미지 불러오기

  const [feedThumbnail, setFeedThumbnail] = useState(null); //썸네일 변경사항 확인
  const [memberThumbnail, setMemberThumbnail] = useState(
    memberImg === null ? "Image" : "/member/" + memberImg
  );
  //썸네일 이미지
  const [profile, setProfile] = useState(null);

  //기존 이미지 삭제
  const deleteMyProfile = () => {
    setMemberThumbnail("Image");
    setMemberImg(null);
    setFeedThumbnail("deleteImage");
  };

  //상태 업데이트
  const thumbnailChange = (e) => {
    const files = e.currentTarget.files;
    //썸네일 등록
    if (files.length !== 0 && files[0] != 0) {
      setMemberThumbnail(files[0]); //썸네일 파일 전송을위한 state에 값 파일객체 저장
      //화면에 썸네일 미리보기
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setMemberThumbnail(reader.result); //data
      };
      setProfile(files[0]);
      setFeedThumbnail("updateImage");
    }
  };

  //피드 글 업데이트
  const feedContentChange = (e) => {
    const newValue = e.currentTarget.value;
    setMemberContent(newValue);
  };

  //저장버튼
  const updateMemberFeed = () => {
    const token = window.localStorage.getItem("token");
    // 피드 글 보내기
    const form = new FormData();
    if (memberContent) {
      form.append("memberContent", memberContent);
    }
    //피드이미지 변경
    if (feedThumbnail == "updateImage") {
      form.append("feedThumbnail", profile); // 변경 이미지
      form.append("memberImg", member.memberImg); //기존 이미지 삭제
    }
    //기존 피드 이미지 삭제
    if (feedThumbnail == "deleteImage" && memberImg == null) {
      form.append("feedThumbnail", null);
      form.append("memberImg", member.memberImg); //기존 이미지 삭제
    }
    // 이미지 변경이나 삭제가 아니라면 기존 이미지를 그대로 사용
    if (
      member.memberImg &&
      feedThumbnail != "updateImage" &&
      feedThumbnail != "deleteImage"
    ) {
      form.append("feedThumbnail", null);
      form.append("memberImg", member.memberImg); //기존 이미지 삭제
    }

    axios
      .post("/member/updateMyFeed", form, {
        headers: {
          contentType: "multipart/form-data",
          processData: false,
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === -1) {
          Swal.fire("수정 중 문제가 발생했습니다. 잠시후 다시 시도해주세요");
        } else {
          Swal.fire({
            icon: "success",
            title: "내 피드 수정되었습니다.",
          }).then(() => {
            window.location.reload();
          });
        }
      })
      .catch((res) => {
        if (res.response.status === 403) {
          Swal.fire({
            title: "로그인이 필요한 서비스 입니다.",
            text: "로그인 페이지로 이동합니다.",
            icon: "info",
          }).then(() => {
            navigate("/login");
          });
        }
      });
  };

  return (
    <div className="modifyMy-wrap">
      <div className="modifyMy-title">내 피드 설정</div>
      <div className="modifyMy-content">
        <div className="modifyMyFeed-thumbnail">
          <div className="modifyMyFeed-file">
            <Avatar
              src={memberThumbnail}
              key={memberThumbnail}
              sx={{ width: 108, height: 108 }}
            />
            <div className="feedButton">
              <input
                type="file"
                id="memberThumbnail"
                accept="image/*"
                onChange={thumbnailChange}
              />
              <button className="deleteMyProfile" onClick={deleteMyProfile}>
                기존 이미지 삭제
              </button>
            </div>
          </div>
          <div className="modifyMyFeed-text">
            <textarea
              value={memberContent}
              placeholder="피드 소개글"
              onChange={feedContentChange}
            />
          </div>
          <div className="modifyMyFeed-saveBtn">
            <button onClick={updateMemberFeed} className="modifymyfeedsave">
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyMyFeed;
