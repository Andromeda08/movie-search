import { 
  FC, ReactNode,
  createContext, useContext, useState
} from 'react';
import { Movie } from '../__generated__/graphql';

export type MovieTab = 'details' | 'similar';
export type Theme = 'light' | 'dark';

export interface StateContextData {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;

  selectedMovie: Movie | undefined;
  setSelectedMovie: (m: Movie) => void;

  selectedTab: MovieTab;
  setSelectedTab: (t: MovieTab) => void;
};

const stateContextDefaults: StateContextData = {
  theme: 'dark',
  setTheme: (t: Theme) => {},
  toggleTheme: () => {},
  selectedMovie: undefined,
  setSelectedMovie: (m: Movie) => {},
  selectedTab: 'details',
  setSelectedTab: (t: MovieTab) => {}
};

const StateContext = createContext<StateContextData>(stateContextDefaults);

export const useStateContext = () => useContext(StateContext);

export const StateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [ theme, _setTheme ] = useState<Theme>(stateContextDefaults.theme);
  const [ movie, _setMovie ] = useState<Movie>();
  const [ tab, _setTab ] = useState<MovieTab>(stateContextDefaults.selectedTab);

  const setTheme = (t: Theme) => { _setTheme(t); }
  const setMovie = (m: Movie) => { _setMovie(m); }
  const setTab   = (t: MovieTab)   => { _setTab(t); }

  const toggleTheme = () => {
    if (theme === 'light') {
      _setTheme('dark');
    }
    else {
      _setTheme('light');
    }
  }

  const value: StateContextData = {
    theme,
    setTheme,
    toggleTheme,
    selectedMovie: movie,
    setSelectedMovie: setMovie,
    selectedTab: tab,
    setSelectedTab: setTab
  }

  return (
    <StateContext.Provider value={ value }>
      { children }
    </StateContext.Provider>
  )
};