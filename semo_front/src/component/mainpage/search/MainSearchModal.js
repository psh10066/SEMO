import Modal from "react-modal";
import "./mainSearch.css";
import Input from "../../util/InputFrm";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

Modal.setAppElement("#root");

const MainSearchModal = (props) => {
  const [searchContent, setSearchContent] = useState("");
  const [searchResult, setSearchResult] = useState({});
  const navigate = useNavigate();
  const modalState = props.modalState;
  const setModalState = props.setModalState;
  //console.log(modalState);
  const Search = () => {
    //const searchKeyword = searchContent;
    //console.log(searchKeyword);
    //console.log(searchContent);
    navigate("searchresult", { state: { searchContent: searchContent } });
    if (setSearchContent != null) {
      setSearchContent("");
    }
    setModalState(false);
    /*
    axios
      .post("/page/search", groupName)
      .then((res) => {
        console.log(res.data);
        setModalState(false);
        e.stopPropagation();

        navigate("/searchresult", {
          state: { searchResult: res.data, searchKeyword: searchContent },
        });
        if (setSearchContent != null) {
          setSearchContent("");
        }
      })
      .catch((res) => {
        console.log(res.data);
        console.log(res.response.status);
      });
      */
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
