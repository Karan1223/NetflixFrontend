import React from 'react';
import styled from 'styled-components';
import logo1 from '../assets/logo1.jfif';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const handleClick = () => {
    if (isLoginPage) {
      navigate('/signup');
    } else {
      navigate('/login');
    }
  };

  return (
    <Container className='flex a-center j-between'>
      <div className='logo'>
        <img src={logo1} alt="logo" />
      </div>
      <button onClick={handleClick}>
        {isLoginPage ? "Sign Up" : "Log In"}
      </button>
    </Container>
  );
};

export default Header;


const Container = styled.div`
padding: 0 4rem;
.logo {
  img{
    height: 5rem;
  }
}
button
{
      padding: 8px 12px;
    background-color: #F5F3F4;
    border: none;
    cursor: pointer;
    color: red;
    border-radius: 0.2rem;
    font-weight: bolder;
    font-size: 15px;
  }
`;