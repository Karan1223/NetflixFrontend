import React, { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
//import YouTubeVideo from './Youtube';
import axios from 'axios';
import {IoPlayCircleSharp} from "react-icons/io5"
import {RiThumbUpFill, RiThumbDownFill} from "react-icons/ri"
import {BsCheck} from "react-icons/bs"
import {AiOutlinePlus} from "react-icons/ai"
import {BiChevronDown} from "react-icons/bi"
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../utils/firebase-config';
import { useDispatch} from 'react-redux';
import { removeMovieFromLiked } from '../store';

const Card = ({movieData,isLiked=false}) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate()
    const [email,setEmail] = useState(undefined);
    const dispatch = useDispatch();
    const [addedToList, setAddedToList] = useState(false);
    const [alreadyExists, setAlreadyExists] = useState(false);

    onAuthStateChanged(firebaseAuth,(currentUser) => {
      if(currentUser) setEmail(currentUser.email);
      else navigate("/login");
    })

    const addToList = async() => {
      try {
        const response = await axios.post("https://backendmovieflix.onrender.com/api/user/add",{email,data:movieData})
        if (response.data.msg === 'Movie already added to the list.') {
          setAlreadyExists(true); // Set alreadyExists to true when movie already exists
        } else {
          setAddedToList(true); // Set addedToList to true when movie is successfully added
        }
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      // Set a timeout to hide the messages after 2 seconds
      if (addedToList || alreadyExists) {
        const timeout = setTimeout(() => {
          setAddedToList(false);
          setAlreadyExists(false);
        }, 2000);
  
        // Clear the timeout if the component unmounts or the addedToList or alreadyExists state changes
        return () => clearTimeout(timeout);
      }
    }, [addedToList, alreadyExists]);
  
    const movieNameIdArray = useMemo(() => {
        return [
          { name: 'Extraction 2', id: 'Y274jZs5s7s' },
          { name: 'Spider-Man: Across the Spider-Verse', id: 'shW9i6k8cB0' },
          { name: 'Fast X', id: 'eoOaKN4qCKw' },
          { name: 'Indiana Jones and the Dial of Destiny', id: 'eQfMbSe7F2g' },
          { name: 'Secret Invasion', id: 'Tp_YZNqNBhw' },
          { name: 'The Witcher', id: 'SzS8Ao0H6Co' },
          { name: 'The Flash', id: 'jprhe-cWKGs' },
          

          // Add more movie names and IDs as needed
        ];
      }, []);
    
      // Get the video ID based on the movie name
      const getVideoId = (name) => {
        const movie = movieNameIdArray.find((movie) => movie.name === name);
        return movie ? movie.id : '';
      };
    
      const handlePlayButtonClick = () => {
        const videoId = getVideoId(movieData.name);
        navigate('/player', { state: { videoId } });
      };

  return (
    <Container onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} alt='movie'/>
        {
            isHovered && (
                <div className='hover'>
                    <div className='image-video-container'>
                    <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} 
                    alt='movie'
                        onClick={() => navigate("/player")}
                    />
                    {/* <YouTubeVideo className="video" videoId='mVsJXiI60a0'
                     onClick={() => navigate("/player")}></YouTubeVideo> */}
                    </div>
                    <div className='info-container flex column'>
                        <h3 className='name' onClick={() => navigate("/player") }>{movieData.name}</h3>
                    
                    <div className='icons flex j-between'>
                        <div className='controls flex'>
                            <IoPlayCircleSharp title='play' 
                            onClick={handlePlayButtonClick} />
                           <RiThumbUpFill title='Like'/> 
                           <RiThumbDownFill title='Dislike'/>
                           {
                            isLiked ? (
                                <BsCheck title='Remove From List' onClick={() => dispatch(removeMovieFromLiked({movieId:movieData.id,email}))}/>
                                ) : ( 
                                <AiOutlinePlus title='Add to my list' onClick={addToList}/>
                            )}
                        </div>
                        <div className='info'>
                            <BiChevronDown title='More Info'/>
                        </div>
                        <div className="genres flex">
                            <ul className="flex">
                                {movieData.genres?.map((genre) => (
                                <li>{genre}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            )
        }
        

      {/* Display the added to list message when addedToList is true */}
      {addedToList && <p className="success">Added to My List</p>}

      {/* Display the already exists message when alreadyExists is true */}
      {alreadyExists && <p className="error">Already in My List</p>}
    </Container>
  )
}

export default Card

const Container = styled.div`
max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.2rem;
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  .hover {
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.3rem;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #181818;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 145px;
      img {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      .video {
        width: 100%;
        height: 140px;
        object-fit: cover;
        border-radius: 0.3rem;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
    }
    .icons {
      .controls {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 2rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #b8b8b8;
        }
      }
    }
    .genres {
      ul {
        gap: 1rem;
        li {
          padding-right: 0.7rem;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
  .success {
    color: green;
    font-size: 1rem;
    margin-top: 0.5rem;
  }
  .error {
    color: red;
    font-size: 1rem;
    margin-top: 0.5rem;
  }
  `;