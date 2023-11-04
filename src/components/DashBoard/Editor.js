import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ReactQuill, { Quill } from "react-quill";
// import ImageResize from "quill-image-resize-module-react";
import "./Editor.css";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc,setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";

function Editor() {
  const [value, setValue] = useState("");
  const [docData,setDocData] = useState({});
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const param = useParams();
  // console.log(param.id);
  useEffect(() => {
    console.log("Mounted")
    const getData = async() => {
      try{
        const querySnapShot = await getDoc(doc(db,"users",currentUser.uid,"docs",param.id))
        if(querySnapShot.exists() === false){
          navigate("/");
        }
        setDocData(querySnapShot.data())
        setValue(querySnapShot.data().content);
      }
      catch{
        console.log("Trying to access someone else document");
      }
    }
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const handlerEditorChange = (newContent) => {
    setValue(newContent);
    updateDoc(doc(db,"users",currentUser.uid,"docs",param.id),{
      "content" : value
    })
  }
  // Quill.register("modules/imageResize", ImageResize);
  return (
    <Container className="mt-2">
    <h1 className="text-center">{docData?.title}</h1>
      <ReactQuill
        theme="snow"
        onChange={(event)=>{handlerEditorChange(event)}}
        modules={module}
        value={value}
        formats={formats}
        bounds={"#root"}
        placeholder="Write Something"
      />
      {/* <p>{value}</p> */}
    </Container>
  );
}
const module = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  // imageResize: {
  //   parchment: Quill.import("parchment"),
  //   modules: ["Resize", "DisplaySize"],
  // },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent"
];
export default Editor;
