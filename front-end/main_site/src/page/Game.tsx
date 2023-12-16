import './scss/Game.scss';
import ShootingCat from './game_component/ShootingCat';
import OmokGod from './game_component/OmokGod';

const Game = ({nowGame, user}:{[key:string]:any}) => {
    const gameName:string = nowGame.gameSrc;
    const nowGameComponent = {
        "": <></>,
        "shooting_cat": <ShootingCat></ShootingCat>,
        "omok_god": <OmokGod></OmokGod>,
    }[gameName];

    return (
        <article className='Game'>
            {nowGameComponent}
        </article>
    );
};


export default Game;