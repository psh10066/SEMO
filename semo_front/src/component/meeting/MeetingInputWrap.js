import Input from "../util/InputFrm";

const MeetingInputWrap = (props) => {
  const data = props.data;
  const setData = props.setData;
  const type = props.type;
  const content = props.content;
  const label = props.label;
  const placeholder = props.placeholder;
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
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingInputWrap;
