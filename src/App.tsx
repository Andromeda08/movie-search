import { useStateContext } from './context/StateContext';
import { Sidebar } from './components/Sidebar';
import { MovieTabNav } from './components/MovieTabNav';
import { MovieDetailsPanel } from './components/MovieDetailsPanel';
import { MovieSimilarPanel } from './components/MovieSimilarPanel';

const App = () => {
  const { selectedMovie, selectedTab } = useStateContext();

  return (
    <div className='layout'>
      <Sidebar />
      <main className='flex flex-col gap-4'>
        <MovieTabNav />
        <div className='borderEffect p-2'>
          { selectedMovie
            ? selectedTab === 'details' && (<MovieDetailsPanel />) ||
              selectedTab === 'similar' && (<MovieSimilarPanel />)
            : <p className='text-sm text-zinc-600'>Select a movie for more details.</p>
          }
        </div>
      </main>
    </div>
  )
}

export default App
