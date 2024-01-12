import './scss/OmokGod.scss';

const gameImageSrc = `${process.env.PUBLIC_URL}/images/omok_god`;
const gameSoundSrc = `${process.env.PUBLIC_URL}/sounds/omok_god`;

const OmokGod = ({nowGame, user}:{[key:string]:any}) => {

    return (
        <article className='OmokGod'>
            <img src={`${gameImageSrc}/background.jpg`} alt="" />
        </article>
    );
};


export default OmokGod;