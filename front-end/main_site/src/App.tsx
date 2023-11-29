import TopSection from './page/TopSection';
import GameSelectionSection from './page/GameSelectionSection';
import './page/scss/App.scss';
import React from 'react';

function App() {

  return (
    <div className="App">
      <TopSection></TopSection>
      <GameSelectionSection></GameSelectionSection>
    </div>
  );
}

export default App;
