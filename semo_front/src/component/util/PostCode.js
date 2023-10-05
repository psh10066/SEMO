import React, { useState } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { Button1 } from "./Buttons";
import Input from "./InputFrm";

const Postcode = () => {
  const open = useDaumPostcodePopup();
  const [meetingAddress, setMeetingAddress] = useState("");

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
    setMeetingAddress(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div>
      <div>
        <Button1 clickEvent={handleClick} text="클릭" />
      </div>
      <div>
        <Input data={meetingAddress} />
      </div>
    </div>
  );
};

export default Postcode;
