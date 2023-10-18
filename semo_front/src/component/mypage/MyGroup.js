import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button1, Button2, Button3 } from "../util/Buttons";

const MyGroup = (props) => {
  const member = props.member;
  console.log(member);
  const [groupList, setGroupList] = useState([]);
  const memberNo = member.memberNo;

  useEffect(() => {
    axios
      .get("/report/mygroup/" + memberNo)
      .then((res) => {
        console.log(res.data);
        setGroupList(res.data);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [member]);

  return (
    <div>
      <div>
        <table>
          <thead>
            <tr>
              <th>모임명</th>
              <th>신고하기</th>
            </tr>
          </thead>
          <tbody>
            {groupList.map((group, index) => {
              return (
                <GroupItem
                  key={"group" + index}
                  group={group}
                  member={member}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const GroupItem = (props) => {
  const group = props.group;
  const member = props.member;
  const navigate = useNavigate();

  const GroupReport = () => {
    navigate("mypageReport", {
      state: { group: group, member: member },
    });
  };
  return (
    <tr>
      <td>{group.groupName}</td>
      <td>
        <Button2 text="신고하기" clickEvent={GroupReport} />
      </td>
    </tr>
  );
};
export default MyGroup;
