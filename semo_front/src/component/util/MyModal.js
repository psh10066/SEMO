import ReactModal from "react-modal";

const MyModal = ({ isOpen, onCancel, onSubmit }) => {
  return (
    <ReactModal isOpen={isOpen}>
      <div>모달입니다</div>
      <div>
        <button onClick={onSubmit}>확인</button>
        <button onClick={onCancel}>취소</button>
      </div>
    </ReactModal>
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

export default MyModal;
