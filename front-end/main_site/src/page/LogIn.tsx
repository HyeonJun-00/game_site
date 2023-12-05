import './scss/LogIn.scss';
import axios from 'axios';
import { useState } from 'react';
import { useCookies } from 'react-cookie';

interface state {
    children? : any;
    userObject? : any;
    logIn? : any;
    setCreateIDClass? : any;
    loginCookie:any
}

const LogIn = ({logIn, setCreateIDClass, loginCookie}:state) => {
    const [cookies, setCookie, removeCookie, setUser] = loginCookie;
    const [logInClass, setLogInClass] = logIn;
    const [userID, setUserID] = useState("");
    const [userPW, setUserPW] = useState("");
    const displayFalgEvent = () => {
        setCreateIDClass("displayFlag");
    }
    const userLogIn = async () => {
        try {
            const response = await axios.get('http://kkms4001.iptime.org:10096/user_login/', {
                params: {
                    nickname:userID,
                    password:userPW
                }
            });
            const resData = response.data;
            if (resData === "id is null") {
                alert("닉네임을 확인해 주세요.");
            } else if (resData === "password is null") {
                alert("비밀번호를 확인해 주세요.");
            } else {
                setUser(userID);
                setCookie('id', userID);
                setLogInClass("");
                alert("로그인 성공.");
                setUserID("");
                setUserPW("");
            }
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className={`LogIn ${logInClass}`}>
            <div className='logInBox'>
                <button onClick={() => setLogInClass("")}>✖</button>
                <div>
                    <p>Login</p>
                    <input type="text" placeholder='USER ID' value={userID} onChange={(e) => setUserID(e.target.value)}/>
                    <input type="password" placeholder='PASSWORD' value={userPW} onChange={(e) => setUserPW(e.target.value)}/>
                    <button onClick={userLogIn}>Login</button>
                    <div onClick={() => displayFalgEvent()}>회원가입</div>
                </div>
            </div>
        </div>
    );
};


export default LogIn;