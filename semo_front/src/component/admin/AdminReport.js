import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";

const AdminReport = () => {
  //const reportList2 = props.reportList;
  const [reportList, setReportList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  useEffect(() => {
    axios
      .get("/report/reportList/" + reqPage)
      .then((res) => {
        //console.log(res.data);
        setReportList(res.data.list);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqPage]);
  return (
    <div className="my-content-wrap">
      {/*<div className="admin-content-title">모임 신고 내역</div>*/}
      <div className="admin-report-board">
        <table>
          <thead>
            <tr>
              <th width={"10%"}>신고번호</th>
              <th width={"10%"}>아이디</th>
              <th width={"20%"}>모임명</th>
              <th width={"50%"}>신고사유</th>
              <th width={"10%"}>신고일자</th>
            </tr>
          </thead>
          <tbody>
            {reportList.map((report, index) => {
              return <ReportItem key={"report" + index} report={report} />;
            })}
          </tbody>
        </table>
      </div>
      <div className="admin-paging-wrap">
        <Pagination
          pageInfo={pageInfo}
          reqPage={reqPage}
          setReqPage={setReqPage}
        />
      </div>
    </div>
  );
};
const ReportItem = (props) => {
  const report = props.report;
  return (
    <tr className="admin-tbl-line">
      <td>{report.reportNo}</td>
      <td>{report.memberId}</td>
      <td className="admin-group-name">
        <div>{report.groupName}</div>
      </td>
      <td className="admin-report-detail" id="reportDetail">
        <div>{report.reportDetail}</div>
      </td>
      <td>{report.reportDate}</td>
    </tr>
  );
};
export default AdminReport;
