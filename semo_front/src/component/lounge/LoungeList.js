import axios from "axios";
import { useEffect, useState } from "react";

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
      <div className="lounge-wrap">
        <ul>피드 목록</ul>
      </div>
    </div>
  );
};

export default LoungeList;
