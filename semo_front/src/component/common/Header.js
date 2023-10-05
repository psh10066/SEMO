import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import MainSearch from "../mainpage/search/MainSearch";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const location = useLocation();

  let headerStyle = {};

  if (location.pathname.includes("/login")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/admin/*")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/login")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/join")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/group/*")) {
    headerStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/groupBoard/*")) {
    headerStyle = { color: "#220895" };
  }

  return (
    <header>
      <div className="header">
        <div className="main-logo">
          <Link to="/" style={headerStyle}>
            SEMOMO
          </Link>
        </div>
        <Navi />
        <div className="login-button">
          <MainSearch />
          <button>
            <Link to="/login">LogIn</Link>
          </button>
        </div>
      </div>
    </header>
  );
};
const Navi = () => {
  const location = useLocation();

  let naviStyle = {};

  if (location.pathname.includes("/login")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/admin/*")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/login")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/join")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/group/*")) {
    naviStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/groupBoard/*")) {
    naviStyle = { color: "#220895" };
  }

  return (
    <div className="nav">
      <ul>
        <li>
          <Link to="#" style={naviStyle}>
            소셜링
          </Link>
        </li>
        <li>
          <Link to="#" style={naviStyle}>
            라운지
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Header;
