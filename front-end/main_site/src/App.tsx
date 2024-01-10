import './page/scss/App.scss';
import TopSection from './page/TopSection';
import BottomSection from './page/BottomSection';
import GameSelectionSection from './page/GameSelectionSection';
import GamePlaySection from './page/GamePlaySection';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

interface game {
  gameName: string;
  gameSrc: string;
  gameDescription: string;
  gameID: Number;
}
interface tag {
  [key: string]: game[];
}

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['id']);
  const [gameObject, setGameObjet] = useState<tag>({});
  const [user, setUser] = useState((cookies.id && {name:cookies.id, gold:0}) || {name:"Login"});
  const [nowGame, setGame] = useState("");
  const [inGame, setIngame] = useState("");
  const locationPathname = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (locationPathname !== "/") { setIngame("inGame"); }
    else { setIngame(""); }
  }, [locationPathname]);

  useEffect(() => {
    if (locationPathname !== "/" && nowGame === "") {
      navigate("/", { replace: true });
    }
  }, [locationPathname, navigate, nowGame]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('http://35.216.113.72:10096/game');
        const tempObject: { [key: string]: any | undefined } = { "전체 게임": [] };
        const resData = response.data.filter((v: { [key: string]: any; }) => v.view);
        
        resData.forEach((v: { [key: string]: any; }) => {
          const gameTag = v.tag.trim().split("#");
          const gameName = v.name;
          const gameID = v.id;
          const gameDescription = v.description;
          const gameSrc = v.english;

          gameTag.forEach((v: string) => {
            if (v === "") { return; }
            if (tempObject[`${v} 게임`] === undefined) {
              tempObject[`${v} 게임`] = [];
            }
            if (!tempObject["전체 게임"].some((v: { gameName: string;}) => v.gameName === gameName)) {
              tempObject["전체 게임"].push({ gameName, gameID, gameDescription, gameSrc });
            }
            tempObject[`${v} 게임`].push({ gameName, gameID, gameDescription, gameSrc });
          });
        });
        setGameObjet(tempObject);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div className="App">
      <TopSection inGame={inGame} loginCookie={[cookies, setCookie, removeCookie, setUser]} user={user}></TopSection>
      <Routes>
        <Route path='/' element={<GameSelectionSection setGame={setGame} gameObject={gameObject} />}></Route>
        <Route path='game/' element={<GamePlaySection thisGame={[nowGame, setGame]} user={user} />}></Route>
      </Routes>
      <BottomSection></BottomSection>
    </div>
  );
}

export default App;
