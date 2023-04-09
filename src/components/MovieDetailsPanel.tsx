import React, { useEffect, useState } from 'react';
import { useStateContext,  } from '@/context/StateContext';
import { Genre } from '@/__generated__/graphql';
import { omdbSearchUrl, wikipediaSearchUrl } from '@/util';
import { FaLink } from 'react-icons/fa';
import axios from 'axios';

export const MovieDetailsPanel: React.FC = () => {
  const { selectedMovie: m } = useStateContext();

  const [ wiki, setWiki ] = useState<string>();
  const [ imdb, setImdb ] = useState<string>();
  const [ poster, setPoster ] = useState<string>();
  const releaseDate = new Date(m!.releaseDate);

  const fetchWikipediaAndImdb = async () => {
    const wpRes = await axios.get(wikipediaSearchUrl(m!.name))
    .then(res => setWiki(res.data[3]))
    .catch(err => console.log(err));

    const omdbRes = await axios.get(omdbSearchUrl(m!.name))
    .then(res => {
      setPoster(res.data.Poster);
      setImdb(`https://imdb.com/title/${res.data.imdbID}`)
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
          <img src={ poster } alt={`Poster for ${ m!.name }`} />
        </div>
        <div>
          <h1 className='title'>{ m.name }</h1>
          <p>Release Date: { releaseDate.getUTCDay() }.{ releaseDate.getUTCMonth() }.{ releaseDate.getUTCFullYear() }.</p>
          <div className='genres'>
          { m.genres.map((g: Genre) => (<span key={g.id} className='badge'>{ g.name }</span>)) }
          </div>
          <div className='overview'>
            <h3>Overview</h3>
            <p>{ m.overview }</p>
          </div>
          <ul className='links'>
            { wiki ? <a href={ wiki } target='_blank'><FaLink /> Wikipedia</a> : <></> }
            { imdb ? <a href={ imdb } target='_blank'><FaLink /> IMDb</a> : <></> }
          </ul>
        </div>
      </header>
    )}
    </div>
  );
}