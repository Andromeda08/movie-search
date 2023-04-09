import React from 'react';
import { useStateContext } from '@/context/StateContext';
import { Movie } from '@/__generated__/graphql';
import { MovieCompact } from './Movie';

export const MovieSimilarPanel: React.FC = () => {
  const { selectedMovie: m } = useStateContext();

  return (
    <div className='movieSimilars'>
      <h1>Movies similar to <span className='text-white font-bold'>{ m!.name }</span></h1>
      <ul className='list'>
        { m?.similar.map((m: Movie) => (<MovieCompact key={m.id} movie={m} />)) }
      </ul>
    </div>
  );
}