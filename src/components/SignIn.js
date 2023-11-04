// import { Button } from 'bootstrap'
import React from "react";
import { Card, Container } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const { googleSignUp } = useAuth();
    // console.log(googleSignUp)
    const navigate = useNavigate();
    const submitHandler = () => {
      googleSignUp()
      .then(() => {
        console.log("Success")
        navigate("/")
      })
      .catch((error)=>{
        console.log(error.message);
      })
    }
  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-center align-items-center mt-50">
        <Card>
          <Card.Body>
            <h1 className="text-center mb-4">Welcome!</h1>
            <button
              type="button" 
              className="btn btn-outline-dark" 
              onClick={submitHandler}
            >
            <img width="48" height="48" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
                Sign In Google Account
            </button>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default SignIn;
