import React from 'react';
import { Movie, Genre } from '@/__generated__/graphql';
import { ratingColorSpectrum } from '@/util';
import { useStateContext } from '@/context/StateContext';

const MovieCompact: React.FC<{
  movie: Movie
}> = ({ movie }) => {
  const { name, score, genres, releaseDate } = movie;

  const { setSelectedMovie } = useStateContext();
  const ratingColor = ratingColorSpectrum(score);
  const date = new Date(releaseDate);

  return (
    <li className='movie'>
      <div className='head'>
        <button onClick={ () => setSelectedMovie(movie) }>
          <h4 className='title'>{name} <span className='year'>({ date.getUTCFullYear() })</span></h4>
        </button>
        <p className='score'><span style={{ color: ratingColor }}>{ score.toFixed(1) }</span>/10</p>                
      </div>
      <div className='genres'>
        { genres.map((g: Genre) => (<span key={g.id} className='badge'>{ g.name }</span>)) }
      </div>
    </li>
  );
}

export {
  MovieCompact
};