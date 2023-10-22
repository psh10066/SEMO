import { FormControl, MenuItem, Select } from "@mui/material";
import axios from "axios";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ModifyMyLike = (props) => {
  const navigate = useNavigate();
  const member = props.member;
  const setMember = props.setMember;
  const token = window.localStorage.getItem("token");

  //상태 업데이트
  const handleChange1 = (event) => {
    setMemberLocal(event.target.value);
  };
  const handleChange2 = (event) => {
    setMemberCategory1(event.target.value);
  };
  const handleChange3 = (event) => {
    setMemberCategory2(event.target.value);
  };

  //상태 수정
  const setMemberLocal = (data) => {
    member.memberLocal = data;
    setMember({ ...member });
  };

  const setMemberCategory1 = (data) => {
    member.memberCategory1 = data;
    setMember({ ...member });
  };

  const setMemberCategory2 = (data) => {
    member.memberCategory2 = data;
    setMember({ ...member });
  };

  //저장 버튼
  const updateMemberLike = () => {
    const token = window.localStorage.getItem("token");
    axios
      .post("/member/updateMyLike", member, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "내 관심사가 수정되었습니다.",
        });
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

  //같은 카테고리 선택 불가
  const catState = () => {
    if (member.memberCategory2 == member.memberCategory1) {
      Swal.fire({
        icon: "error",
        text: "같은 카테고리는 선택할수 없습니다!",
      });
      setMemberCategory2(0);
    }
  };

  return (
    <div className="modifyMy-wrap">
      <div className="modifyMy-title">내 관심사·지역 수정</div>
      <div className="modifyMy-content modifyMyLikewrap">
        <div>
          <FormControl sx={{ m: 0.5, width: 400 }}>
            <Select
              value={member.memberCategory1}
              onChange={handleChange2}
              onBlur={catState}
            >
              <MenuItem value={1}>문화·예술</MenuItem>
              <MenuItem value={2}>운동·액티비티</MenuItem>
              <MenuItem value={3}>푸드·드링크</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ m: 0.5, width: 400 }}>
            <Select
              value={member.memberCategory2}
              onChange={handleChange3}
              onBlur={catState}
            >
              <MenuItem value={1}>문화·예술</MenuItem>
              <MenuItem value={2}>운동·액티비티</MenuItem>
              <MenuItem value={3}>푸드·드링크</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl sx={{ m: 0.5, width: 400 }}>
            <Select value={member.memberLocal} onChange={handleChange1}>
              <MenuItem value={1}>서울</MenuItem>
              <MenuItem value={2}>경기</MenuItem>
              <MenuItem value={3}>부산</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <button onClick={updateMemberLike} className="modifyMyLikesave">
            저장
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModifyMyLike;
