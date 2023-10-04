import { Link } from "react-router-dom";
import "./mainSearch.css";
import { Input, Modal } from "@mui/material";
import { useState } from "react";
import MyModal from "../../util/MyModal";

const MainSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handelClick = () => {
    //모달오픈
    setIsOpen(true);
  };

  return (
    <div>
      <button onClick={handelClick}>버튼</button>
      <MyModal isOpen={isOpen} />
    </div>
  );
};
export default MainSearch;
