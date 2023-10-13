import ReactModal from "react-modal";
import "./modal.css";
import { useEffect, useState } from "react";
import axios from "axios";
const MyModal = ({
  isModalOpen,
  onModalCancel,
  memberList,
  isLogin,
  member,
}) => {
  const [listMember, setListMember] = useState({});
  const memberNoList = memberList.join(",");
  console.log(memberNoList);
  useEffect(() => {
    axios
      .get("/member/memberList", { params: { memberNoList: memberNoList } })
      .then((res) => {
        console.log(res.data);
        setListMember(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [memberList]);
  const handleCancelClick = () => {
    onModalCancel();
  };
  return (
    <ReactModal isOpen={isModalOpen}>
      <div className="modal-cancel">
        <span
          className="material-icons cancel-icon"
          onClick={handleCancelClick}
        >
          close
        </span>
      </div>
      <div className="follow-list-all-wrap">
        <div className="memberList-wrap">집에서 해야지</div>
      </div>
    </ReactModal>
  );
};

export default MyModal;
