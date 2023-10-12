import axios from "axios";

const GroupSave = (props) => {
  const groupNo = props.groupNo;
  const groupSave = props.groupSave;
  const setGroupSave = props.setGroupSave;
  const groupSaveClick = (e) => {
    e.stopPropagation(); // 부모 컴포넌트의 onClick 막기

    const token = window.localStorage.getItem("token");
    axios
      .post("/group/save/toggle/" + groupNo, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        // 여기에서 alert를 띄울 때 groupSave가 false이면 찜 등록한 것, true이면 찜 해제한 것.
        setGroupSave(!groupSave);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  };

  return (
    <>
      {groupSave ? (
        <span className="material-icons" onClick={groupSaveClick}>
          favorite
        </span>
      ) : (
        <span className="material-icons" onClick={groupSaveClick}>
          favorite_border
        </span>
      )}
    </>
  );
};
export default GroupSave;
