import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalOpen = () => {
    setIsModalOpen(true);
  };

  return (
    <header>
      <div className="header">
        <div className="main-logo">
          <Link to="/">SEMOMO</Link>
        </div>
        <Navi />
        <div className="login-button">
          <button>
            <Link to="/login">LogIn</Link>
          </button>
        </div>
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
      </ul>
    </div>
  );
};
export default Header;
