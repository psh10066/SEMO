import Modal from "react-modal";
import "./mainSearch.css";
import Input from "../../util/InputFrm";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

const MainSearchModal = (props) => {
  const [searchContent, setSearchContent] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const navigate = useNavigate();
  const modalState = props.modalState;
  const setModalState = props.setModalState;
  const Search = (e) => {
    console.log(e.type);
    if (searchContent != "") {
      navigate("searchresult", { state: { searchContent: searchContent } });
      setSearchContent("");
      setModalState(false);
    } else {
      Swal.fire({
        icon: "info",
        text: "입력값을 확인하세요!",
        showCancelButton: false,
        showConfirmButton: false,
      }).then(() => {});
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      Search(event);
    }
  };

  return (
    <div className="mainSearchModal">
      <Modal
        isOpen={props.modalState}
        onRequestClose={() => props.setModalState(false)} // 모달의 오버레이나 Esc 키를 클릭하면 이 함수가 호출됩니다.
        shouldCloseOnOverlayClick={true}
        style={{
          content: {
            position: "unset",
            width: "40vw",
            height: "10vh",
            margin: "44vh auto",
            display: "grid",
            alignItems: "center",
            border: "1px solid #8bb4ff48",
          },
          overlay: {
            zIndex: 1000,
          },
        }}
      >
        <div className="mainSearchModalIn">
          <div className="search-box">
            <input
              type="text"
              value={searchContent}
              onChange={(e) => setSearchContent(e.target.value)}
              onKeyDown={handleKeyDown} // 엔터키 감지 핸들러 추가
              content="searchContent"
              placeholder="관심사 , 지역명(예: 독서, 북한산)을 검색해보세요"
            />
            <div>
              <span className="material-icons" onClick={Search}>
                search
              </span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MainSearchModal;
