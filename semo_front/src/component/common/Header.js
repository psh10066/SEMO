import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header">
        <div className="main-logo">
          <Link to="/">SEMOMO</Link>
        </div>
        <Navi />
      </div>
    </header>
  );
};
const Navi = () => {
  return (
    <div className="nav">
      <ul>
        <li>
          <Link to="#">소셜링</Link>
        </li>
        <li>
          <Link to="#">라운지</Link>
        </li>
        <li>
          <Link to="#">로그인</Link> {/* 버튼으로 구현예정 */}
        </li>
      </ul>
    </div>
  );
};
export default Header;
