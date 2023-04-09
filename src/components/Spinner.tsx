import React from 'react';
import { CgSpinner } from 'react-icons/cg';

export const Spinner: React.FC = () => (
    <div className='spinner'>
        <CgSpinner size='2em' />
    </div>
);