import axios from "axios";
import { useMemo, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
Quill.register("modules/ImageResize", ImageResize);
const NoticeTextEditor = (props) => {
  const quillRef = useRef();
  const data = props.data;
  const setData = props.setData;

  //quill에디터 형식옵션을 담는 배열
  const formats = [
    "header",
    "font",
    "side",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "image",
    "color",
  ];
  //useMemo : 동일값을 반환하는경우 함수를 반복적으로 호출하는 것이 아니라 메모리에 저장해두고
  //바로 가져오는 hooks
  const modules = useMemo(() => {
    return {
      toolbar: {
        //툴바에 넣을 기능을 순서대로 나열
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
        ],
      },
    };
  }, []);
  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={data}
      formats={formats}
      onChange={setData}
      modules={modules}
    />
  );
};

export default NoticeTextEditor;
