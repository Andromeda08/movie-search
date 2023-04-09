import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { Movie } from '@/__generated__/graphql';
import { gql } from '@/__generated__/gql';
import { SearchBar } from '@/components/SearchBar';
import { Spinner } from '@/components/Spinner';
import { MovieCompact } from '@/components/Movie';

const SEARCH_MOVIES = gql(`
  query SearchMovies($title: String!) {
    searchMovies(query: $title) {
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

export const Sidebar: React.FC = () => {
  const [ getMovies, { loading, data } ] = useLazyQuery<{ searchMovies: Movie[] }>(SEARCH_MOVIES);

  const searchMovie = (str: string) => getMovies({ variables: { title: str } });

  return (
    <aside className='sidebar'>
      <SearchBar searchFn={ searchMovie } />
      <ul className='searchResults'>
      {
        loading
        ? <Spinner />
        : data?.searchMovies ? (
          data.searchMovies.map((m: Movie) => (<MovieCompact key={m.id} movie={m} />))
        ) : <p className='text-sm text-zinc-600'>Search first for results</p>
      }
      </ul>
  </aside>
  );
}