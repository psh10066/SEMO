import { useDaumPostcodePopup } from "react-daum-postcode";
import { Button1, Button3 } from "./Buttons";
import Kakao from "./Kakao";
import React, { useEffect, useState } from "react";

const Postcode = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const label = props.label;
  const [showMap, setShowMap] = useState(false); // Kakao Map 보이기/감추기 상태
  const changeValue = (e) => {
    const inputValue = e.currentTarget.value;
    setData(inputValue);
  };
  const open = useDaumPostcodePopup();
  // const [meetingAddress, setMeetingAddress] = useState("");
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setData(fullAddress);

    // 주소 검색 완료 시 Kakao Map을 보이도록 설정
    setShowMap(true);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div>
      <div className="meeting-label">
        <label htmlFor={content}>{label}</label>
      </div>
      <div className="input meeting-input">
        <input
          className="input-form meeting-input"
          id={content}
          type={type}
          value={data || ""}
          onChange={changeValue}
          data={data}
          readOnly
        />
      </div>
      <div id="address-btn">
        <Button3 clickEvent={handleClick} text="주소검색" />
        {showMap && <Kakao data={data} setData={setData} type={type} />}
      </div>
    </div>
  );
};

export default Postcode;
