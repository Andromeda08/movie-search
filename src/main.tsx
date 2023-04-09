import './styles/global.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';
import { StateProvider } from './context/StateContext';

const client = new ApolloClient({
  uri: 'https://tmdb.sandbox.zoosh.ie/dev',
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ApolloProvider client={ client }>
    <StateProvider>
      <App />
    </StateProvider>
  </ApolloProvider>
);