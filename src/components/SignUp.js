import React,{useRef, useState} from 'react'
import { Form,Button,Card, Alert } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext';
import { Link,useNavigate } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc,setDoc } from 'firebase/firestore';

function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const { signUp } = useAuth()
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate()
    async function handleSubmit(e){
        e.preventDefault();
        if(passwordRef.current.value !== confirmPasswordRef.current.value){
            return setError("Password do not match");
        }
        try{
            setError('');
            setLoading(false);
            const userCredential = await signUp(emailRef.current.value,passwordRef.current.value);
            const user = userCredential.user;
            const userDocRef = doc(db,"users",user.uid);
            console.log(userDocRef);
            const docCredentials = await setDoc(userDocRef,{
                email : user.email
            })
            console.log(docCredentials);
            navigate("/login");
        }
        catch(error){
            console.log(error.message)
            setError('Failed to create an account')
        }
    }
  return (
    <>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Sign Up</h2>
                {error && <Alert variant='danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id = "email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type='email' ref = {emailRef} required/>
                    </Form.Group>
                    <Form.Group id = "password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' ref = {passwordRef} required/>
                    </Form.Group>
                    <Form.Group id = "password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type='password' ref = {confirmPasswordRef} required/>
                    </Form.Group>
                    <Button type='submit' className='w-100 mt-4' disabled = {loading}>
                        Sign Up
                    </Button>
                </Form>
                <p className='text-center'>
                    or SignIn Using <Link to='/signin'>Google</Link>
                </p>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account ? <Link  to="/login" >Login</Link>
        </div>
    </>
  )
}

export default SignUp