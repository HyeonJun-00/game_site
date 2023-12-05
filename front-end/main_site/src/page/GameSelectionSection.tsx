import './scss/GameSelectionSection.scss';
import {useState} from 'react';
import { Link } from 'react-router-dom';

interface game {
    gameName: string;
    gameLink: string;
}
interface tag {
    [key: string]: game[];
}
interface see {
    [key: string]: string;
}
const GameSelectionSection = ({setGame}:{[key:string]:any}) => {

    const gameObject : tag = {
        "전체 게임": [
            {
                gameName: "고군분투",
                gameLink: "",
            },
        ],
        "보드 게임": [
            { 
                gameName: "고군분투", 
                gameLink: "" ,
            },
        ]
    };
    const articleList:any = [];
    const [seeMore, setSeeMore] = useState<see>({});

    for (const key in gameObject) {
        const gameName:string = key;
        const seeMoreString:string = seeMore[gameName] !== "heightFlag" ? "+ 더 보기" : "- 접기";
        const gameList: any = gameObject[gameName].map((v, i) => {
            return (
                <Link to={`game/`} key={Math.random()} onClick={() => setGame(v.gameName)}>
                    <img alt='' src={v.gameLink}></img>
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