import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";

const AdminReport = (props) => {
  //const reportList2 = props.reportList;
  const [reportList, setReportList] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  useEffect(() => {
    axios
      .get("/report/reportList/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setReportList(res.data.list);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [reqPage]);
  return (
    <div className="my-content-wrap">
      <div className="my-content-title">모임 신고 내역</div>
      <div className="admin-report-board">
        <table>
          <thead>
            <tr>
              <td width={"10%"}>신고번호</td>
              <td width={"20%"}>모임명</td>
              <td width={"20%"}>신고회원아이디</td>
              <td width={"40%"}>신고사유</td>
              <td width={"10%"}>신고일자</td>
            </tr>
          </thead>
          <tbody>
            {/* 
            {reportList2.map((report, index) => {
              return (
                <tr key={"r" + index}>
                  <td>{report.reportNo}</td>
                  <td>{report.groupName}</td>
                  <td>{report.memberId}</td>
                  <td>{report.reportContent}</td>
                  <td>{report.reportDate}</td>
                </tr>
              );
            })}
            */}
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
    <tr>
      <td>{report.reportNo}</td>
      <td>{report.groupName}</td>
      <td>{report.memberId}</td>
      <td>{report.reportDetail}</td>
      <td>{report.reportDate}</td>
    </tr>
  );
};
export default AdminReport;
