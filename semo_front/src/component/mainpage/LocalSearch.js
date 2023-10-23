import "../searchresult/searchResult.css";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../common/Pagination";
import { Modal } from "@mui/material";
import axios from "axios";

const LocalSearch = () => {
  const location = useLocation();
  const [reqPage, setReqPage] = useState(1);
  const [socialPageInfo, setSocialPageInfo] = useState({});
  const [searchSocialingList, setSearchSocialingList] = useState([]);

  const searchKeyword = location.state.searchContent;

  useEffect(() => {
    axios
      .get("/page/searchLocal/" + searchKeyword + "/" + reqPage)
      .then((res) => {
        setSearchSocialingList(res.data.searchSocialingList);
        setSocialPageInfo(res.data.pi);
      })
      .catch((res) => {
        console.log(res.response.status);
      });
  }, [searchKeyword, reqPage]);

  const [searchResultCategories, setSearchResultCategories] = useState([
    {
      text: "소셜링",
      categoryType: "socialing",
      active: true,
      image: "/image/menu_icon/meeting5.png",
    },
  ]);

  return (
    <div className="searchresult-all-wrap">
      <div className="searchresult-title">
        <div className="searchresult-title-result"></div>
      </div>
      <div
        className="searchresult-category-wrap"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          className="searchresult-tab-category searchCategory-active"
          style={{ pointerEvents: "none" }}
        >
          <img src={searchResultCategories[0].image} />
          <strong>{searchKeyword}</strong> 지역 소셜링
        </div>
      </div>
      <div>
        <div>
          <div className="searchresult-list-wrap">
            {searchSocialingList.map((socialingList, index) => {
              return (
                <SearchSocialingItem
                  key={"socialingList" + index}
                  socialingList={socialingList}
                />
              );
            })}
          </div>
          {socialPageInfo.totalPage === 0 ? (
            <div className="searchresult-page">
              <div className="paging-wrap-noresult">
                <div className="material-icons">warning_amber</div>
                <div className="empty-result-message">
                  검색 결과가 없습니다.
                </div>
              </div>
            </div>
          ) : (
            <div className="searchresult-page">
              <Pagination
                reqPage={reqPage}
                setReqPage={setReqPage}
                pageInfo={socialPageInfo}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SearchSocialingItem = (props) => {
  const socialingList = props.socialingList;
  //console.log(socialingList);
  const navigate = useNavigate();
  const groupView = () => {
    navigate("/group/view", {
      state: { groupNo: socialingList.groupNo },
    });
    console.log(socialingList.groupNo);
  };
  const [isMouse, setIsMouse] = useState(false);
  const mouseOver = () => {
    setIsMouse(true);
  };
  const mouseOut = () => {
    setIsMouse(false);
  };
  const textMouse = () => {
    // document.getElementsByClassName("page-item-img").style.filter =
    //   "grayscale(10%) brightness(40%)";
  };
  return (
    <div className="searchresult-item-wrap">
      <div
        className="searchresult-item-img-wrap"
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}
      >
        {isMouse ? (
          <div
            className="searchresult-time-img-text"
            onClick={groupView}
            onMouseOver={textMouse}
          >
            상세보기
          </div>
        ) : (
          ""
        )}
        <div className="searchresult-item-img">
          {socialingList.groupImg === null ? (
            <img src="/image/default.png" />
          ) : (
            <img src={"/group/" + socialingList.groupImg} />
          )}
        </div>
      </div>
      <div className="searchresult-item-info">
        <div className="searchresult-infos">
          <div className="searchresult-category">
            {socialingList.groupCategory === 1
              ? " #문화·예술"
              : socialingList.groupCategory === 2
              ? " #운동·액티비티"
              : " #푸드·드링크"}
          </div>
          <div className="searchresult-group-name">
            {socialingList.groupName}
          </div>
          <div className="searchresult-group-bottom">
            <div className="searchresult-icons searchresult-icons-location">
              <span className="material-icons">location_on</span>
              {socialingList.groupLocal === 1
                ? "서울"
                : socialingList.groupLocal === 2
                ? "경기"
                : "부산"}
            </div>
            <div className="searchresult-icons">
              <span className="material-icons">groups</span>
              {socialingList.totalCount}/{socialingList.groupMaxnum}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchFeedItem = (props) => {
  const feedList = props.feedList;
  //console.log(feedList);
  const navigate = useNavigate();
  const feedView = () => {
    navigate("/feed/view", {
      state: { feedNo: feedList.feedNo },
    });
    console.log(feedList.feedNo);
  };
  return (
    <div className="searchresult-feed-item-wrap" onClick={feedView}>
      <div className="searchresult-feed-item-img">
        <img src={"/feed/" + feedList.feedImg} />
      </div>
    </div>
  );
};

export default LocalSearch;
