import './scss/GamePlaySection.scss';
import Game from './Game';
import {useState, useEffect} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";

const GamePlaySection = ({gameName}:{[key:string]:any}) => {
    const [nowGame, setGame] = gameName;
    const shortDescription = `초 슈퍼 울트라 빤타스틱 와이어 액션 고군분투 플래시게임입니다.
와플래시 게임 아카이브 사이트에서는 데스크탑, 태블릿, 모바일에서 플레이 가능합니다.
쉽다(?) 느끼신다면 개발자가 남긴 이스터에그인 1.5배속모드의 시원한 스피드감을 느껴보세요!
엔터치고, 박장희치고 엔터치면 렛츠고~ ?`;

    
    return (
        <section className='GamePlaySection'>
            <article id='gameName'>{nowGame}</article> 
            <Game></Game>
            <article className='shortDescription'>
                <div>
                    {shortDescription}
                </div>
            </article>
            <article className='longDescription'>
                <h1>조작방법</h1>
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
                </div>
            </article>
        </section>
    );
};


export default GamePlaySection;