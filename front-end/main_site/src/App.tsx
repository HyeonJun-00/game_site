import TopSection from './page/TopSection';
import GameSelectionSection from './page/GameSelectionSection';
import './page/scss/App.scss';
import {useState} from 'react';

const App = () => {
  const [user, ] = useState(`${new Date().getTime() % 1000000}`);
  console.log(1);
  return (
    <div className="App">
      <TopSection user={user}></TopSection>
      <GameSelectionSection></GameSelectionSection>
    </div>
  );
}

export default App;
