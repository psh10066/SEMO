import { useState } from "react";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import "./component/common/default.css";
import { Button1 } from "./component/util/Buttons";
import MyModal from "./component/util/MyModal";
import { Route, Routes } from "react-router";
import AdminMain from "./component/admin/AdminMain";
import MeetingCreate from "./component/meeting/MeetingCreate";

function App() {
  return (
    <div className="wrap">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/admin/*" element={<AdminMain />} />
          <Route path="/metting" element={<MeetingCreate />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
