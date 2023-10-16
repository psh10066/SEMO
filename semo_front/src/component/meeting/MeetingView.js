import axios from "axios";
import { useEffect, useState } from "react";
import Kakao from "../util/Kakao";
import { Button1, Button2, Button3 } from "../util/Buttons";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import MeetingList from "./MeetingList";

const MeetingView = (props) => {
  const group = props.group;
  const groupNo = props.groupNo;
  const isLogin = props.isLogin;
  const isJoin = props.isJoin;
  const member = props.member;
  // 클릭시 자동으로 함수를 변경해줄 함수
  const [isAddMeet, setIsAddMeet] = useState(false);
  const groupLevel = props.groupLevel;
  const [meetingList, setMeetingList] = useState([]);
  const [meetingJoin, setMeetingJoin] = useState([]);
  const [meetingMember, setMeetingMember] = useState(0);

  const navigate = useNavigate();

  // 모임 생성
  const meetingCreate = () => {
    navigate("/meeting/create", {
      state: { memberNo: member.memberNo, groupNo: group.groupNo },
    });
  };

  // 약속 참여하기
  const join = (meetingNo) => {
    Swal.fire({
      icon: "question",
      text: "모임에 참여 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((res) => {
      if (member.memberNo != null) {
        if (res.isConfirmed) {
          Swal.fire({
            icon: "success",
            text: "완료되었습니다!",
          });
          const token = window.localStorage.getItem("token");
          const memberNo = member.memberNo;
          axios
            .post(
              `/meeting/join`,
              { meetingNo, memberNo },
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            )
            .then((res) => {
              setMeetingJoin(res.data);
              setIsAddMeet(!isAddMeet);
            })
            .catch((error) => {
              console.log(error.response.status);
            });
        }
      }
    });
  };
  //약속 참여 취소하기
  const cancelJoin = (meetingNo) => {
    Swal.fire({
      icon: "question",
      text: "모임 참석을 취소 하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
    }).then((res) => {
      if (member.memberNo != null) {
        if (res.confirmed) {
          axios
            .get("/meeting/cancel/" + meetingNo)
            .then((res) => {
              if (res.data === 1) {
              }
            })
            .catch((res) => {
              console.log(res.response.status);
            });
        }
      }
    });
  };

  // 모임 보이기
  useEffect(() => {
    axios
      .get("/meeting/view/" + groupNo)
      .then((res) => {
        setMeetingList(res.data);
        if (res.data != null) {
        }
      })
      .catch((res) => {
        console.log(res.response.error);
      });
  }, [isAddMeet]);

  return (
    <div className="meetingView-wrap">
      <h2 className="meetingView-title">정기 모임</h2>
      {meetingList.length > 0
        ? meetingList.map((meeting, index) => (
            <MeetingList
              key={"meeting" + index}
              meeting={meeting}
              member={member}
              index={index}
              isLogin={isLogin}
              isJoin={isJoin}
              join={join}
              cancelJoin={cancelJoin}
            />
          ))
        : ""}
      {groupLevel == 1 ? (
        <div id="meeting-btn-area">
          <Button3 text="정모 만들기" clickEvent={meetingCreate} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MeetingView;
