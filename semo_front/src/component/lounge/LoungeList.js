import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { useNavigate } from "react-router-dom";

const LoungeList = (props) => {
  const isLogin = props.isLogin;
  const [loungeList, setLoungeList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    axios
      .get("/page/loungeList/" + reqPage)
      .then((res) => {
        console.log(res.data);
        setLoungeList(res.data.loungeList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage]);

  return (
    <div>
      <div className="lounge-list-wrap">
        {loungeList.map((lounge, index) => {
          return <LoungeItem key={"lounge" + index} lounge={lounge} />;
        })}
      </div>
      <div className="lounge-page">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </div>
  );
};

const LoungeItem = (props) => {
  const lounge = props.lounge;
  console.log(lounge);
  const navigate = useNavigate();
  const feedView = () => {
    navigate("/feed/view", {
      state: { feedNo: lounge.feedNo },
    });
    console.log(lounge.feedNo);
  };
  return (
    <div className="lounge-item-wrap" onClick={feedView}>
      <div className="lounge-item-img">
        <img src={"/feed/" + lounge.feedImg} />
      </div>
      <div className="lounge-item-info">
        <div className="lounge-infos">
          <div className="lounge-writer-name">{lounge.memberName}</div>
          <div className="lounge-content">{lounge.feedContent}</div>
        </div>
      </div>
    </div>
  );
};

export default LoungeList;
