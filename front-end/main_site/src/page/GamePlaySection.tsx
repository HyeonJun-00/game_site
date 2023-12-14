import './scss/GamePlaySection.scss';
import Game from './Game';
// import {useState, useEffect} from 'react';
// import {Route, Routes, useLocation, useNavigate} from "react-router-dom";

const GamePlaySection = ({thisGame, user}:{[key:string]:any}) => {
    const [nowGame, setGame] = thisGame;

    return (
        <section className='GamePlaySection'>
            <article id='gameName'>{nowGame.gameName}</article> 
            <Game nowGame={nowGame} user={user}></Game>
            <article className='shortDescription'>
                <div>
                    {nowGame.gameDescription}
                </div>
            </article>
            <article className='longDescription'>
                {/* <h1>조작방법</h1>
                <img src=''/>
                <div>
                    {`본 게임은 초 슈퍼 울트라 빤타스틱 어쩌구 저저구 게임이다.
스파이더 맨도 일주일에 한 번 이 동영상 강의를 받고 있다. 이게 뭔소리야;
자~ 마우스 왼쪽 버튼ㅇ르 때려보자`}
                </div>
                <img src=''/>
                <div>
                    {`점프를 하는 거다!!
여기서 다시 “바우스 왼쪽 버튼 클릭~~”`}
                </div> */}
            </article>
        </section>
    );
};


export default GamePlaySection;