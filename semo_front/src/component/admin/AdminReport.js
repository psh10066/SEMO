import { useState } from "react";

const AdminReport = (props) => {
  const reportList = props.reportList;
  return (
    <div className="my-content-wrap">
      <div className="my-content-title">모임 신고 내역</div>
      <div className="admin-report-board">
        <table>
          <thead>
            <tr>
              <td>모임명</td>
              <td>신고회원아이디</td>
              <td>신고사유</td>
              <td>신고일자</td>
            </tr>
          </thead>
          <tbody>
            {reportList.map((report, index) => {
              return (
                <tr key={"r" + index}>
                  <td>{report.groupName}</td>
                  <td>{report.memberId}</td>
                  <td>{report.reportContent}</td>
                  <td>{report.reportDate}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReport;
