import axios from "axios";
import { Route, Routes, useNavigate } from "react-router";
import "./admin.css";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Swal from "sweetalert2";
import Pagination from "../common/Pagination";

const AdminMember = () => {
  //const adminMember = props.adminMember;
  //const navigation = useNavigate();
  const [memberList, setMemberList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  useEffect(() => {
    axios
      .get("/admin/list/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setMemberList(res.data.list);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqPage]);

  return (
    <div className="my-content-wrap">
      {/*<div className="admin-content-title">전체 회원 조회</div>*/}
      <div className="admin-member-tbl-box">
        <table>
          <thead>
            <tr>
              <th width={"10%"}>회원번호</th>
              <th width={"15%"}>회원아이디</th>
              <th width={"15%"}>회원이름</th>
              <th width={"25%"}>이메일</th>
              <th width={"20%"}>연락처</th>
              <th width={"15%"}>회원등급</th>
            </tr>
          </thead>
          <tbody>
            {memberList.map((member, index) => {
              return <MemberItem key={"member" + index} member={member} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="admin-paging-wrap">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </div>
  );
};
const MemberItem = (props) => {
  const member = props.member;
  const [memberType, setMemberType] = useState(member.memberType);

  const handleChange = (event) => {
    const obj = { memberNo: member.memberNo, memberType: event.target.value };
    const token = window.localStorage.getItem("token");
    axios
      .post("/admin/changeType", obj, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === 1) {
          setMemberType(event.target.value);
        } else {
          Swal.fire(
            "회원 등급 변경 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
          );
        }
      })
      .catch((res) => {
        console.log(res);
      });
  };
  return (
    <tr>
      <td>{member.memberNo}</td>
      <td>{member.memberId}</td>
      <td>{member.memberName}</td>
      <td>{member.memberMail}</td>
      <td>{member.memberPhone}</td>
      <td>
        <FormControl sx={{ m: 1, minWidth: 100 }}>
          <Select value={member.memberType} onChange={handleChange}>
            <MenuItem value={1}>관리자</MenuItem>
            <MenuItem value={2}>일반회원</MenuItem>
          </Select>
        </FormControl>
      </td>
    </tr>
  );
};
export default AdminMember;
