import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import "./meeting.css";
import axios from "axios";
import { Button1, Button2, Button3 } from "../util/Buttons";

function MeetingCreate() {
  const [meetingName, setMeetingName] = useState("");
  const [meetingDate, setMeetingDate] = useState(null);
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingLocation, setMeetingLocation] = useState("");
  const [meetingFee, setMeetingFee] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [locations, setLocations] = useState([]);

  // Open API에서 장소 정보를 가져오는 함수
  useEffect(() => {
    axios
      .get("") // 실제 API 엔드포인트로 바꾸세요.
      .then((response) => {
        setLocations(response.data.locations);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  // 모임 정보를 서버로 제출하는 함수
  const handleSubmit = () => {
    // 여기에서 서버로 데이터를 보내는 로직을 작성하세요.
    // meetingName, meetingDate, meetingTime, meetingLocation, meetingFee, maxAttendees 변수를 사용하여 데이터를 생성하고 서버로 보냅니다.
  };
  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  return (
    <div className="meeting-wrap">
      <h2 className="meeting-title">모임 생성</h2>
      <form onSubmit={handleSubmit} className="meeting-form">
        <div className="meeting-name">
          <label>모임 이름</label>
          <input
            type="text"
            value={meetingName}
            onChange={(e) => setMeetingName(e.target.value)}
          />
        </div>
        <div className="meeting-date">
          <label>모임 날짜</label>
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
          <select
            value={meetingLocation}
            onChange={(e) => setMeetingLocation(e.target.value)}
          >
            <option value="">장소를 선택하세요</option>
            {locations.map((location) => (
              <option key={location.id} value={location.name}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>회비</label>
          <input
            type="text"
            value={meetingFee}
            onChange={(e) => setMeetingFee(e.target.value)}
          />
        </div>
        <div>
          <label>정원</label>
          <input
            type="number"
            value={maxAttendees}
            onChange={(e) => setMaxAttendees(e.target.value)}
          />
        </div>
        <Button2 text="모임 생성"></Button2>
      </form>
    </div>
  );
}

export default MeetingCreate;
