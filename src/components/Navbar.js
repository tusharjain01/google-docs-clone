import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const { currentUser, logout } = useAuth();
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();
  // console.log(currentUser);
  // console.log(currentUser?.photoURL);
  useEffect(() => {
    if (currentUser?.photoURL) {
      setPhoto(currentUser?.photoURL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand>
            <Link to="/" style={{"textDecoration" : "none","display" : "inline-block","color" : "black","textAlign" : "center"}}>
              <img
                src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="google-docs-logo"
              />{" "}
              Doc
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            {currentUser ? (
              <>
                <img
                  src={photo ? photo : "https://i.pinimg.com/originals/6b/aa/98/6baa98cc1c3f4d76e989701746e322dd.png"}
                  width="40"
                  height="40"
                  className="d-inline-block align-top user-logo"
                  alt="user's logo"
                  style={{
                    borderRadius: "50%",
                  }}
                  onClick={logoutHandler}
                />
              </>
            ) : (
              <></>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <img src="./google-docs.png"></img> */}
    </>
  );
}

export default NavBar;
