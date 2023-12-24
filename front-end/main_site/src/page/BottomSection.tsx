import './scss/BottomSection.scss';


const BottomSection = () => {
    return (
        <section className='BottomSection'>
            <article>
                <div>
                    <p>해당 사이트는 취미, 포트폴리오 사이트입니다.</p>
                    <p>해당 사이트는 수익을 창출 하지 않습니다.</p>
                </div>
            </article>
            <article>
                <div>
                    <p>e-mail</p>
                    <a href="mailto:fnguswns1@naver.com">fnguswns1@naver.com</a>
                </div>
            </article>
            <article>
                <div>
                    <p>제작자</p>
                    <p>박현준</p>
                </div>
            </article>
            <article>
                <div>
                    <p>도움 주신분들</p>
                    <p>이재연, 유해미</p>
                </div>
            </article>
        </section>
    );
};


export default BottomSection;