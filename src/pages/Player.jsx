import React from 'react'
import styled from 'styled-components'
import {BsArrowLeft} from 'react-icons/bs'
import YouTubeVideo from '../components/Youtube'
import { useNavigate, useLocation } from 'react-router-dom'

const Player = () => {

  const navigate = useNavigate()
  const location = useLocation();
  const videoId = location.state?.videoId || '';
  return (
    <Container>
      <div className='player'>
        <div className='back'>
          <BsArrowLeft onClick={() => navigate(-1)}/>
        </div>
       <YouTubeVideo videoId={videoId}/>
      </div>
    </Container>
  )
}

export default Player

const Container = styled.div`
.player {
    width: 100vw;
    height: 100vh;
    .back {
      position: absolute;
      padding: 2rem;
      z-index: 1;
      svg {
        font-size: 3rem;
        cursor: pointer;
      }
    }
    ${YouTubeVideo} {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }`;