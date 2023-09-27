import { useState } from "react";
import "./group.css";
import Input from "../util/InputFrm";

const GroupFrm = (props) => {
    const groupName = props.groupName;
    const setGroupName = props.setGroupName;
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
    return(
        <div className="group-frm-wrap">
            <div className="group-frm-top">
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
                                    setData = {setGroupName}
                                    content = "groupName"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="groupImg">모임 썸네일</label>
                            </td>
                            <td>
                                <input type="file" id="groupImg" accept="image/*"/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="groupMaxNum">모임 최대 인원수</label>
                            </td>
                            <td>
                                <Input
                                    type="text"
                                    data={groupMaxNum}
                                    setData = {groupMaxNum}
                                    content = "groupMaxNum"
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
        </div>
    )
}

export default GroupFrm;