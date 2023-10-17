import { useEffect, useState } from "react";
import "./member.css";

export const Timer = (props) => {
  const mailChkMsg = props.mailChkMsg;
  const setAuthCode = props.setAuthCode;
  const authCode = props.authCode;
  const setMailChkMsg = props.setMailChkMsg;
  const mailChk = props.mailChk;
  const INTERVAL = 1000;
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 1000);

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(
    2,
    "0"
  );
  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - INTERVAL);
    }, INTERVAL);

    if (timeLeft <= 0) {
      clearInterval(timer);
      setAuthCode(null);
      setMailChkMsg("인증 시간 만료");
    }
    if (mailChk == true) {
      clearInterval(timer);
    }
    return () => {
      clearInterval(timer);
    };
  }, [timeLeft, mailChk]);

  return (
    <div>
      <span className="timer">
        {minutes} : {second}
      </span>
      <span className="mailChkMsg">{mailChkMsg}</span>
    </div>
  );
};
export default Timer;
