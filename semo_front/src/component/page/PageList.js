import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";

const PageList = (props) => {
  const isLogin = props.isLogin;
  const [pageList, setPageList] = useState([]);
  //const [pageCategoryList, setPageCategoryList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});

  const [categoryLocal, setCategoryLocal] = useState("all"); //관심category 혹은 관심지역 선택(all, groupCategory, groupLocal)
  const [categoryValue, setCategoryValue] = useState(); //선택했을 경우의 값(0/1,2,3/1,2,3)

  useEffect(() => {
    axios
      .get("/page/list/" + reqPage + "/" + categoryLocal + "/" + categoryValue)
      .then((res) => {
        console.log(res.data);
        setPageList(res.data.pageList);
        setPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage, categoryLocal]);

  // axios.get("/page/list/"+(reqPage,groupCategory)).then((res)=>{
  //   console.log(res.data)
  //   setPageList
  // })

  return (
    <div>
      <div className="page-category-wrap">
        <div className="page-category">
          {/* 
        {pageList.map((page, index) => {
          return <PageItem key={"page" + index} page={page} />;
        })}
         */}
          <div
            className="page-default"
            onClick={() => {
              setCategoryLocal("all");
              //setCategoryValue(0);
              console.log(categoryLocal);
              console.log(categoryValue);
            }}
          >
            전체
          </div>
          <div
            onClick={() => {
              setCategoryLocal("groupCategory");
              setCategoryValue(1);
              console.log(categoryLocal);
              console.log(categoryValue);
            }}
          >
            문화·예술
          </div>
          <div
            onClick={() => {
              setCategoryLocal("groupCategory");
              setCategoryValue(2);
              console.log(categoryLocal);
              console.log(categoryValue);
            }}
          >
            운동·액티비티
          </div>
          <div
            onClick={() => {
              setCategoryLocal("groupCategory");
              setCategoryValue(3);
              console.log(categoryLocal);
              console.log(categoryValue);
            }}
          >
            푸드·드링크
          </div>
          <div
            onClick={() => {
              setCategoryLocal("groupLocal");
              setCategoryValue(1);
              console.log(categoryLocal);
              console.log(categoryValue);
            }}
          >
            서울
          </div>
          <div
            onClick={() => {
              setCategoryLocal("groupLocal");
              setCategoryValue(2);
              console.log(categoryLocal);
              console.log(categoryValue);
            }}
          >
            경기
          </div>
          <div
            onClick={() => {
              setCategoryLocal("groupLocal");
              setCategoryValue(3);
              console.log(categoryLocal);
              console.log(categoryValue);
            }}
          >
            부산
          </div>
        </div>
      </div>
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
{
  /* 
const PageCategoryItem = (props) => {
  const pageCategory = props.pageCategory;
  console.log(pageCategory);
  const navigate = useNavigate();
  return (
    <div className="page-category">
      <div>{pageCategory.groupCategory}테스트</div>
    </div>
  );
};
*/
}
const PageItem = (props) => {
  const page = props.page;
  //console.log(page);
  const navigate = useNavigate();
  const groupView = () => {
    navigate("/group/view", { state: { groupNo: page.groupNo } });
    //console.log(page.groupNo);
  };
  return (
    <div className="page-item-wrap" onClick={groupView}>
      <div className="page-item-img">
        {page.groupImg === null ? (
          <img src="/image/default.png" />
        ) : (
          <img src={"/group/" + page.groupImg} />
        )}
      </div>
      <div className="page-item-info">
        <div className="page-infos">
          <div>모임명 : {page.groupName}</div>
          <div>최대 모임 인원 : {page.groupMaxnum}</div>
          <div>
            카테고리 :
            {page.groupCategory === 1
              ? " 문화·예술"
              : page.groupCategory === 2
              ? " 운동·액티비티"
              : " 푸드·드링크"}
          </div>
          <div>
            지역 카테고리 :{" "}
            {page.groupLocal === 1
              ? "서울"
              : page.groupLocal === 2
              ? "경기"
              : "부산"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageList;
