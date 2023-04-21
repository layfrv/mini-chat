import React from 'react';
import './loader.modules.css';

export const Loader = () => {
  return (
    <div className='lds-ellipsis'>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};
