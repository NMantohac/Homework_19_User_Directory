import React from 'react';
import './style.css';

const Header = () => {
  return (
    <div className="header">
      <h1 className="header-title">Employee Directory</h1>
      <p className="header-subtitle">Click on name header to rearrange alphabetically or use the search box to narrow your results</p>
    </div>
  );
};

export default Header;
