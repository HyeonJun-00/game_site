import './scss/Game.scss';
import ShootingCat from './game_component/ShootingCat';
import OmokGod from './game_component/OmokGod';

const Game = ({nowGame, user, setUser}:{[key:string]:any}) => {
    const gameName:string = nowGame.gameSrc;
    const nowGameComponent = {
        "": <></>,
        "shooting_cat": <ShootingCat user={user} setUser={setUser}></ShootingCat>,
        "omok_god": <OmokGod user={user} setUser={setUser}></OmokGod>,
    }[gameName];

    return (
        <article className='Game'>
            {nowGameComponent}
        </article>
    );
};


export default Game;