import { useEffect, useState } from "react";
import "./scss/ShootingCat.scss";

class VillainClass {
    x: number;
    y: number;
    villainImage: CanvasImageSource;

    constructor() {
        this.x = Math.floor(Math.random() * 461);
        this.y = 0;
		this.villainImage = new Image();
		this.villainImage.src = `${process.env.PUBLIC_URL}/images/shooting_cat/Villain.png`;;
    }
    get getImg() {
        return this.villainImage;
    }
    moveVillain() {
        this.y += 2;
    }
}

const ShootingCat = ({ nowGame, user }: { [key: string]: any }) => {

    useEffect(() => {
        class GameClass {
            width: number;
            height: number;
            backgroundImage: HTMLImageElement;
            gameDisplay: HTMLElement | null;
            ctx: CanvasRenderingContext2D | null;
            villainList: VillainClass[];
            createVillainTime: number;
            start: boolean;

            constructor() {
                this.start = true;
                this.width = 500;
                this.height = 889;
                this.villainList = [];
                this.createVillainTime = 0;
                this.backgroundImage = new Image();
                this.gameDisplay = document.getElementById("gameDisplay");
                this.ctx = (this.gameDisplay as HTMLCanvasElement).getContext("2d");
            }
            set setBackgroundImg(initImg:string) {
                const targetImg = {
                    normal: "background1",
                }[initImg];
                this.backgroundImage.src = `${process.env.PUBLIC_URL}/images/shooting_cat/${targetImg}.png`;
            }
            backgroundRender() {
                (this.ctx !== null) && this.ctx.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
            }
            villainRender(time:number) {
                if (this.createVillainTime < time) {
                    this.createVillainTime = time + 480;
                    this.villainList.push(new VillainClass());
                }
                this.villainList.forEach(v => {
                    (this.ctx !== null) && this.ctx.drawImage(v.getImg, v.x, v.y, 47, 47);
                    v.moveVillain();
                });
            }
            setGame() {
                this.setBackgroundImg = "normal";
            }
            stopGame() {
                this.start = false;
            }
            startGame() {
                const render = (time: number) => {
                    this.backgroundRender();
                    this.villainRender(time);

                    this.start && requestAnimationFrame(render);
                }
                requestAnimationFrame(render);
            }
        }
        const gameObject = new GameClass();

        gameObject.setGame();
        gameObject.startGame();
    }, []);

    return (
        <article className='ShootingCat'>
            <canvas id="gameDisplay" width="500" height="889" style={{ "background": "#000" }}></canvas>
        </article>
    );
};


export default ShootingCat;