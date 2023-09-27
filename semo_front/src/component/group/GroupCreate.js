import { useState } from "react";
import GroupFrm from "./GroupFrm";

const GroupCreate = () => {
    const [groupName, setGroupName] = useState("");
    const [groupImg, setGroupImg] = useState("");
    const [groupMaxNUm, setGroupMaxNum] = useState(0);
    const [groupContent, setGroupContent] = useState("");
    const [groupCategory, setGroupCategory] = useState(0);
    const [groupLocal, setGroupLocal] = useState(0);

    const create = () => {
        
    }

    return(
        <div>
            <div className="group-frm-title">모임 생성</div>
            <GroupFrm 
                groupName={groupName}
                setGroupName={setGroupName}
                groupImg={groupImg}
                setGroupImg={setGroupImg}
                groupMaxNum={groupMaxNUm}
                setGroupMaxNum={setGroupMaxNum}
                groupContent={groupContent}
                setGroupContent={setGroupContent}
                groupCategory={groupCategory}
                setGroupCategory={setGroupCategory}
                groupLocal={groupLocal}
                setGroupLocal={setGroupLocal}
                buttonEvent = {create}
                type="write"
            />
        </div>
    )
}
export default GroupCreate;