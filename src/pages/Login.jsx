import {useState, React} from 'react'
import styled from "styled-components";
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import {onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from "../utils/firebase-config";
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogIn = async () => {
    try {
      const { email, password } = formValues;
      await signInWithEmailAndPassword(firebaseAuth, email, password);
    } catch (error) {
      setErrors('Incorrect Email and Password');
      console.log(error);
    }
  };

  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) navigate('/');
  });

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header />
        <div className="form-container flex column a-center j-center">
          <div className="form flex column a-center j-center">
            <div className="title">
              <h3>Login</h3>
            </div>
            <div className="container flex column">
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                required
                value={formValues.email}
                onChange={(e) =>
                  setFormValues({ ...formValues, [e.target.name]: e.target.value })
                }
              />

              <div className="password-input">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  name="password"
                  required
                  value={formValues.password}
                  onChange={(e) =>
                    setFormValues({ ...formValues, [e.target.name]: e.target.value })
                  }
                />
                <AiFillEyeInvisible className="password-icon" onClick={handleTogglePassword} />
              </div>

              <button onClick={handleLogIn}>Login</button>
              {errors && <p className="color">{errors}.</p>}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .form-container {
      gap: 2rem;
      height: 85vh;
      .form {
        padding: 2rem;
        background-color: rgba(0, 0, 0, 0.2);
        width: 25vw;
        gap: 2rem;
        color: white;
        border-radius: 0.5rem;
        .title {
          font-size: 25px;
        }
        .container {
          gap: 2rem;
          input {
            padding: 0.5rem 1rem;
            width: 15rem;
          }
          button {
            padding: 10px;
            width: 5rem;
            margin-left: 80px;
            background-color: #f5f3f4;
            border: none;
            cursor: pointer;
            color: red;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 15px;
          }
          .color {
            color: white;
          }
        }
      }
    }
  }
  .password-input {
    position: relative;
  }
  .password-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    color: black;
  }
`;
