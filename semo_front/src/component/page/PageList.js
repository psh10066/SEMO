import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";

const PageList = (props) => {
  const isLogin = props.isLogin;
  const [pageList, setPageList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  useEffect(() => {
    axios
      .get("/page/list/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setPageList(res.data.pageList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);
  return (
    <div>
      <div className="page-list-wrap">
        {pageList.map((page, index) => {
          return <PageItem key={"page" + index} page={page} />;
        })}
      </div>
      <div className="page-page">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </div>
  );
};
const PageItem = (props) => {
  const page = props.page;
  const navigate = useNavigate();
  const groupView = () => {
    navigate("/group/view", { state: { groupNo: page.groupNo } });
    //console.log(page.groupNo);
  };
  return (
    <div className="page-item" onClick={groupView}>
      <div className="page-item-img">
        {page.groupImg === null ? (
          <img src="/image/default.png" />
        ) : (
          <img src={"/group/" + page.groupImg} />
        )}
      </div>
      <div className="page-item-info">
        <div>{page.groupName}</div>
        <div>{page.groupMaxnum}</div>
        <div>{page.groupCategory}</div>
        <div>{page.groupLocal}</div>
      </div>
    </div>
  );
};

export default PageList;
