import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useState } from "react";

const FeedProfile = (props) => {
  const [memberContent, setMemberContent] = useState("");

  return (
    <div className="feed-profile-all-wrap">
      <div className="feed-profile-wrap">
        <div className="profile-top">
          <div className="profile-image">
            <Stack direction="row" spacing={2}>
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
                sx={{ width: 100, height: 100 }}
              />
            </Stack>
          </div>
          <div className="feed-follow">
            <table>
              <tbody>
                <tr>
                  <th>피드</th>
                  <th>팔로워</th>
                  <th>팔로잉</th>
                </tr>
                <tr>
                  <td>132</td>
                  <td>325</td>
                  <td>243</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedProfile;
