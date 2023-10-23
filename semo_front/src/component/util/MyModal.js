import ReactModal from "react-modal";
import "./modal.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const MyModal = ({
  isModalOpen,
  onModalCancel,
  memberList,
  isLogin,
  changeFeed,
  setChangeFeed,
}) => {
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
          if (res.response.status === 403) {
            Swal.fire({
              title: "로그인이 필요한 서비스 입니다.",
              text: "로그인 페이지로 이동합니다.",
              icon: "info",
            });
          }
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
                changeFeed={changeFeed}
                setChangeFeed={setChangeFeed}
                onModalCancel={onModalCancel}
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
  const changeFeed = props.changeFeed;
  const setChangeFeed = props.setChangeFeed;
  const onModalCancel = props.onModalCancel;
  // console.log(member);
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
    setChangeFeed(!changeFeed);
    onModalCancel();
  };
  const loginMsg = () => {
    Swal.fire({ icon: "info", text: "로그인 후 이용해 주세요." });
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
        // console.log(res.data);
        setIsFollow(1);
        setChangeFeed(!changeFeed);
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
        // console.log(res.data);
        setIsFollow(0);
        setChangeFeed(!changeFeed);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  return (
    <div className="follow-member-wrap">
      {member.memberImg === null ? (
        <div className="follow-member-img">
          <Stack
            direction="row"
            spacing={2}
            onClick={naviFeedProfile}
            className="followClick"
          >
            <Avatar
              alt="Remy Sharp"
              src="/image/person.png"
              sx={{ width: 40, height: 40 }}
            />
          </Stack>
        </div>
      ) : (
        <div className="follow-member-img">
          <Stack
            direction="row"
            spacing={2}
            onClick={naviFeedProfile}
            className="followClick"
          >
            <Avatar
              alt="Remy Sharp"
              src={"/member/" + member.memberImg}
              sx={{ width: 40, height: 40 }}
            />
          </Stack>
        </div>
      )}
      <div className="follow-member-mid">
        <div
          className="follow-member-name followClick"
          onClick={naviFeedProfile}
        >
          {member.memberName}
        </div>
        <div className="follow-member-content">{member.memberContent}</div>
      </div>
      {isLogin ? (
        loginMember && loginMember.memberNo === member.memberNo ? (
          <div className="follow-btn-wrap"></div>
        ) : isFollow === 1 ? (
          <div className="follow-btn-wrap">
            <button type="button" onClick={unfollow} className="followingBtn">
              팔로잉
            </button>
          </div>
        ) : (
          <div className="follow-btn-wrap">
            <button type="button" onClick={follow} className="followBtn">
              팔로우
            </button>
          </div>
        )
      ) : (
        <div className="follow-btn-wrap">
          <button type="button" onClick={loginMsg} className="followBtn">
            팔로우
          </button>
        </div>
      )}
    </div>
  );
};

export default MyModal;
