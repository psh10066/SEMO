import { useState } from "react";

import Input from "../util/InputFrm";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import TextEditor from "../util/TextEditor";
import { Button1 } from "../util/Buttons";

const GroupFrm = (props) => {
  const groupName = props.groupName;
  const setGroupName = props.setGroupName;
  const thumbnail = props.thumbnail;
  const setThumbnail = props.setThumbnail;
  const groupImg = props.groupImg;
  const setGroupImg = props.setGroupImg;
  const groupMaxNum = props.groupMaxNum;
  const setGroupMaxNum = props.setGroupMaxNum;
  const groupContent = props.groupContent;
  const setGroupContent = props.setGroupContent;
  const groupCategory = props.groupCategory;
  const setGroupCategory = props.setGroupCategory;
  const groupLocal = props.groupLocal;
  const setGroupLocal = props.setGroupLocal;
  const buttonEvent = props.buttonEvent;
  const type = props.type;
  const thumbnailChange = (e) => {
    const files = e.currentTarget.files;
    if (files.length !== 0 && files[0] != 0) {
      setThumbnail(files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onloadend = () => {
        setGroupImg(reader.result);
      };
    } else {
      setThumbnail({});
      setGroupImg(null);
    }
  };
  const handleChange1 = (event) => {
    setGroupMaxNum(event.target.value);
  };
  const handleChange2 = (event) => {
    setGroupCategory(event.target.value);
  };
  const handleChange3 = (event) => {
    setGroupLocal(event.target.value);
  };
  return (
    <div className="group-frm-wrap">
      <div className="group-frm-top">
        <div className="group-info">
          <table className="group-info-tbl">
            <tbody>
              <tr>
                <td>
                  <label htmlFor="groupName">모임명</label>
                </td>
                <td>
                  <Input
                    type="text"
                    data={groupName}
                    setData={setGroupName}
                    content="groupName"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="thumbnail">모임 썸네일</label>
                </td>
                <td>
                  <input
                    type="file"
                    id="thumbnail"
                    accept="image/*"
                    onChange={thumbnailChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>최대 인원수</label>
                </td>
                <td>
                  <FormControl sx={{ m: 0.5, width: 400 }}>
                    <Select value={groupMaxNum} onChange={handleChange1}>
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                      <MenuItem value={40}>40</MenuItem>
                    </Select>
                  </FormControl>
                </td>
              </tr>
              <tr>
                <td>
                  <label>카테고리</label>
                </td>
                <td>
                  <FormControl sx={{ m: 0.5, width: 400 }}>
                    <Select value={groupCategory} onChange={handleChange2}>
                      <MenuItem value={1}>문화·예술</MenuItem>
                      <MenuItem value={2}>운동·액티비티</MenuItem>
                      <MenuItem value={3}>푸드·드링크</MenuItem>
                    </Select>
                  </FormControl>
                </td>
              </tr>
              <tr>
                <td>
                  <label>지역</label>
                </td>
                <td>
                  <FormControl sx={{ m: 0.5, width: 400 }}>
                    <Select value={groupLocal} onChange={handleChange3}>
                      <MenuItem value={1}>서울</MenuItem>
                      <MenuItem value={2}>경기</MenuItem>
                      <MenuItem value={3}>부산</MenuItem>
                    </Select>
                  </FormControl>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="group-thumbnail">
          {groupImg === null ? (
            <img src="/image/default.png" />
          ) : (
            <img src={groupImg} />
          )}
        </div>
      </div>
      <div className="group-content-box">
        <TextEditor
          data={groupContent}
          setData={setGroupContent}
          url="/group/contentImg"
        />
      </div>
      <div className="group-btn-box">
        {type === "modify" ? (
          <Button1 text="수정하기" clickEvent={buttonEvent} />
        ) : (
          <Button1 text="작성하기" clickEvent={buttonEvent} />
        )}
      </div>
    </div>
  );
};

export default GroupFrm;
