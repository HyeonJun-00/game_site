import './page/scss/App.scss';
import TopSection from './page/TopSection';
import GameSelectionSection from './page/GameSelectionSection';
import GamePlaySection from './page/GamePlaySection';
import {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['id']);
  const [user, setUser] = useState(cookies.id || `손님${new Date().getTime() % 1000000}`);

  return (
    <div className="App">
      <TopSection loginCookie={[cookies, setCookie, removeCookie, setUser]} user={user}></TopSection>
        <Routes>
          <Route path='/' element={<GameSelectionSection />}></Route>
          <Route path='game/' element={<GamePlaySection />}></Route>
        </Routes>
    </div>
  );
}

export default App;
