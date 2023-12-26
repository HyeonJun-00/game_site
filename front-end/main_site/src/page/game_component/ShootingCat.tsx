import { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./scss/ShootingCat.scss";

const gameImageSrc = `${process.env.PUBLIC_URL}/images/shooting_cat`;
const gameSoundSrc = `${process.env.PUBLIC_URL}/sounds/shooting_cat`;

class Sound {
    static mainSound = 1;
    static attackSound = 1;
    static backgroundSound = new Audio();
    static hoverSound = new Audio(`${gameSoundSrc}/hover.mp3`);
    static hoverEvent() {
        Sound.hoverSound.volume = .2;
        Sound.hoverSound.autoplay = true;
        Sound.hoverSound.load();
    };
    static backgroundSoundPlay() {
        Sound.backgroundSound.src = `${gameSoundSrc}/background.mp3`;
        Sound.backgroundSound.loop = true;
        Sound.backgroundSound.volume = 0.2;
        Sound.backgroundSound.play();
    }
    static backgroundSoundStop() {
        Sound.backgroundSound.pause();
        Sound.backgroundSound.currentTime = 0;
        Sound.backgroundSound.src = "";
    }
}

class Fish {
    private _x: number;
    private _y: number;
    private _fishAlive: boolean;
    private _fishImage: CanvasImageSource;
    private _fishAudio: HTMLAudioElement;

    constructor(startX: number, startY: number) {
        this._x = startX;
        this._y = startY;
        this._fishAlive = true;

        this._fishImage = new Image();
        this._fishAudio = new Audio(`${gameSoundSrc}/shot.mp3`);

        this._fishImage.src = `${gameImageSrc}/fish1_1.png`;
        this._fishAudio.volume = .1;
        this._fishAudio.play();
    }
    get X() {
        return this._x;
    }
    get Y() {
        return this._y;
    }
    set fishAlive(initBool: boolean) {
        this._fishAlive = initBool;
    }
    get fishAlive() {
        return this._fishAlive;
    }
    get Img() {
        return this._fishImage;
    }
    moveFish() {
        this._y -= 6;
    }
}

class Villain {
    private _x: number;
    private _y: number;
    private _villainImage: CanvasImageSource;
    private _attackSound: HTMLAudioElement;

    constructor() {
        this._x = Math.floor(Math.random() * 461);
        this._y = 0;
        this._villainImage = new Image();
        this._attackSound = new Audio(`${gameSoundSrc}/attack.mp3`);

        this._villainImage.src = `${gameImageSrc}/Villain.png`;
        this._attackSound.volume = .3;
    }
    get X() {
        return this._x;
    }
    get Y() {
        return this._y;
    }
    get getImg() {
        return this._villainImage;
    }
    attackSoundRun() {
        this._attackSound.load();
        this._attackSound.play();
    }
    moveVillain() {
        this._y += 2;
    }
}

class BonusLife {
    private _bonusLifeImg: HTMLImageElement;
    private _x: number;
    private _y: number;
    private _bonusLifeSound: HTMLAudioElement;

    constructor() {
        this._x = Math.floor(Math.random() * 461);
        this._y = 0;
        this._bonusLifeImg = new Image();
        this._bonusLifeSound = new Audio(`${gameSoundSrc}/bonusLife.mp3`);

        this._bonusLifeImg.src = `${gameImageSrc}/bonus_life.png`;
        this._bonusLifeSound.volume = .3;
    }
    get X() {
        return this._x;
    }
    get Y() {
        return this._y;
    }
    get Img() {
        return this._bonusLifeImg;
    }
    soundPlay() {
        this._bonusLifeSound.play();
    }
    moveBonusLife() {
        this._y += 2.4;
    }
}

class Cat {
    private _catImage: CanvasImageSource;
    private _x: number;
    private _y: number;
    private _displayHeight: number;
    private _displayWidth: number;
    private _moveKeyCheck: { ArrowUp: boolean; ArrowDown: boolean; ArrowRight: boolean; ArrowLeft: boolean; };

    constructor(width: number, height: number) {
        this._displayWidth = width;
        this._displayHeight = height;
        this._x = width / 2 - 30;
        this._y = height - 80;
        this._catImage = new Image();
        this._catImage.src = `${gameImageSrc}/cat1.png`;
        this._moveKeyCheck = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowRight: false,
            ArrowLeft: false,
        }
    }
    get X() {
        return this._x;
    }
    get Y() {
        return this._y;
    }
    get getImg() {
        return this._catImage;
    }
    moveEvent() {
        if (this._moveKeyCheck.ArrowUp && this._y > this._displayHeight / 2) {
            this._y -= 3.7;
        }
        if (this._moveKeyCheck.ArrowDown && this._y < this._displayHeight - 60) {
            this._y += 3.7;
        }
        if (this._moveKeyCheck.ArrowLeft && this._x >= 0) {
            this._x -= 4;
        }
        if (this._moveKeyCheck.ArrowRight && this._x < this._displayWidth - 60) {
            this._x += 4;
        }
    }
    set moveToTop(initBool: boolean) {
        this._moveKeyCheck.ArrowUp = initBool;
    }
    set moveToBottom(initBool: boolean) {
        this._moveKeyCheck.ArrowDown = initBool;
    }
    set moveToLeft(initBool: boolean) {
        this._moveKeyCheck.ArrowLeft = initBool;
    }
    set moveToRight(initBool: boolean) {
        this._moveKeyCheck.ArrowRight = initBool;
    }
}

