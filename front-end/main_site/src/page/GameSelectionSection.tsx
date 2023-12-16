import './scss/GameSelectionSection.scss';
import {useState} from 'react';
import { Link } from 'react-router-dom';

interface game {
    gameName: string;
    gameSrc: string;
    gameDescription: string;
    gameID: Number;
}
interface tag {
    [key: string]: game[];
}
interface see {
    [key: string]: string;
}
const GameSelectionSection = ({setGame, gameObject}:{[key:string]: any, gameObject : tag}) => {

    const articleList:any = [];
    const [seeMore, setSeeMore] = useState<see>({});

    for (const key in gameObject) {
        const gameName:string = key;
        const seeMoreString:string = seeMore[gameName] !== "heightFlag" ? "+ 더 보기" : "- 접기";
        const gameList: any = gameObject[gameName].map((v, i) => {
            return (
                <Link to={`game/`} key={Math.random()} onClick={() => setGame(v)}>
                    <img alt='' src={`${process.env.PUBLIC_URL}/images/game_main_images/${v.gameSrc}.jpg`}></img>
                    <p>{v.gameName}</p>
                </Link>
            );
        });
        let gamePlusViewButton = [];
        if (gameList.length > 5) {
            gamePlusViewButton.push(
                <div className='gamePlusViewButtonBox' key={Math.random()}>
                    <button onClick={() => {
                        if (seeMore[gameName] !== "heightFlag") {
                            setSeeMore({ ...seeMore, [key]: "heightFlag" });
                        } else {
                            setSeeMore({ ...seeMore, [key]: "" });
                        }
                    }}> {seeMoreString} </button>
                </div>
            );            
        }
        articleList.push(
            <article key={Math.random()}>
                <div className='gameTag'>{gameName}</div>   
                <div className={`gameListBox ${seeMore[gameName]}`}>
                    {gameList}
                </div>
                {gamePlusViewButton}
            </article>
        );
    }


    return (
        <section className='GameSelectionSection'>
            {articleList}
        </section>
    );
};


export default GameSelectionSection;