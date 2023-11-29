import './scss/TopSection.scss';
import {useState, useEffect} from 'react';

interface state {
    LogIn : any;
    user : string;
}

const TopSection = ({ user, LogIn }: state) => {
    const [logInClass, setLogInClass] = useState("");
    const [userBoxClass, setFlag] = useState("");
    const [userBox, setUserBox] = useState(
        <li onClick={() => {
            setFlag("");
            setLogInClass("displayFlag");
        }}>로그인</li>
    );
    const profileClickEvnet = () => {
        if (userBoxClass === "") {setFlag("displayFlag");}
        else { setFlag(""); }
    };
    return (
        <section className='TopSection'>
            <article className='topContentArticle'>
                <div className='topLeftBox'>
                    <img id='menu' src={`${process.env.PUBLIC_URL}/images/menu.png`} alt='menu'></img>
                    <img id='logo' src={`${process.env.PUBLIC_URL}/images/logo.png`} alt='logo'></img>
                </div>
                <div className='topCenterBox'>
                    <div className='searchBox'>
                        <input placeholder='원하는 게임을 검색해 보세요!'></input>
                        <img id='searchButton' src={`${process.env.PUBLIC_URL}/images/search_button.png`} alt='search_button'></img>
                    </div>
                </div>
                <div className='topRightBox'>
                    <p onClick={() => profileClickEvnet()}>{"손님 " + user}</p>
                    <img id='profile' src={`${process.env.PUBLIC_URL}/images/guest_profile.png`} alt='profile' onClick={() => profileClickEvnet()}></img>
                    <ul id='userBox' className={userBoxClass}>
                        {userBox}
                    </ul>
                </div>
            </article>
            {<LogIn logIn={[logInClass, setLogInClass]}></LogIn>}
        </section>
    );
};


export default TopSection;