import './scss/CreateID.scss';
import axios from 'axios';
import { useState, useEffect } from 'react';

interface state {
    children? : any;
    userObject? : any;
    logIn? : any;
    displayFalg? : any;
}

const CreateID = ({displayFalg}:state) => {
    const [createIDClass, setCreateIDClass] = displayFalg;
    const [userIDCheck, setUserIDCheck] = useState(false);
    const [userID, setUserID] = useState("");
    const [userPW, setUserPW] = useState("");
    const [userPWCheck, setUserPWCheck] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [duplicateClass, setDuplicateClass] = useState<{[key:string]:string}>({
        id: "",
        email: "",
        password: "",
        passwordCheck: "",
    });
    useEffect(() => {
        let tempObject = {...duplicateClass};
        const signInFormatCheck = (checkTarget:string) => {
            const targetState = {
                "id" : userID,
                "email" : userEmail,
                "password" : userPW,
                "passwordCheck" : userPWCheck
            }[checkTarget];
            const targetRegularExpression = {
                "id" : /^[a-z0-9가-힣]{2,15}$/i,
                "email" : /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                "password" : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
                "passwordCheck" : /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/,
            }[checkTarget];
            let formatCheck = targetRegularExpression?.test(targetState || "");
            if (checkTarget === "passwordCheck") {
                formatCheck = userPW === userPWCheck;
            }

            if (targetState === "") {
                tempObject = { ...tempObject, [checkTarget]: "" };
            } else if (formatCheck) {
                tempObject = { ...tempObject, [checkTarget]: "possible" };
            } else {
                tempObject = { ...tempObject, [checkTarget]: "impossible" };
            }
        };
        for (const thisTarget in tempObject) {
            signInFormatCheck(thisTarget);
        }
        setDuplicateClass(tempObject);

    }, [userID, userEmail, userPW, userPWCheck]);
    const clearState = () => {
        setUserID("");
        setUserEmail("");
        setUserPW("");
        setUserPWCheck("");
        setDuplicateClass({
            id: "",
            email: "",
            password: "",
            passwordCheck: "",
        });
    };
    const IdDuplicateCheck = async () => {
        try {
            const response = await axios.get('http://kkms4001.iptime.org:10096/game/nickname_duplicate_check/', {
                params: {
                    nickname:userID,
                }
            });
            const resData = response.data !== "true" && duplicateClass.id === "possible";
            if (resData) {
                alert("사용 가능한 닉네임/아이디 입니다.");
            } else {
                alert("사용 불가능한 닉네임/아이디 입니다.");
            }
            setUserIDCheck(resData);
        } catch (e) {
            console.error(e);
        }
    };
    const displayFalgEvent = () => {
        clearState();
        setCreateIDClass("");
    };
    const signInFunction = () => {
        const signUpSuccessful = async () => {
            try {
                const response = await axios.get('http://kkms4001.iptime.org:10096/game/create_user/', {
                    params: {
                        nickname: userID,
                        password: userPW,
                        email: userEmail,
                    }
                });
                const resData = response.data;
                if (resData === "create") {
                    alert("가입을 축하 드립니다.");
                } else {
                    alert("가입을 실패 하였습니다.");
                }
            } catch (e) {
                console.error(e);
            }
        };
        for (const thisTarget in duplicateClass) {
            if (duplicateClass[thisTarget] !== "possible") {
                alert("형식을 확인 해주세요.");
                return ;
            }
        }
        if (!userIDCheck) {
            alert("닉네임 중복 확인을 해주세요.");
        } else {
            displayFalgEvent();
            signUpSuccessful();
        }
    };

    return (
        <div className={`CreateID ${createIDClass}`}>
            <div className='createIDBox'>
                <article>
                    <img id='logo' src={`${process.env.PUBLIC_URL}/images/logo.png`} alt='logo'></img>
                </article>
                <div>
                    <div>
                        <input className={duplicateClass.id} type="text" placeholder='닉네임/아이디' value={userID} onChange={(e) => {
                                setUserIDCheck(false);
                                setUserID(e.target.value);
                            }}/>
                        <button className='certificationButton' onClick={IdDuplicateCheck}>중복 확인</button>
                    </div>
                        <p>닉네임: 2~15자의 한글 또는 영문을 사용해 주세요.</p>
                    <div>
                        <input className={duplicateClass.email} type="text" placeholder='이메일' value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
                    </div>
                        <p>이메일: 이메일 형식에 맞게 입력해주세요. </p>
                    <div>
                        <input className={duplicateClass.password} type="password" placeholder='비밀번호' value={userPW} onChange={(e) => setUserPW(e.target.value)}/>
                    </div>
                        <p>비밀번호: 8~20자의 영문 대/소문자, 숫자를 사용해 주세요.</p>
                    <div>
                        <input className={duplicateClass.passwordCheck} type="password" placeholder='비밀번호 확인' value={userPWCheck} onChange={(e) => setUserPWCheck(e.target.value)}/>
                    </div>
                        <p>비밀번호 확인: 비밀번호와 똑같이 입력해 주세요.</p>
                    <div>
                        <button onClick={displayFalgEvent}>취소</button>
                        <button onClick={signInFunction}>가입</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CreateID;