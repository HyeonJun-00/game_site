import TopSection from './page/TopSection';
import GameSelectionSection from './page/GameSelectionSection';
import './page/scss/App.scss';
import {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['id']);
  const [user, setUser] = useState(cookies.id || `손님${new Date().getTime() % 1000000}`);

 //     removeCookie('id');
  return (
    <div className="App">
      <TopSection loginCookie={[cookies, setCookie, removeCookie, setUser]} user={user}></TopSection>
      <GameSelectionSection></GameSelectionSection>
    </div>
  );
}

export default App;
