import React, { useEffect, useState } from 'react';
import { useStateContext,  } from '@/context/StateContext';
import { Genre } from '@/__generated__/graphql';
import { omdbSearchUrl, wikipediaSearchUrl } from '@/util';
import { FaLink } from 'react-icons/fa';

export const MovieDetailsPanel: React.FC = () => {
  const { selectedMovie: m } = useStateContext();

  const [ links, setLinks ] = useState<{ wp?: string, imdb?: string }>();
  const releaseDate = new Date(m!.releaseDate);

  const fetchWikipediaAndImdb = async () => {
    const wpRes = await fetch(wikipediaSearchUrl(m!.name), {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(res => res.json())
    .then(data => {
      setLinks({
        wp: data[3],
        imdb: links?.imdb,
      })
    })
    .catch(err => console.log(err));

    const omdbRes = await fetch(omdbSearchUrl(m!.name), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    }).then(res => res.json())
    .then(data => {
      setLinks({
        wp: links?.wp,
        imdb: `https://imdb.com/title/${ data.imdbID }`,
      })
    })
    .catch(err => console.log(err));
  }
  
  useEffect(() => {
    fetchWikipediaAndImdb();
  }, [])

  return (
    <div className='movieDetails'>
    { m && (
      <header>
        <div className='poster'>
          <img src={ m.img.url } alt="" />
        </div>
        <div>
          <h1 className='title'>{ m.name }</h1>
          <p>Release Date: { releaseDate.getUTCDay() }.{ releaseDate.getUTCMonth() }.{ releaseDate.getUTCFullYear() }.</p>
          <div className='genres'>
          { m.genres.map((g: Genre) => (<span key={g.id} className='badge'>{ g.name }</span>)) }
          </div>
          <div>
            <h3>Overview</h3>
            <p>{ m.overview }</p>
          </div>
          <div>
            <p>{ links?.wp }</p>
            <p>{ links?.imdb }</p>
          </div>
        </div>
      </header>
    )}
    </div>
  );
}