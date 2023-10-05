import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import "./meeting.css";
import axios from "axios";
import { Button1, Button2, Button3 } from "../util/Buttons";
import Input from "../util/InputFrm";
import Postcode from "../util/PostCode";
import { useNavigate } from "react-router-dom";

function MeetingCreate() {
  const [meetingName, setMeetingName] = useState("");
  const [meetingDate, setMeetingDate] = useState(null);
  const [meetingLocation, setMeetingLocation] = useState("");
  const [meetingPrice, setMeetingPrice] = useState("");
  const [meetingMaxnum, setMeetingMaxnum] = useState("");
  const navigate = useNavigate();

  const meeting = {
    meetingName,
    meetingDate,
    meetingLocation,
    meetingPrice,
    meetingMaxnum,
  };
  axios
    .post("meeting/create", meeting)
    .then((res) => {
      if (res.data === 1) {
        navigate("/login");
      } else {
      }
    })
    .catch((res) => {
      console.log(res.data);
    });

  //날짜
  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  return (
    <div className="meeting-wrap">
      <h2 className="meeting-title">정모 생성</h2>

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
        <div className="label">
          <label>모임 날짜</label>
        </div>
        <DatePicker
          showTimeSelect
          locale={ko}
          dateFormat="yyyy년 MM월 dd일 aa hh:mm "
          showPopperArrow={false} // 화살표 변경
          selected={meetingDate}
          minDate={new Date()}
          placeholderText="날짜를 선택해주세요"
          timeClassName={handleColor}
          onChange={(date) => setMeetingDate(date)}
        />
      </div>
      <div>
        <label>장소</label>
        <Postcode />
      </div>
      <div>
        <MeetingInputWrap
          data={meetingPrice}
          setData={setMeetingPrice}
          type="type"
          content="meetingName"
          label="회비"
        />
      </div>
      <div>
        <MeetingInputWrap
          data={meetingMaxnum}
          setData={setMeetingMaxnum}
          type="number"
          content="meetingMaxnum"
          label="회비"
        />
      </div>
      <Button2 text="모임 생성"></Button2>
    </div>
  );
}

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
        <div className="label">
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

export default MeetingCreate;
