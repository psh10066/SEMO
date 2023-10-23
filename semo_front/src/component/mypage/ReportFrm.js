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
          <tr className="report-group-name">
            <td width={"20%"}>모임명 </td>
            <td width={"60%"}>{group.groupName}</td>
          </tr>
          <tr className="report-writer-name">
            <td>신고 회원명 </td>
            <td>{member.memberName}</td>
          </tr>
          <tr>
            <td colSpan="2" className="report-content-box">
              {/* 텍스트에디터 효과 없이 줄글 입력만 받을거라 textarea를 사용했습니다.
              관리자페이지: 신고내역 조회 참고 */}
              <textarea
                placeholder="내용을 입력해 주세요."
                rows="5"
                cols="75"
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
              <Button1 text="신고하기" clickEvent={buttonEvent} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReportFrm;
