import axios from "axios";
import { useEffect, useState } from "react";
import { Button3 } from "../util/Buttons";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import MeetingList from "./MeetingList";

const MeetingView = (props) => {
  const group = props.group;
  const groupNo = props.groupNo;
  const isLogin = props.isLogin;
  const isJoin = props.isJoin;
  const member = props.member;
  const groupLevel = props.groupLevel;
  const [isAddMeet, setIsAddMeet] = useState(false); // 클릭시 자동으로 함수를 변경해줄 함수
  const [grJoin, setGrJoin] = useState(0);
  const [meetingList, setMeetingList] = useState([]);
  const navigate = useNavigate();
  // 모임의 약속 생성
  const meetingCreate = () => {
    navigate("/meeting/create", {
      state: { memberNo: member.memberNo, groupNo: group.groupNo },
    });
  };
  // 모임의 약속 참여하기
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
              { meetingNo, memberNo, grJoin },
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            )
            .then((res) => {
              setIsAddMeet(!isAddMeet);
            })
            .catch((error) => {
              console.log(error.response.status);
            });
        }
      }
    });
  };
  // 모임의 약속 보이기
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (isLogin) {
      axios
        .get("/meeting/selectGrJoin/" + groupNo, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setGrJoin(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    }
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
      {meetingList.length > 0 ? (
        <h2 className="meetingView-title">정기 모임</h2>
      ) : (
        ""
      )}
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
              isAddMeet={isAddMeet}
              setIsAddMeet={setIsAddMeet}
              groupLevel={groupLevel}
              groupNo={groupNo}
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
