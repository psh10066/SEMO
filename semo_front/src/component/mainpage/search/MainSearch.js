import "./mainSearch.css";
import React, { useState } from "react";
import MainSearchModal from "./MainSearchModal";
import { useLocation } from "react-router-dom";

const MainSearch = () => {
  const [modalState, setModalState] = useState(false); //모달창의 상태를 보관해 둘 useState입니다.

  function OnOffModal() {
    setModalState(!modalState);
  }

  const location = useLocation();

  let searchStyle = {};

  if (location.pathname.includes("/login")) {
    searchStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/admin")) {
    searchStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/login")) {
    searchStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/join")) {
    searchStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/group")) {
    searchStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/groupBoard")) {
    searchStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/notice")) {
    searchStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/meeting")) {
    searchStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/feed")) {
    searchStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/page")) {
    searchStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/mypage")) {
    searchStyle = { color: "#220895" };
  }
  if (location.pathname.includes("/chat")) {
    searchStyle = { color: "#220895" };
  }

  return (
    <div className="mainSearchBtn">
      <span className="material-icons" onClick={OnOffModal} style={searchStyle}>
        search
      </span>
      <MainSearchModal modalState={modalState} setModalState={setModalState} />
    </div>
  );
};
export default MainSearch;