class Game {
    private _width: number;
    private _height: number;
    private _backgroundImage: HTMLImageElement;
    private _gameDisplay: HTMLElement | null;
    private _ctx: CanvasRenderingContext2D | null;
    private _villainList: Villain[];
    private _createVillainTime: number;
    private _start: boolean;
    private _cat: Cat;
    private _fishList: Fish[];
    private _gameScore: number;
    private _createFishTime: number;
    private _life: number;
    private _lifeImg: HTMLImageElement;
    private _emptyLifeImg: HTMLImageElement;
    private _bonusLifeList: BonusLife[];
    private _createBonusLifeTime: number;
    private _setGameState: Dispatch<SetStateAction<string>>;
    private _backgroundChangeTime: number;
    private _time: number;

    constructor(setGameState: Dispatch<SetStateAction<string>>) {
        this._setGameState = setGameState;
        this._start = true;
        this._gameScore = 0;
        this._life = 3;
        this._width = 500;
        this._height = 889;
        this._time = 0;
        this._villainList = [];
        this._fishList = [];
        this._bonusLifeList = [];
        this._createVillainTime = 0;
        this._createFishTime = 0;
        this._createBonusLifeTime = 0;
        this._backgroundChangeTime = 0;

        this._cat = new Cat(500, 889);
        this._backgroundImage = new Image();
        this._lifeImg = new Image();
        this._emptyLifeImg = new Image();

        this._gameDisplay = document.getElementById("gameDisplay");
        this._ctx = (this._gameDisplay as HTMLCanvasElement).getContext("2d");
        this._lifeImg.src = `${gameImageSrc}/life.png`;
        this._emptyLifeImg.src = `${gameImageSrc}/lose_life.png`;
    }
    
    set backgroundImg(initImg: string) {
        const targetImg = {
            normal: "background1",
            damage: "background2",
            bonusLife: "background3"
        }[initImg];
        this._backgroundImage.src = `${gameImageSrc}/${targetImg}.png`;
    }

    changeBackground(changeReason: string) {
        this._backgroundChangeTime = this._time + 3000;
        this.backgroundImg = changeReason;
    }

    backgroundRender() {
        if (this._backgroundChangeTime !== 0 && this._backgroundChangeTime <= this._time) {
            this.backgroundImg = "normal";
            this._backgroundChangeTime = 0;
        }
        (this._ctx !== null) && this._ctx.drawImage(this._backgroundImage, 0, 0, this._width, this._height);
    }

    villainRender() {
        if (this._createVillainTime < this._time) {
            this._createVillainTime = this._time + 480;
            this._villainList.push(new Villain());
        }
        this._villainList.forEach(villain => {
            (this._ctx !== null) && this._ctx.drawImage(villain.getImg, villain.X, villain.Y, 47, 47);
            villain.moveVillain();
        });
    }

    fishRender() {
        if (this._createFishTime < this._time) {
            this._createFishTime = this._time + 370;
            this._fishList.push(new Fish(this._cat.X, this._cat.Y));
        }
        this._fishList = this._fishList.filter((fish: Fish) => {
            (this._ctx !== null) && this._ctx.drawImage(fish.Img, fish.X, fish.Y, 47, 47);
            fish.moveFish();
            return fish.fishAlive;
        });
    }

