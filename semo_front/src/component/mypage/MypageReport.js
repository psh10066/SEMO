import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import ReportFrm from "./ReportFrm";
import "./report.css";

const MypageReport = () => {
  const location = useLocation();
  const group = location.state.group;
  const member = location.state.member;
  //console.log(group);
  //console.log(member);

  const [reportDetail, setReportDetail] = useState("");

  const navigate = useNavigate();
  const report = () => {
    console.log(reportDetail);
    console.log(member.memberNo);
    console.log(group.groupNo);
    if (reportDetail !== "") {
      const form = new FormData();
      form.append("reportDetail", reportDetail);
      form.append("groupNo", group.groupNo);
      form.append("memberNo", member.memberNo);
      const token = window.localStorage.getItem("token");
      axios
        .post("/report/insert", form, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data > 0) {
            Swal.fire({
              icon: "success",
              html: "신고가 접수되었습니다.",
            });
            navigate("/mypage/mygroup");
          }
        })
        .catch((res) => [console.log(res.response.status)]);
    } else {
      Swal.fire({
        icon: "error",
        html: "에러가 발생했습니다.<br>잠시 후 다시 시도해주세요.",
      });
    }
  };
  return (
    <div className="report-all-wrap">
      <div className="report-frm-title"></div>
      <ReportFrm
        group={group}
        member={member}
        reportDetail={reportDetail}
        setReportDetail={setReportDetail}
        buttonEvent={report}
      />
    </div>
  );
};

export default MypageReport;
