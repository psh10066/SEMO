import Modal from "react-modal";
import "./mainSearch.css";
import Input from "../../util/InputFrm";
import { useState } from "react";
import axios from "axios";

Modal.setAppElement("#root");

const MainSearchModal = (props) => {
  const [searchContent, setSearchContent] = useState("");

  const search = () => {
    const searchContent = { searchContent };
    axios
      .post("#", searchContent)
      .then((res) => {})
      .catch((res) => {
        console.log(res);
      });
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
            <Input
              type="text"
              data={searchContent}
              setData={setSearchContent}
              content="searchContent"
              placeholder="관심사 , 지역명을 검색해보세요"
            />
            <div>
              <span className="material-icons" clickEvent={search}>
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