    bonusLifeRender() {
        if (this._life < 3 && this._createBonusLifeTime < this._time) {
            const randomTime = Math.floor(Math.random() * 5000) + 17000;
            this._createBonusLifeTime = this._time + randomTime + 10000;
            setTimeout(() => this._bonusLifeList.push(new BonusLife()), randomTime);
        }
        this._bonusLifeList = this._bonusLifeList.filter((bonusLife: BonusLife) => {
            bonusLife.moveBonusLife();
            (this._ctx !== null) && this._ctx.drawImage(bonusLife.Img, bonusLife.X, bonusLife.Y, 47, 47);
            if (bonusLife.Y + 60 > this._cat.Y && bonusLife.Y - 30 <= this._cat.Y && bonusLife.X > this._cat.X - 60 && bonusLife.X < this._cat.X + 60) {
                bonusLife.soundPlay();
                this._life += 1;
                this.changeBackground("bonusLife");
                return false;
            } else if (bonusLife.Y <= 0) {
                return false;
            }
            return true;
        });
    }

    lifeRender() {
        if (this._life === 0) {
            this.stopGame();
            this._setGameState("end");
        }
        if (this._ctx !== null) {
            this._ctx.drawImage(this._life >= 1 ? this._lifeImg : this._emptyLifeImg, 435, 7, 55, 55);
            this._ctx.drawImage(this._life >= 2 ? this._lifeImg : this._emptyLifeImg, 390, 7, 55, 55);
            this._ctx.drawImage(this._life === 3 ? this._lifeImg : this._emptyLifeImg, 345, 7, 55, 55);
        }
    }

