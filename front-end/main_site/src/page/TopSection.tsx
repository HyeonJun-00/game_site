import './scss/TopSection.scss';
import CreateID from './CreateID';
import LogIn from './LogIn';
import {useState} from 'react';

interface state {
    user : string;
}

const TopSection = ({ user}: state) => {
    const [logInClass, setLogInClass] = useState("");
    const [createIDClass, setCreateIDClass] = useState("");
    const [userBoxClass, setFlag] = useState("");
    const [userBox, ] = useState(
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
            <LogIn logIn={[logInClass, setLogInClass]} setCreateIDClass={setCreateIDClass}></LogIn>
            <CreateID displayFalg={[createIDClass, setCreateIDClass]}></CreateID>
        </section>
    );
};


export default TopSection;