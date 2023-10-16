import ReactModal from "react-modal";
import "../util/modal.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const FollowModal = ({
  isFolllowModalOpen,
  onFollowModalCancel,
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
          console.log(res.response.status);
        });
    }
  }, [memberList]);
  const handleCancelClick = () => {
    onFollowModalCancel();
  };
  return (
    <ReactModal isOpen={isFolllowModalOpen}>
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
                onFollowModalCancel={onFollowModalCancel}
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
  const onFollowModalCancel = props.onFollowModalCancel;
  // console.log(member);
  const memberNo = member.memberNo;
  // console.log(loginMember);
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const naviFeedProfile = () => {
    navigate("/feed/profile", {
      state: { memberNo: member.memberNo },
    });
    setChangeFeed(!changeFeed);
    onFollowModalCancel();
  };

  const deleteFollower = () => {
    alert("삭제");
    // axios
    //   .post(
    //     "/member/deleteFollower",
    //     { memberNo },
    //     {
    //       headers: {
    //         Authorization: "Bearer " + token,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     setChangeFeed(!changeFeed);
    //   })
    //   .catch((res) => {
    //     console.log(res.response.status);
    //   });
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
      <div className="follow-btn-wrap">
        <button type="button" onClick={deleteFollower} className="followingBtn">
          삭제
        </button>
      </div>
    </div>
  );
};

export default FollowModal;
