import axios from "axios";
import { useEffect, useState } from "react";
import PopularGroupImg from "./PopularGroupImg";

const PopularGroup = () => {
  const [groupSave, setGroupSave] = useState([]); //groupNo , Count >> 가장 많이 찜된 모임순으로 검색
  const [groupNo, setGroupNo] = useState([]); //groupNo 배열
  const [stringGroupNo, setStringGroupNo] = useState(""); //groupNo String

  const [groupDetail, setGroupDetail] = useState([]); //이 번호들에 해당되는 그룹 정보

  const token = window.localStorage.getItem("token");

  //찜 많은 순 불러오기
  useEffect(() => {
    axios
      .get("/group/groupLikeList", null)
      .then((res) => {
        setGroupSave(res.data);
        setGroupNo(res.data.map((item) => item.groupNo));
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, []);

  //배열 처리
  useEffect(() => {
    setStringGroupNo(groupNo.join(","));
  }, [groupNo]);

  useEffect(() => {
    axios
      .get("/group/groupLikeListDetail", {
        params: { stringGroupNo: stringGroupNo },
      })
      .then((res) => {
        setGroupDetail(res.data); // 서버에서 전체 데이터 배열을 반환하므로 그대로 설정
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [stringGroupNo]);

  return (
    <div className="popularGroup">
      <div className="popularGroup-title">
        <h2>인기모임</h2>
      </div>
      <div className="popularGroup-detail">
        <div className="popular-groupWrap">
          <PopularGroupImg groupDetail={groupDetail} />
        </div>
      </div>
    </div>
  );
};
export default PopularGroup;
