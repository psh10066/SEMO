import { useDaumPostcodePopup } from "react-daum-postcode";
import { Button1 } from "./Buttons";

const Postcode = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const label = props.label;
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
    console.log(fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <div>
      <div className="label">
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
      <div>
        <Button1 clickEvent={handleClick} text="주소검색" />
      </div>
    </div>
  );
};

export default Postcode;
