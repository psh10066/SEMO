import { Button1 } from "../util/Buttons";

const ReportFrm = (props) => {
  const group = props.group;
  const member = props.member;
  //console.log(group);
  //console.log(member);
  const reportDetail = props.reportDetail;
  const setReportDetail = props.setReportDetail;

  const buttonEvent = props.buttonEvent;

  return (
    <div className="report-frm-wrap">
      <table className="report-tbl">
        <tbody>
          <tr>
            <td>신고 모임명 : </td>
            <td>{group.groupName}</td>
          </tr>
          <tr>
            <td>신고 회원명 : </td>
            <td>{member.memberName}</td>
          </tr>
          <tr>
            <td colSpan="2" className="report-content-box">
              {/* 텍스트에디터 효과 없이 줄글 입력만 받을거라 textarea 사용했습니다.
              관리자페이지: 신고내역 조회 참고 */}
              <textarea
                onChange={(e) => {
                  const changeValue = e.currentTarget.value;
                  setReportDetail(changeValue);
                }}
              >
                {reportDetail}
              </textarea>
            </td>
          </tr>
          <tr className="report-btn-box">
            <td colSpan="2">
              <Button1 text="제출하기" clickEvent={buttonEvent} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReportFrm;
