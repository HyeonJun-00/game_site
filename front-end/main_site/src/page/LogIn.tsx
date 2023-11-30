import './scss/LogIn.scss';

interface state {
    children? : any;
    userObject? : any;
    logIn? : any;
    setCreateIDClass? : any;
}

const LogIn = ({logIn, setCreateIDClass}:state) => {
    const [logInClass, setLogInClass] = logIn;
    const displayFalgEvent = () => {
        setCreateIDClass("displayFlag");
    }

    return (
        <div className={`LogIn ${logInClass}`}>
            <div className='logInBox'>
                <button onClick={() => setLogInClass("")}>✖</button>
                <div>
                    <p>Login</p>
                    <input type="text"  placeholder='USER ID'/>
                    <input type="password" placeholder='PASSWORD'/>
                    <button>Login</button>
                    <div onClick={() => displayFalgEvent()}>회원가입</div>
                </div>
            </div>
        </div>
    );
};


export default LogIn;