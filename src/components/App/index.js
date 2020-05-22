import React from 'react';
import Main from '../Main';
import Wrapper from '../Wrapper';
import Header from '../Header';

import './style.css';

const App = () => {
  return (
    <div className="App">
      <Wrapper>
        <Header />
        <Main />
      </Wrapper>
    </div>
  );
};

export default App;
