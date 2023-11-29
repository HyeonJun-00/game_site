import TopSection from './page/TopSection';
import GameSelectionSection from './page/GameSelectionSection';
import LogIn from './page/LogIn';
import './page/scss/App.scss';
import {useState} from 'react';

const App = () => {
  const [user, setUser] = useState(`${new Date().getTime() % 1000000}`);

  return (
    <div className="App">
      <TopSection user={user} LogIn={LogIn}></TopSection>
      <GameSelectionSection></GameSelectionSection>
    </div>
  );
}

export default App;
