import './scss/CreateID.scss';

interface state {
    children? : any;
    userObject? : any;
    logIn? : any;
    displayFalg? : any;
}

const CreateID = ({displayFalg}:state) => {
    const [createIDClass, setCreateIDClass] = displayFalg;

    const displayFalgEvent = () => {
        setCreateIDClass("");
    }

    return (
        <div className={`CreateID ${createIDClass}`}>
            <div className='createIDBox'>
                <article>
                    <img id='logo' src={`${process.env.PUBLIC_URL}/images/logo.png`} alt='logo'></img>
                </article>
                <div>
                    <div>
                        <input type="text" placeholder='닉네임/아이디'/>
                        <button className='certificationButton'>중복 확인</button>
                    </div>
                        <p>닉네임: 1~30자의 한글 또는 영문을 사용해 주세요.</p>
                    <div>
                        <input type="text" placeholder='이메일'/>
                    </div>
                        <p>이메일: 이메일 형식에 맞게 입력해주세요. </p>
                    <div>
                        <input type="password" placeholder='비밀번호'/>
                    </div>
                        <p>비밀번호: 1~20자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.</p>
                    <div>
                        <input type="password" placeholder='비밀번호 확인'/>
                    </div>
                        <p>비밀번호 확인: 비밀번호와 똑같이 입력해 주세요.</p>
                    <div>
                        <button onClick={() => displayFalgEvent()}>취소</button>
                        <button onClick={() => displayFalgEvent()}>가입</button>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CreateID;