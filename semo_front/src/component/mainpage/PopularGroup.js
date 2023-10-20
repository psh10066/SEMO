import axios from "axios";
import { useEffect, useState } from "react";
import PopularGroupImg from "./PopularGroupImg";

const PopularGroup = () => {
  const [groupSave, setGroupSave] = useState([]); //groupNo , Count >> 가장 많이 찜된 모임순으로 검색
  const [groupNo, setGroupNo] = useState([]); //groupNo 배열
  const [stringGroupNo, setStringGroupNo] = useState(""); //groupNo String
  const [groupDetail, setGroupDetail] = useState([]); //이 번호들에 해당되는 그룹 정보
  const [groupMapping, setGroupMapping] = useState([]); // groupDetail 찜많은순으로 맵핑

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

  //groupNo[0] //번호를 조회해와서
  //groupDetail 배열에서 groupNo[0]번째 값의 groupDetail.groupNo 찾기
  //setGroupMapping[0]에 넣기
  useEffect(() => {
    const newGroupMapping = [];
    for (let i = 0; i < 10; i++) {
      const targetGroupDetail = groupDetail.find(
        (detail) => detail.groupNo === groupNo[i]
      );
      if (targetGroupDetail) {
        newGroupMapping.push(targetGroupDetail);
      }
    }
    setGroupMapping(newGroupMapping);
  }, [groupNo, groupDetail]);

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
          <PopularGroupImg groupDetail={groupMapping} />
        </div>
      </div>
    </div>
  );
};
export default PopularGroup;
