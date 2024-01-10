import './scss/LogIn.scss';
import axios from 'axios';
import { useState } from 'react';

const LogIn = ({logIn, loginCookie, user}:any) => {
    const [, setCookie, , setUser] = loginCookie;
    const [logInClass, setLogInClass] = logIn;
    const [userID, setUserID] = useState("");
    const [userPW, setUserPW] = useState("");

    const userLogIn = async () => {
        try {
            const response = await axios.post('http://35.216.113.72:10096/user_login/', {
                    nickname:userID,
                    password:userPW
            });
            const resData = response.data;
            if (resData === "id is null") {
                alert("닉네임을 확인해 주세요.");
            } else if (resData === "password is null") {
                alert("비밀번호를 확인해 주세요.");
            } else {
                setUser({...user, name:userID});
                setCookie('id', userID);
                setLogInClass("");
                setUserID("");
                setUserPW("");
                alert("로그인 성공.");
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
                    <div></div>
                </div>
            </div>
        </div>
    );
};


export default LogIn;