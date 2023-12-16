import './scss/TopSection.scss';
import CreateID from './CreateID';
import LogIn from './LogIn';
import {useState, useEffect} from 'react';
import {Link, redirect} from 'react-router-dom';
import { useCookies } from 'react-cookie';

interface state {
    user : string;
    loginCookie:any;
    inGame:string;
}

const TopSection = ({inGame, user, loginCookie}: state) => {
    const [cookies, setCookie, removeCookie, setUser] = loginCookie;
    const [logInClass, setLogInClass] = useState("");
    const [createIDClass, setCreateIDClass] = useState("");
    const [userBoxClass, setFlag] = useState("");
    const [userBox, setUserBox] = useState(<></>);
    const [profileImg, setProfileImg] = useState("guest_profile");
    const profileClickEvnet = () => {
        if (cookies.id === undefined) {setLogInClass("displayFlag");} 
        else if (userBoxClass === "") { setFlag("displayFlag"); }
        else { setFlag(""); }
    };
    useEffect(() => {
        if (cookies.id === undefined) {
            setProfileImg("guest_profile");
            setUserBox(<></>);
        } else {
            setProfileImg("user_profile");
            setUserBox(
                <>
                    <li key={Math.random()} onClick={() => {
                        setFlag("");
                    }}>마이페이지</li>
                    <li key={Math.random()} onClick={() => {
                        window.location.href = "http://kkms4001.iptime.org/~c18st09/project/game_site/front-end/admin_site/html/admin.html";
                    }}>관리자 페이지</li>
                    <li key={Math.random()} onClick={() => {
                        removeCookie("id");
                        setFlag("");
                        setUser(`손님${new Date().getTime() % 1000000}`);
                    }}>로그아웃</li>
                </>
            );           
        }
    }, [user]);

    return (
        <section className={`TopSection ${inGame}`}>
            <article className='topContentArticle'>
                <div className='topLeftBox'>
                    <Link to="/">
                        <img id='logo' src={`${process.env.PUBLIC_URL}/images/logo.png`} alt='logo'></img>
                    </Link>
                </div>
                <div className='topCenterBox'>
                    <div className='searchBox'>
                        <input placeholder='원하는 게임을 검색해 보세요!'></input>
                        <img id='searchButton' src={`${process.env.PUBLIC_URL}/images/search_button.png`} alt='search_button'></img>
                    </div>
                </div>
                <div className='topRightBox'>
                    <p onClick={() => profileClickEvnet()}>{user+"님"}</p>
                    <img id='profile' src={`${process.env.PUBLIC_URL}/images/${profileImg}.png`} alt='profile' onClick={() => profileClickEvnet()}></img>
                    <ul id='userBox' className={userBoxClass}>
                        {userBox}
                    </ul>
                </div>
            </article>
            <LogIn loginCookie={loginCookie} logIn={[logInClass, setLogInClass]} setCreateIDClass={setCreateIDClass}></LogIn>
            <CreateID displayFalg={[createIDClass, setCreateIDClass]}></CreateID>
        </section>
    );
};


export default TopSection;