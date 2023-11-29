import './scss/GameSelectionSection.scss';

const GameSelectionSection = () => {

    interface game {
        gameName: string;
        gameLink: string;
    }
    interface tag {
        [key: string]: game[];
    }

    const gameObject : tag = {
        "전체 게임": [
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
            { gameName: "아쿠아리움 드레스업 (Aquarium Dressup)", gameLink: "" }
        ]
    };
    const articleList:any = [];

    for (const key in gameObject) {
        const gameName:string = key;
        const gameList: any = gameObject[gameName].map((v) => {
            return (
                <div>
                    <img alt='' src={v.gameLink}></img>
                    <p>{v.gameName}</p>
                </div>
            );
        });
        articleList.push(
            <article key={Math.random()}>
                <div className='gameTag'>{gameName}</div>   
                <div className='gameListBox'>
                    {gameList}
                </div>
                <div className='gamePlusViewButtonBox'>
                   <button>+ 더보기</button> 
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