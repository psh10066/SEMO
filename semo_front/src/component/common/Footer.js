import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Footer = (props) => {
  const navigate = useNavigate();
  const token = window.localStorage.getItem("token");
  const setIsLogin = props.setIsLogin;
  const isLogin = props.isLogin;
  const deleteMember = () => {
    if (isLogin !== false) {
      Swal.fire({
        icon: "warning",
        title: "회원 탈퇴하시겠습니까?",
        text: "작성한 모든 글이 사라집니다!",
        showCancelButton: true,
        confirmButtonText: "탈퇴하기",
        cancelButtonText: "취소",
      }).then((res) => {
        if (res.isConfirmed)
          axios
            .post("/member/deleteMember", null, {
              headers: {
                Authorization: "Bearer " + token,
              },
            })
            .then((res) => {
              Swal.fire({
                icon: "success",
                text: "탈퇴완료",
              });
              window.localStorage.removeItem("token");
              setIsLogin(false);
              navigate("/login");
            });
      });
    }
  };
  return (
    <footer className="footer">
      <div className="footer-content">
        <ul>
          <li>
            <Link to="#">이용약관</Link>
          </li>
          <li>
            <Link to="#">개인정보취급</Link>
          </li>
          <li>
            <Link to="/notice">공지사항</Link>
          </li>
          <li>
            {isLogin ? (
              <div className="deleteMember" onClick={deleteMember}>
                회원탈퇴
              </div>
            ) : (
              ""
            )}
          </li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
