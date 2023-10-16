import "./searchResult.css";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import { Modal } from "@mui/material";

const SearchResult = (props) => {
  const isLogin = props.isLogin;
  const location = useLocation();
  //const searchResult = location.state.searchResult;
  //console.log(searchResult);
  const [reqPage, setReqPage] = useState(1);
  const [pageInfo, setPageInfo] = useState({});
  const [searchList, setSearchList] = useState([]);
  //const [modalState, setModalState] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [groupName, setGroupName] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const [socialingSearch, setSocialingSearch] = useState("all");
  //소셜링-전체(all) / 소셜링-모임명(groupName) / 소셜링-모임설명(groupContent) / 라운지(피드)(feed)

  useEffect(() => {
    setSearchList(location.state.searchResult);
    setSearchKeyword(location.state.searchKeyword);
  }, []);
  //console.log(searchKeyword);

  return (
    <div className="searchresult-all-wrap">
      <div className="searchresult-title">
        <div className="searchKeyword">'{searchKeyword}'</div>
        <div className="searchresult-title-result"> 검색 결과</div>
      </div>
      <div className="searchresult-category-wrap">
        <div>카테고리 라인</div>
      </div>
      <div className="searchresult-list-wrap">
        {searchList.map((search, index) => {
          return <SearchItem key={"search" + index} search={search} />;
        })}
      </div>
      <div className="searchresult-page">
        <Pagination
          reqPage={reqPage}
          setReqPage={setReqPage}
          pageInfo={pageInfo}
        />
      </div>
    </div>
  );
};

const SearchItem = (props) => {
  const search = props.search;
  console.log(search);
  const navigate = useNavigate();
  const groupView = () => {
    navigate("/group/view", { state: { groupNo: search.groupNo } });
    console.log(search.groupNo);
  };
  return (
    <div className="searchresult-item-wrap" onClick={groupView}>
      <div className="searchresult-item-img">
        {search.groupImg === null ? (
          <img src="/image/default.png" />
        ) : (
          <img src={"/group/" + search.groupImg} />
        )}
      </div>
      <div className="searchresult-item-info">
        <div className="searchresult-infos">
          <div className="searchresult-group-name">{search.groupName}</div>
          <div className="searchresult-icons">
            <span className="material-icons">groups</span>
            {search.totalCount}/{search.groupMaxnum}
          </div>
          <div className="searchresult-category">
            {search.groupCategory === 1
              ? " 문화·예술"
              : search.groupCategory === 2
              ? " 운동·액티비티"
              : " 푸드·드링크"}
          </div>
          <div className="searchresult-icons">
            <span className="material-icons">location_on</span>
            {search.groupLocal === 1
              ? "서울"
              : search.groupLocal === 2
              ? "경기"
              : "부산"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
