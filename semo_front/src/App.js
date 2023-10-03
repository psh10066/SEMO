import { useState } from "react";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import "./component/common/default.css";
import { Button1 } from "./component/util/Buttons";
import MyModal from "./component/util/MyModal";
import { Route, Routes } from "react-router";
import AdminMain from "./component/admin/AdminMain";
import GrBoardMain from "./component/board/GrBoardMain";

function App() {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/admin/*" element={<AdminMain />} />
          <Route path="/board/*" element={<GrBoardMain />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
