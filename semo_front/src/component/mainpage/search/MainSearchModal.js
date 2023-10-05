import ReactModal from "react-modal";
import "./mainSearch.css";

const MainSearchModal = ({ isOpen }) => {
  return (
    <div className="mainSearchModal">
      <ReactModal isOpen={isOpen}>
        <div>검색어를 입력</div>
      </ReactModal>
    </div>
  );
};
/*
  const [isOpen, setIsOpen] = useState(false);
  const handelClick = () => {
    //모달오픈
    setIsOpen(true);

    위에 코드를 모달상단에 쓰면됨
*/
/*
<button onClick={handelClick}>모달테스트</button>
<MyModal isOpen={isOpen} />
이런식으로 작성
*/

export default MainSearchModal;
