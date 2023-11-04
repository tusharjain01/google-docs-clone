import { useState } from "react";
import './style/CreateNewDoc.css'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import { Container } from "react-bootstrap";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateNewDoc() {
  const [show,setShow] = useState(false);
  const [enteredTitle,setEnteredTitle] = useState("Untitled");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { currentUser } = useAuth();
  const colRef = collection(db,"users",currentUser.uid,"docs");
  const navigate = useNavigate()
  const createHandler = async() => {
    const querySnapShot = await addDoc(colRef,{
      title : enteredTitle,
      content : "",
      createdOn : serverTimestamp()
    })
    navigate(`/edit/${querySnapShot.id}`)
  }
  return (
    <div className="container new-doc">
        <p>Start a new Doc</p>
        <img 
          src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png" 
          alt = "Click to create new doc" 
          style={{
            "objectFit" : "contain",
            "border" : "1px solid black",
            "width" : "10rem",
            "marginBottom" : "1rem"
          }}
          onClick={() => handleShow()}
        />
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter a Document title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" placeholder="Enter title..." value={enteredTitle} onChange={(e) => setEnteredTitle(e.target.value)} autoFocus/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>createHandler()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        <h6>Blank</h6>
    </div>
  )
}

