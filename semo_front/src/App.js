import { useState } from "react";
import Footer from "./component/common/Footer";
import Header from "./component/common/Header";
import "./component/common/default.css";
import { Button1 } from "./component/util/Buttons";
import MyModal from "./component/util/MyModal";
import { Route, Routes } from "react-router";
import AdminMain from "./component/admin/AdminMain";

function App() {
  return (
    <div className="wrap">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/admin/*" element={<AdminMain />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
