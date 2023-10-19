import { useState } from "react";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import "./meeting.css";
import axios from "axios";
import { Button1, Button2, Button3 } from "../util/Buttons";
import Input from "../util/InputFrm";
import Postcode from "../util/PostCode";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MeetingModify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const meeting = location.state.meeting;
  const groupNo = meeting.groupNo;

  const [meetingName, setMeetingName] = useState(meeting.meetingName);
  const [meetingDate, setMeetingDate] = useState(meeting.meetingDate);
  const [meetingPlace, setMeetingPlace] = useState(meeting.meetingPlace);
  const [meetingPrice, setMeetingPrice] = useState(meeting.meetingPrice);
  const [meetingMaxnum, setMeetingMaxnum] = useState(meeting.meetingMaxnum);

  const deleteMeeting = () => {
    Swal.fire({
      icon: "warning",
      text: "약속을 삭제하시겠습니까?",
      showCancelButton: true,
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((res) => {
      if (res.isConfirmed) {
        axios.get("/meeting/delete/" + meeting.meetingNo).then((res) => {
          if (res.data === 1) {
            Swal.fire({
              icon: "success",
              text: "삭제 완료!",
            });
            navigate("/group/view", { state: { groupNo } });
          } else {
            Swal.fire({
              icon: "error",
              text: "삭제 중 문제가 발생했습니다!",
            }).catch((res) => {
              console.log(res.response.status);
            });
          }
        });
      }
    });
  };
  const canNotFix = () => {
    Swal.fire({
      icon: "warning",
      text: "날짜는 수정이 불가능합니다!",
    });
  };
  const modifyMeeting = () => {
    const data = {
      meetingNo: meeting.meetingNo,
      meetingName: meetingName,
      meetingDate: meetingDate,
      meetingPlace: meetingPlace,
      meetingPrice: meetingPrice,
      meetingMaxnum: meetingMaxnum,
    };
    const token = window.localStorage.getItem("token");
    axios
      .post("/meeting/modify", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.data === 1) {
          navigate("/group/view", { state: { groupNo } });
        } else {
          Swal.fire("수정 중 문제가 발생했습니다!");
        }
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };
  return (
    <div className="meeting-wrap">
      <h2 className="meeting-title">정모 수정</h2>
      <div className="meeting-name">
        <MeetingInputWrap
          data={meetingName}
          setData={setMeetingName}
          type="type"
          content="meetingName"
          label="모임 이름"
        />
      </div>
      <div className="meeting-date">
        <div className="meeting-label">
          <label>모임 날짜</label>
        </div>
        <input
          className="input-form"
          type="text"
          value={format(new Date(meetingDate), "yyyy년 MM월 dd일 aa hh:mm", {
            locale: ko,
          })}
          readOnly
          onClick={canNotFix}
        />
      </div>
      <div>
        <Postcode
          data={meetingPlace}
          setData={setMeetingPlace}
          type="type"
          content="meetingPlace"
          label="장소"
        />
      </div>
      <div>
        <MeetingInputWrap
          data={meetingPrice}
          setData={setMeetingPrice}
          type="type"
          content="meetingPrice"
          label="금액"
        />
      </div>
      <div className="meeting-input">
        <MeetingInputWrap
          data={meetingMaxnum}
          setData={setMeetingMaxnum}
          type="number"
          content="meetingMaxnum"
          label="정원"
        />
      </div>
      <div id="meeting-btn">
        <Button2 text="모임 수정" clickEvent={modifyMeeting}></Button2>
        <Button1 text="모임 삭제" clickEvent={deleteMeeting}></Button1>
      </div>
    </div>
  );
};

const MeetingInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const label = props.label;
  const blurEvent = props.blurEvent;
  const checkMsg = props.checkMsg;
  return (
    <div className="join-input-wrap">
      <div>
        <div className="meeting-label">
          <label htmlFor={content}>{label}</label>
        </div>
        <div className="input">
          <Input
            type={type}
            data={data}
            setData={setData}
            content={content}
            blurEvent={blurEvent}
          />
        </div>
      </div>
      <div className="check-msg">{checkMsg}</div>
    </div>
  );
};

export default MeetingModify;
