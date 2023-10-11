import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";

const GroupProFile = (props) => {
  const groupNo = props.groupNo;
  return (
    <div className="group-member-profile-wrap">
      <AvatarGroup total={24}>
        <Avatar alt="양" src="/static/images/avatar/1.jpg" />
        <Avatar alt="나" src="/static/images/avatar/2.jpg" />
        <Avatar alt="민" src="/static/images/avatar/4.jpg" />
      </AvatarGroup>
    </div>
  );
};
export default GroupProFile;
