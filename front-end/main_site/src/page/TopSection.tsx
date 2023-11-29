import './scss/TopSection.scss';

const TopSection = () => {
    return (
        <section className='TopSection'>
            <article className='topContentArticle'>
                <div className='topLeftBox'>
                    <img id='menu' src={`${process.env.PUBLIC_URL}/images/menu.png`} alt='menu'></img>
                    <img id='logo' src={`${process.env.PUBLIC_URL}/images/logo.png`} alt='logo'></img>
                </div>
                <div className='topCenterBox'>
                    <div className='searchBox'>
                        <input></input>
                        <img id='searchButton' src={`${process.env.PUBLIC_URL}/images/search_button.png`} alt='search_button'></img>
                    </div>
                </div>
                <div className='topRightBox'>
                    <p>손님 59323</p>
                    <img id='profile' src={`${process.env.PUBLIC_URL}/images/guest_profile.png`} alt='profile'></img>
                    <ul id='userBox'>
                        <li>로그인</li>
                    </ul>
                </div>
            </article>
        </section>
    );
};


export default TopSection;