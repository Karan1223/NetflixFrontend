import React, {useState} from 'react'
import styled from "styled-components";
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import {onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from 'react-router-dom';

const Singup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [formValues, setFormValues] = useState(
    {
      email: "",
      password: ""
    })
  
    const [signupError, setSignupError] = useState(null); // State for error handling
  

    const handleSignIn = async () => {
      try {
        const { email, password} = formValues;
        await createUserWithEmailAndPassword(firebaseAuth, email, password)

        setSignupError(null); // Clear any previous errors
        navigate("/login");

      } catch (error) {
        setSignupError(error.message);
        console.log(error)
        
      }
    } 
    onAuthStateChanged(firebaseAuth,(currentUser) => {
      if(currentUser) navigate("/");
    })
  return (
    <Container showPassword={showPassword}>
        <BackgroundImage/>
        <div className='content'>
        <Header/>
        <div className='body flex column a-center j-center'>
            <div className='text flex column'>
                <h1>Unlimited movies, TV shows and more</h1>
                <h4> Watch anywhere. Cancel anytime.</h4>
                <h6>Ready to watch? Enter you email to create or restart membership</h6>
            </div>
            <div className='form'>
                <input type='email' placeholder='Email Address' name='email' 
                  value={formValues.email} onChange={(e) => setFormValues({...formValues,[e.target.name]:e.target.value})}
                />
                {
                  showPassword && (  <input type='password' placeholder='Password' name='password'
                  value={formValues.password} 
                  onChange={(e) => setFormValues({...formValues,[e.target.name]:e.target.value})}/>
                )}
               
                { !showPassword && (
                  <button onClick={() => setShowPassword(true)}>Get Started</button>
                )}
            </div>
              <button onClick={handleSignIn}>Sign Up</button>
              {signupError && (
            <p className="error-message">{signupError}</p>
          )}
        </div>
        </div>
    </Container>
  )
}

export default Singup

const Container = styled.div`
position: relative;
.content{
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.5);
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: 15vh 85vh;
  .body{
    gap: 1rem;
    .text{
      gap: 1rem;
      text-align: center;
      font-size: 2rem;
      h1{
        padding: 0 10vw;
      }
    }
    .form
    {
      display: grid;
       grid-template-columns: ${({showPassword}) => showPassword ? "1fr 1fr":"2fr 1fr"}; 
      width: 60vw;
      input{
        color: black;
        border: none;
        padding: 1.5rem;
        font-size: 1.2rem;
        border: 1px solid black;
        &:focus{
          outline: none;
        }
      }
      .success-message {
        /* Styles for the success message */
        text-align: center;
        color: green;
        margin-bottom: 1rem;
      }
      button{
        padding: 0.1rem 0.5rem;
    background-color: #e50914;
    border: none;
    cursor: pointer;
    color: white;
    font-weight: bolder;
    font-size: 1.05rem;
      }
    }
    button{
      padding: 8px 12px;
    background-color: #F5F3F4;
    border: none;
    cursor: pointer;
    color: RED;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 15px;
    }
  }
  
}
`;