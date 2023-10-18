import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";

const PageList = (props) => {
  const isLogin = props.isLogin;
  const [pageList, setPageList] = useState([]);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});

  const [categoryLocal, setCategoryLocal] = useState("all"); //관심category 혹은 관심지역 선택(all, groupCategory, groupLocal)
  const [categoryValue, setCategoryValue] = useState(); //선택했을 경우의 값(0/1,2,3/1,2,3)

  const [peopleCount, setPeopleCount] = useState(0);

  useEffect(() => {
    axios
      .get("/page/list/" + reqPage + "/" + categoryLocal + "/" + categoryValue)
      .then((res) => {
        //document.querySelectorAll(".page-category-wrap div")[0].click();
        //console.log(res.data);
        setPageList(res.data.pageList);
        setPageInfo(res.data.pi);
        setPeopleCount(res.data.peopleCount);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [reqPage, categoryLocal, categoryValue]);

  const [categories, setCategories] = useState([
    { text: "전체", categoryLocal: "all", categoryValue: 0, active: true },
    {
      text: "문화·예술",
      categoryLocal: "groupCategory",
      categoryValue: 1,
      active: false,
    },
    {
      text: "운동·액티비티",
      categoryLocal: "groupCategory",
      categoryValue: 2,
      active: false,
    },
    {
      text: "푸드·드링크",
      categoryLocal: "groupCategory",
      categoryValue: 3,
      active: false,
    },
    {
      text: "서울",
      categoryLocal: "groupLocal",
      categoryValue: 1,
      active: false,
    },
    {
      text: "경기",
      categoryLocal: "groupLocal",
      categoryValue: 2,
      active: false,
    },
    {
      text: "부산",
      categoryLocal: "groupLocal",
      categoryValue: 3,
      active: false,
    },
  ]);

  const activeCategory = (index) => {
    categories.forEach((item) => {
      item.active = false;
    });
    categories[index].active = true;
    setCategories([...categories]);
  };

  return (
    <div>
      <div className="page-category-wrap">
        <ul>
          {categories.map((category, index) => {
            return (
              <li key={"category" + index}>
                {category.active ? (
                  <div
                    className="page-category category-active"
                    onClick={() => {
                      activeCategory(index);
                      setReqPage(1);
                      setCategoryLocal(category.categoryLocal);
                      setCategoryValue(category.categoryValue);
                      //console.log(category.categoryLocal);
                      //console.log(category.categoryValue);
                    }}
                  >
                    {category.text}
                  </div>
                ) : (
                  <div
                    className="page-category"
                    onClick={() => {
                      activeCategory(index);
                      setReqPage(1);
                      setCategoryLocal(category.categoryLocal);
                      setCategoryValue(category.categoryValue);
                      //console.log(categoryLocal);
                      //console.log(categoryValue);
                    }}
                  >
                    {category.text}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="page-list-wrap">
        {pageList.map((page, index) => {
          return (
            <PageItem
              key={"page" + index}
              page={page}
              //peopleCount={peopleCount}
            />
          );
        })}
      </div>
      <div className="page-page">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
          //setList={setPageList}
        />
      </div>
    </div>
  );
};

const PageItem = (props) => {
  const page = props.page;
  //const peopleCount = props.peopleCount;
  //console.log(page);
  //console.log(peopleCount);
  const navigate = useNavigate();
  const groupView = () => {
    navigate("/group/view", { state: { groupNo: page.groupNo } });
  };
  //const [peopleCount, setPeopleCount] = useState(0);
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
          <div className="page-group-name">{page.groupName}</div>
          <div className="page-icons">
            <span className="material-icons">groups</span>
            {page.totalCount}/{page.groupMaxnum}
          </div>
          <div className="page-groupCategory">
            {page.groupCategory === 1
              ? " 문화·예술"
              : page.groupCategory === 2
              ? " 운동·액티비티"
              : " 푸드·드링크"}
          </div>
          <div className="page-icons-location">
            <span className="material-icons">location_on</span>
            {/*{" "}*/}
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
