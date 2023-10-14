import ReactModal from "react-modal";
import "./modal.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const MyModal = ({ isModalOpen, onModalCancel, memberList, isLogin }) => {
  const [listMember, setListMember] = useState([]);
  const memberNoList = memberList.join(",");
  const [loginMember, setLoginMember] = useState(null);

  useEffect(() => {
    axios
      .get("/member/memberList", { params: { memberNoList: memberNoList } })
      .then((res) => {
        // console.log(res.data);
        setListMember(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
    if (isLogin) {
      const token = window.localStorage.getItem("token");
      axios
        .post("/member/getMember", null, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setLoginMember(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, [memberList]);
  const handleCancelClick = () => {
    onModalCancel();
  };
  return (
    <ReactModal isOpen={isModalOpen}>
      <div className="modal-cancel">
        <span
          className="material-icons cancel-icon"
          onClick={handleCancelClick}
        >
          close
        </span>
      </div>
      <div className="follow-list-all-wrap">
        <div className="memberList-wrap">
          {listMember.map((member, index) => {
            return (
              <FollowMember
                key={"followMember" + index}
                member={member}
                isLogin={isLogin}
                loginMember={loginMember}
              />
            );
          })}
        </div>
      </div>
    </ReactModal>
  );
};

const FollowMember = (props) => {
  const member = props.member;
  const isLogin = props.isLogin;
  const loginMember = props.loginMember;
  const [isFollow, setIsFollow] = useState(0);
  const memberNo = member.memberNo;
  // console.log(loginMember);
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  useEffect(() => {
    if (isLogin) {
      axios
        .post(
          "/member/isFollow",
          { memberNo },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          setIsFollow(res.data);
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, []);
  const naviFeedProfile = () => {
    navigate("/feed/profile", {
      state: { memberNo: member.memberNo },
    });
  };
  const loginMsg = () => {
    Swal.fire("로그인 후 이용해 주세요.");
  };
  const follow = () => {
    axios
      .post(
        "/member/follow",
        { memberNo },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsFollow(1);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  const unfollow = () => {
    axios
      .post(
        "/member/unfollow",
        { memberNo },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setIsFollow(0);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  return (
    <div className="follow-member-wrap">
      {member.memberImg === null ? (
        <div className="follow-member-img">
          <Stack direction="row" spacing={2} onClick={naviFeedProfile}>
            <Avatar
              alt="Remy Sharp"
              src="/image/person.png"
              sx={{ width: 40, height: 40 }}
            />
          </Stack>
        </div>
      ) : (
        <div className="follow-member-img">
          <Stack direction="row" spacing={2} onClick={naviFeedProfile}>
            <Avatar
              alt="Remy Sharp"
              src={"/member/" + member.memberImg}
              sx={{ width: 40, height: 40 }}
            />
          </Stack>
        </div>
      )}
      <div className="follow-member-mid">
        <div className="follow-member-name" onClick={naviFeedProfile}>
          {member.memberName}
        </div>
        <div className="follow-member-content">{member.memberContent}</div>
      </div>
      {isLogin ? (
        loginMember && loginMember.memberNo === member.memberNo ? (
          <div className="follow-btn-wrap"></div>
        ) : isFollow === 1 ? (
          <div className="follow-btn-wrap">
            <button type="button" onClick={unfollow}>
              팔로잉
            </button>
          </div>
        ) : (
          <div className="follow-btn-wrap">
            <button type="button" onClick={follow}>
              팔로우
            </button>
          </div>
        )
      ) : (
        <div className="follow-btn-wrap">
          <button type="button" onClick={loginMsg}>
            팔로우
          </button>
        </div>
      )}
    </div>
  );
};

export default MyModal;
