import axios from "axios";
import { useEffect, useState } from "react";

const PopularGroup = () => {
  const [groupSave, setGroupSave] = useState([]); //groupNo , Count >> 가장 많이 찜된 모임순으로 검색
  const [groupNo, setGroupNo] = useState([]); //groupNo
  const [groupDetail, setGroupDetail] = useState([]); //이 번호들에 해당되는 그룹 정보

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

  console.log(groupSave);
  console.log(groupNo);

  //불러온 그룹 번호들(배열) > 이에 맞는 내용 불러오기
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (currentIndex < groupNo.length) {
      //length 는 10 . currentIndex는 9까지
      axios
        .post("/group/groupLikeListDetail", {
          groupNo: Number(groupNo[currentIndex]),
        })
        .then((res) => {
          setGroupDetail((prev) => [...prev, res.data]); // 기존 데이터와 함께 새 데이터 추가
          setCurrentIndex((prev) => prev + 1); // index 증가
        })
        .catch((res) => {
          console.log(res.response.status);
        });
    }
  }, [currentIndex]); // currentIndex 변경될 때마다 effect 실행

  console.log(groupDetail);

  return (
    <div className="popularGroup">
      <div className="popularGroup-title">
        <h2>인기모임</h2>
      </div>
      <div className="popularGroup-detail"></div>
    </div>
  );
};
export default PopularGroup;
