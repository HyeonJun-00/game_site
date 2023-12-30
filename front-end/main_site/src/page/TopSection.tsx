import './scss/TopSection.scss';
import CreateID from './CreateID';
import LogIn from './LogIn';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

interface state {
    user : string;
    loginCookie:any;
    inGame:string;
}

const TopSection = ({inGame, user, loginCookie}: state) => {
    const [cookies, , removeCookie, setUser] = loginCookie;
    const [logInClass, setLogInClass] = useState("");
    const [createIDClass, setCreateIDClass] = useState("");
    const [userBoxClass, setFlag] = useState("");
    const [userBox, setUserBox] = useState(<></>);
    const [profileImg, setProfileImg] = useState("guest_profile");
    const [content, setContent] = useState(<></>);

    const profileClickEvnet = () => {
        if (cookies.id === undefined) {setLogInClass("displayFlag");} 
        else if (userBoxClass === "") { setFlag("displayFlag"); }
        else { setFlag(""); }
    };

    useEffect(() => {
        if (cookies.id === undefined) {
            setProfileImg("guest_profile");
            setUserBox(<></>);
            setContent(<button onClick={() => setCreateIDClass("displayFlag")}>Join</button>);
        } else {
            setProfileImg("user_profile");
            setUserBox(
                <>
                    <li key={Math.random()} onClick={() => {
                        setFlag("");
                    }}>마이페이지</li>
                    <li key={Math.random()} onClick={() => {
                        window.location.href = "http://35.216.113.72/admin_site/html/admin.html";
                    }}>관리자 페이지</li>
                    <li key={Math.random()} onClick={() => {
                        removeCookie("id");
                        setFlag("");
                        setUser(`user${(Math.floor((Math.random() * 90000) + 10000))}`);
                    }}>로그아웃</li>
                </>
            );           
            setContent(
                <div>
                    <img src={`${process.env.PUBLIC_URL}/images/coin.png`} alt="coin" />
                    <p>1,581</p>
                </div>
            );
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        <input ></input>
                        <img id='searchButton' src={`${process.env.PUBLIC_URL}/images/search_button.png`} alt='search_button'></img>
                    </div>
                </div>
                <div className='topRightBox'>
                    <img id='profile' src={`${process.env.PUBLIC_URL}/images/${profileImg}.png`} alt='profile' onClick={() => profileClickEvnet()}></img>
                    <p onClick={() => profileClickEvnet()}>{user}</p>
                    <div>{content}</div>
                    <div id='menuBox'>
                        <img src={`${process.env.PUBLIC_URL}/images/menu.png`} alt='menu'></img>
                    </div>
                    <ul id='userBox' className={userBoxClass}>
                        {userBox}
                    </ul>
                </div>
            </article>
            <LogIn loginCookie={loginCookie} logIn={[logInClass, setLogInClass]}></LogIn>
            <CreateID displayFalg={[createIDClass, setCreateIDClass]}></CreateID>
        </section>
    );
};


export default TopSection;