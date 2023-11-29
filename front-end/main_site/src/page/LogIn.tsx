import './scss/LogIn.scss';

interface state {
    children? : any;
    userObject? : any;
    logIn? : any;
    
}

const LogIn = ({logIn}:state) => {
    const [logInClass, setLogInClass] = logIn;
    
    return (
        <div className={`LogIn ${logInClass}`}>
            <div className='logInBox'>
                <button onClick={() => setLogInClass("")}>✖</button>
                <div>
                    <p>Login</p>
                    <input type="text"  placeholder='USER ID'/>
                    <input type="password" placeholder='PASSWORD'/>
                    <button>Login</button>
                    <div>회원가입</div>
                </div>
            </div>
        </div>
    );
};


export default LogIn;