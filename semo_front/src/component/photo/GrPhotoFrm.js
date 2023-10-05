const GrPhotoFrm = (props) => {
  const grPhotoTitle = props.GrPhotoTitle;
  const setGrPhotoTitle = props.setGrPhotoTitle;
  const grPhotoContent = props.grPhotoContent;
  const setGrPhotoContent = props.setGrPhotoContent;
  const grPhotoImg = props.grPhotoImg;
  const setGrPhotoImg = props.setGrPtohoImg;
  const buttonEvent = props.buttonEvent;

  return (
    <div className="photo-frm-wrap">
      <div className="photo-frm-top">
        <table className="photo-info-tbl">
          <tbody>
            <tr>
              <td>
                <label htmlFor="grPhotoTitle">제목</label>
              </td>
              <td>
                <Input
                  type="text"
                  data={grPhotoTitle}
                  setData={setGrPhotoTitle}
                  content="grPhotoTitle"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GrPhotoFrm;
