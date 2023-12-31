import './scss/GameSelectionSection.scss';
import {useEffect, useState} from 'react';
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
    const [test] = useState([
        {color:"#8F63C8"},
        {color:"#4DBBDC"},
        {color:"#C8A063"},

    ]);
    const [newGameList, setNewGameList] = useState<any>([]);
    const articleList:any = [];
    const [seeMore, setSeeMore] = useState<see>({});
    const [slideIndex, setSlideIndex] = useState(0);
    const [autoSlideStop, setAutoSlideStop] = useState(false);

    const nextSlideEvent = () => {
        if (slideIndex > -1) {
            setSlideIndex(slideIndex - 1);
        } else {
            const testBox: any | null = document.getElementsByClassName("test");

            if (testBox !== null && testBox.length > 2) {
                for (let i = 0; i < 3; i++) {
                    testBox[i].classList.add("z");
                    testBox[i].style.transform = `translate(${2 * 128}rem)`;
                } 
                setTimeout(() => {
                    setSlideIndex(1);
                }, 1);
            }
        }
    };
    const prevSlideEvent = () => {
        if (slideIndex < 1) {
            setSlideIndex(slideIndex + 1);
        } else {
            const testBox: any | null = document.getElementsByClassName("test");

            if (testBox !== null && testBox.length > 2) {
                for (let i = 0; i < 3; i++) {
                    testBox[i].classList.add("z");
                    testBox[i].style.transform = `translate(${-2 * 128}rem)`;
                    console.log(testBox[i]);
                } 
                setTimeout(() => {
                    setSlideIndex(-1);
                }, 1);
            }
        }
    };
    const [time, setTime] = useState<any>();

    useEffect(() => {
        setTime(setTimeout(nextSlideEvent, 3000));
    }, [slideIndex, autoSlideStop]);

    useEffect(() => {
        if (autoSlideStop) {
            clearInterval(time);
        }
    }, [time, autoSlideStop]);

    useEffect(() => {
        const testBox:any|null = document.getElementsByClassName("test");

        if (testBox !== null && testBox.length > 2) {
            for (let i = 0; i < 3; i++) {
                testBox[i].classList.remove("z");
                testBox[i].style.transform = `translate(${slideIndex * 128}rem)`;
            }
        }

    }, [slideIndex]);

    useEffect(() => {
        let tempList:any = [];
        for (let i = 0; i < 3; i++) {
            tempList.push(
                <div key={Math.random()} className='test'>
                    {
                        test.map((v) => <div 
                            onMouseOver={() => setAutoSlideStop(true)} onMouseOut={() => setAutoSlideStop(false)}
                            key={Math.random()} style={{ backgroundColor: v.color }}>
                        </div>)
                    }
                </div>
            );
        }
        setNewGameList(tempList);
    }, []);

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
            <article className='newGames'>
                <div className='buttonBox'>
                    <button onClick={prevSlideEvent} onMouseOver={() => setAutoSlideStop(true)} onMouseOut={() => setAutoSlideStop(false)}>{"<"}</button>
                    <button onClick={nextSlideEvent} onMouseOver={() => setAutoSlideStop(true)} onMouseOut={() => setAutoSlideStop(false)}>{">"}</button>
                </div>
                <div className='gameList'>
                    <div>
                        {newGameList}
                    </div>
                </div>
            </article>
            <article className='popularGames'>
                <div className='gameTag'>인기게임</div>
                <div className="gameList">
                    <div className='gameBox'></div>
                    <div className='gameBox'></div>
                    <div className='gameBox'></div>
                </div>
            </article>
            <article className='allGames'>
                <div className='gameTag'>전체게임</div>
                <div className='gameTagBox'>
                    <p className='selecttionFlag'>#슈팅</p>
                    <p>#경쟁</p>
                    <p>#전투</p>
                    <p>#퍼즐</p>
                    <p>#탈출</p>
                    <p>#카드게임</p>
                    <p>#리듬</p>
                    <p>#심리</p>
                </div>
                <div className="gameList">
                    <div className='gameBox'></div>
                    <div className='gameBox'></div>
                    <div className='gameBox'></div>
                </div>
            </article>
            {/*articleList*/}
        </section>
    );
};


export default GameSelectionSection;