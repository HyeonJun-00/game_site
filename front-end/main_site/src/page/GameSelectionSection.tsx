import './scss/GameSelectionSection.scss';
import {useState} from 'react';

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
const GameSelectionSection = () => {

    const gameObject : tag = {
        "전체 게임": [
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" },
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" },
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" },
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" },
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" },
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" },
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" },
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" }
        ],
        "보드 게임": [
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" },
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" },
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" },
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" },
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" },
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" },
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" },
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" },
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" },
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" }
        ]
    };
    const articleList:any = [];
    const [seeMore, setSeeMore] = useState<see>({});

    console.log(seeMore);
    for (const key in gameObject) {
        const gameName:string = key;
        const gameList: any = gameObject[gameName].map((v) => {
            return (
                <div key={Math.random()}>
                    <img alt='' src={v.gameLink}></img>
                    <p>{v.gameName}</p>
                </div>
            );
        });
        let seeMoreString:string = seeMore[gameName] !== "heightFlag" ? "+ 더 보기" : "- 접기";

        articleList.push(
            <article key={Math.random()}>
                <div className='gameTag'>{gameName}</div>   
                <div className={`gameListBox ${seeMore[gameName]}`}>
                    {gameList}
                </div>
                <div className='gamePlusViewButtonBox'>
                   <button onClick={() => {
                    if (seeMore[gameName] !== "heightFlag") {
                        setSeeMore({...seeMore, [key]:"heightFlag" });
                    } else {
                        setSeeMore({...seeMore, [key]:"" });
                    }
                    }}> {seeMoreString} </button> 
                </div>
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