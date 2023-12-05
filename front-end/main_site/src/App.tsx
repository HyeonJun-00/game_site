import './page/scss/App.scss';
import TopSection from './page/TopSection';
import GameSelectionSection from './page/GameSelectionSection';
import GamePlaySection from './page/GamePlaySection';
import {useEffect, useState} from 'react';
import { useCookies } from 'react-cookie';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['id']);
  const [user, setUser] = useState(cookies.id || `손님${new Date().getTime() % 1000000}`);
  const [nowGame, setGame] = useState("");
  const locationPathname = useLocation().pathname;
  const navigate = useNavigate();
  
  useEffect(() => {
    if (locationPathname !== "/" && nowGame === "") {
      navigate("/", { replace: true });
    }
  }, [locationPathname, navigate, nowGame]);

  return (
    <div className="App">
      <TopSection loginCookie={[cookies, setCookie, removeCookie, setUser]} user={user}></TopSection>
        <Routes>
          <Route path='/' element={<GameSelectionSection setGame={setGame}/>}></Route>
          <Route path='game/' element={<GamePlaySection gameName={[nowGame, setGame]} />}></Route>
        </Routes>
    </div>
  );
}

export default App;
