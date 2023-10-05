import "./mainSearch.css";
import { useState } from "react";
import MainSearchModal from "./MainSearchModal";

const MainSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handelClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="mainSearchBtn">
      <span class="material-icons" onClick={handelClick}>
        search
      </span>
      <MainSearchModal isOpen={isOpen} />
    </div>
  );
};
export default MainSearch;
