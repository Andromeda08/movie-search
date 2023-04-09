import React from 'react';
import { useStateContext } from '@/context/StateContext';

export const MovieTabNav: React.FC = () => {
  const { selectedTab, setSelectedTab } = useStateContext();

  return (
    <div className='detailsTabs'>
      <button
        onClick={ () => setSelectedTab('details') }
        className={ selectedTab === 'details' ? 'active' : '' }
      >
        Details
      </button>
      <button
        onClick={ () => setSelectedTab('similar') }
        className={ selectedTab === 'similar' ? 'active' : '' }
      >
        Similar Movies
      </button>
    </div>
  );
}