    catRender() {
        this._cat.moveEvent();
        (this._ctx !== null) && this._ctx.drawImage(this._cat.getImg, this._cat.X, this._cat.Y, 60, 60);
    }
    scoreRender() {
        if (this._ctx !== null) {
            this._ctx.fillText(`Villain Kill Score: ${this._gameScore}`, 10, 40);
            this._ctx.fillStyle = "white";
            this._ctx.font = "25px Arial";
        }
    }
    attackCheck() {
        this._fishList.forEach((fish: Fish) => {
            let i = 0;
            while (i < this._villainList.length) {
                const villain = this._villainList[i];

                if (fish.Y + 30 > villain.Y && fish.Y <= villain.Y && fish.X >= villain.X - 30 && fish.X <= villain.X + 30) {
                    this._gameScore++;
                    this._villainList.splice(i, 1);

                    villain.attackSoundRun();
                    fish.fishAlive = false;
                } else if (fish.Y <= 0) {
                    fish.fishAlive = false
                }
                if (villain.Y >= this._height - 47) {
                    this._villainList.splice(i, 1);
                    this._life -= 1;
                    this.changeBackground("damage");
                    let damageSound = new Audio(`${gameSoundSrc}/damage.mp3`);

                    damageSound.volume = .2;
                    damageSound.play();
                }
                i++;
            }
        });
    }
    keydownEvent = (e: { key: string; preventDefault: () => void; }) => {
        if (e.key === "ArrowLeft" || e.key === "Left") { this._cat.moveToLeft = true; }
        if (e.key === "ArrowRight" || e.key === "Right") { this._cat.moveToRight = true; }
        if (e.key === "ArrowUp" || e.key === "Up") { this._cat.moveToTop = true; e.preventDefault(); }
        if (e.key === "ArrowDown" || e.key === "Down") { this._cat.moveToBottom = true; e.preventDefault(); }
    }
    keyupEvent = (e: { key: string; preventDefault: () => void; }) => {
        if (e.key === "ArrowLeft" || e.key === "Left") { this._cat.moveToLeft = false; }
        if (e.key === "ArrowRight" || e.key === "Right") { this._cat.moveToRight = false; }
        if (e.key === "ArrowUp" || e.key === "Up") { this._cat.moveToTop = false; e.preventDefault(); }
        if (e.key === "ArrowDown" || e.key === "Down") { this._cat.moveToBottom = false; e.preventDefault(); }
    }
    setGame() {
        document.addEventListener("keydown", this.keydownEvent);
        document.addEventListener("keyup", this.keyupEvent);
        this.backgroundImg = "normal";
    }
    stopGame() {
        document.removeEventListener("keydown", this.keydownEvent);
        document.removeEventListener("keyup", this.keyupEvent);
        this._start = false;
    }
    startGame() {
        const render = (time: number) => {
            this._time = time;
            this.backgroundRender();
            this.attackCheck();
            this.villainRender();
            this.bonusLifeRender();
            this.fishRender();
            this.catRender();
            this.lifeRender();
            this.scoreRender();
            console.log(time);
            this._start && requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }
}

const ShootingCat = ({ nowGame, user }: { [key: string]: any }) => {
    const [gameState, setGameState] = useState("menu");
    const [startButtonSrc, setStartButtonSrc] = useState(`${gameImageSrc}/game_start_button_001.png`);
    const [optionButtonSrc, setOptionButtonSrc] = useState(`${gameImageSrc}/game_option_button_001.png`);
    const [developerButtonSrc, setDeveloperButtonSrc] = useState(`${gameImageSrc}/game_developer_button_001.png`);
    const [restartButtonSrc, setRestartButtonSrc] = useState(`${gameImageSrc}/game_restart_button_001.png`);
    const [mainButtonSrc, setMainButtonSrc] = useState(`${gameImageSrc}/game_main_button_001.png`);

    useEffect(() => {
        Sound.backgroundSoundPlay();
        return () => {
            Sound.backgroundSoundStop();
        }
    }, []);

    useEffect(() => {
        if (gameState === "menu") {
            setStartButtonSrc(`${gameImageSrc}/game_start_button_001.png`)
            setOptionButtonSrc(`${gameImageSrc}/game_option_button_001.png`)
            setDeveloperButtonSrc(`${gameImageSrc}/game_developer_button_001.png`)
        }
        if (gameState === "start") {
            let gameObject:Game | null = new Game(setGameState);
            gameObject.setGame();
            gameObject.startGame();
            return () => {
                gameObject?.stopGame();
                gameObject = null;
            }
        }
        if (gameState === "end") {
            setRestartButtonSrc(`${gameImageSrc}/game_restart_button_001.png`)
            setMainButtonSrc(`${gameImageSrc}/game_main_button_001.png`)
        }

    }, [gameState]);

    const content = {
        "menu": (
            <div id="gameDisplay" className="startDisplay">
                <div className="gameLogoBox">
                    <img src={`${gameImageSrc}/game_logo.png`} alt="" />
                </div>
                <div className="buttonBox">
                    <button onClick={() => setGameState("start")}
                        onMouseOut={() => setStartButtonSrc(`${gameImageSrc}/game_start_button_001.png`)}
                        onMouseOver={() => {
                            setStartButtonSrc(`${gameImageSrc}/game_start_button_002.png`);
                            Sound.hoverEvent();
                        }}
                    >
                        <img src={startButtonSrc} alt="" />
                    </button>
                    <button onClick={() => { }}
                        onMouseOut={() => setOptionButtonSrc(`${gameImageSrc}/game_option_button_001.png`)}
                        onMouseOver={() => {
                            setOptionButtonSrc(`${gameImageSrc}/game_option_button_002.png`);
                            Sound.hoverEvent();
                        }}
                    >
                        <img src={optionButtonSrc} alt="" />
                    </button>
                    <button onClick={() => { }}
                        onMouseOut={() => setDeveloperButtonSrc(`${gameImageSrc}/game_developer_button_001.png`)}
                        onMouseOver={() => {
                            setDeveloperButtonSrc(`${gameImageSrc}/game_developer_button_002.png`);
                            Sound.hoverEvent();
                        }}
                    >
                        <img src={developerButtonSrc} alt="" />
                    </button>
                </div>
            </div>
        ),
        "start": <canvas id="gameDisplay" width="500" height="889" style={{ "background": "#4DBBDC" }} />,
        "end": <div id="gameDisplay" className="endDisplay">
            <div className="gameLogoBox">
                <img src={`${gameImageSrc}/game_logo.png`} alt="" />
            </div>
            <div className="buttonBox">
                <button onClick={() => { setGameState("start") }}
                    onMouseOut={() => setRestartButtonSrc(`${gameImageSrc}/game_restart_button_001.png`)}
                    onMouseOver={() => {
                        setRestartButtonSrc(`${gameImageSrc}/game_restart_button_002.png`);
                        Sound.hoverEvent();
                    }}
                >
                    <img src={restartButtonSrc} alt="" />
                </button>
                <button onClick={() => { setGameState("menu") }}
                    onMouseOut={() => setMainButtonSrc(`${gameImageSrc}/game_main_button_001.png`)}
                    onMouseOver={() => {
                        setMainButtonSrc(`${gameImageSrc}/game_main_button_002.png`);
                        Sound.hoverEvent();
                    }}
                >
                    <img src={mainButtonSrc} alt="" />
                </button>
            </div>
        </div>
    }[gameState];

    return (
        <article className='ShootingCat'>
            <div className="gameLeft"></div>
            {content}
            <div className="gameRight"></div>
        </article>
    );
};


export default ShootingCat;