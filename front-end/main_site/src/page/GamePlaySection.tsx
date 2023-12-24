import './scss/GamePlaySection.scss';
import Game from './Game';

const GamePlaySection = ({thisGame, user}:{[key:string]:any}) => {
    const [nowGame, ] = thisGame;

    return (
        <section className='GamePlaySection'>
            <article id='gameName'>{nowGame.gameName}</article> 
            <Game nowGame={nowGame} user={user}></Game>
            <article className='shortDescription'>
                <div>
                    {nowGame.gameDescription}
                </div>
            </article>
        </section>
    );
};


export default GamePlaySection;