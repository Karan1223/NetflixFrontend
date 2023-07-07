import React from 'react';
import Card from './Card';
import styled from 'styled-components';

const CardSlider = ({ data, title }) => {
  return (
    <Container className='flex column'>
      <h1>{title}</h1>
      <div className='wrapper'>
        <div className='flex slider'>
          {data.map((movie) => (
            <Card movieData={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default CardSlider;

const Container = styled.div`
  gap: 1rem;
  position: relative;
  padding: 2rem 0;
  h1 {
    margin-left: 50px;
  }
  .wrapper {
    .slider {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-left: 50px;
    }
  }
`;
