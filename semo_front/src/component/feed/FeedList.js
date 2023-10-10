import { useNavigate } from "react-router-dom";

const FeedList = (props) => {
  const feedList = props.feedList;

  return (
    <div className="feedList-wrap">
      <div className="feed-item-wrap">
        {feedList.map((feed, index) => {
          return <FeedItem key={"feed" + index} feed={feed} />;
        })}
      </div>
    </div>
  );
};
const FeedItem = (props) => {
  const feed = props.feed;
  const navigate = useNavigate();
  const feedView = () => {
    navigate("/feed/view", { state: { feedNo: feed.feedNo } });
  };
  return (
    <div className="feed-item" onClick={feedView}>
      <div className="feed-item-img">
        <img src={"/feed/" + feed.feedImg} />
      </div>
    </div>
  );
};

export default FeedList;
