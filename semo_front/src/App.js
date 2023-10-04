import { useEffect, useState } from "react";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import "./component/common/default.css";
import { Button1 } from "./component/util/Buttons";
import MyModal from "./component/util/MyModal";
import { Route, Routes } from "react-router";
import AdminMain from "./component/admin/AdminMain";
import Join from "./component/member/Join";
import Login from "./component/member/Login";

import GrBoardMain from "./component/board/GrBoardMain";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token === null) {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  });
  return (
    <div className="wrap">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/admin/*" element={<AdminMain />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/board/*" element={<GrBoardMain />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
