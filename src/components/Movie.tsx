import React from 'react';
import { Movie, Genre } from '@/__generated__/graphql';
import { ratingColorSpectrum } from '@/util';
import { useStateContext } from '@/context/StateContext';
import { gql } from '@/__generated__';
import { useQuery } from '@apollo/client';

const GET_MOVIE = gql(`
  query GetMovie($id: ID!) {
    movie(id: $id) {
      id
      name
      score
      overview
      releaseDate
      genres {
        ... on Genre {
          id
          name
        }
      }
      img: poster {
        url: custom(size: "w185_and_h278_bestv2")
      }
      similar(limit: 10) {
        id
        name
        score
        overview
        releaseDate
        genres {
          ... on Genre {
            id
            name
          }
        }
        img: poster {
          url: custom(size: "w185_and_h278_bestv2")
        }
      }
    }
  }
`);

const MovieCompact: React.FC<{
  movie: Movie
}> = ({ movie }) => {
  const { id: mid, name, score, genres, releaseDate } = movie;

  const { setSelectedTab ,setSelectedMovie } = useStateContext();
  const { loading, data } = useQuery<{ movie: Movie }>(GET_MOVIE, { variables: { id: mid } });
  
  const ratingColor = ratingColorSpectrum(score);
  const date = new Date(releaseDate);

  const selectMovie = () => {
    setSelectedMovie(data!.movie);
    setSelectedTab('details');
  }

  return (
    <li className='movie'>
      <div className='head'>
        <button onClick={ () => selectMovie() }>
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