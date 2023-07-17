import ConfigurableParams from '../../../data/configurable_params';
import { Tween, Black, Graphics, Sprite, DisplayObject, TextField, Ease } from '../../../utils/black-engine.module';
import Helpers from '../../helpers/helpers';

export default class Scene extends DisplayObject {
    constructor(sceneNumber) {
        super();
        this._sceneNumber = 5;
        this._bg = null;

        this.initView();
    }

    initView() {
        const bb = Black.stage.bounds;
        this._bg = new Graphics();
        this.addChild(this._bg);
        this._bg = new Graphics();
        this._bg.fillStyle(0xfffffff, 1);
        const height = 200;
        const circleSize = 70;

        const centerX = this._bg.width - (circleSize / 3);
        const centerY = bb.bottom - height;
        this._bg.rect(0, centerY - 100, bb.width, height);
        this._bg.fill();
        this.add(this._bg);

        if (this._sceneNumber === 0) {

            const colors = [0xFFFF00, 0xFF0000, 0x800080, 0x0000FF, 0x00FF00];

            for (let i = 0; i < colors.length - 1; i++) {
                const g = new Graphics();
                g.fillStyle(colors[i], 1);
                g.circle(centerX - (circleSize * i * 4), centerY, circleSize);
                g.fill();
                this.add(g);
            }

        } else {
            let category = null;

            const spriteCategories = ['wallpaper', 'light', 'decoration', 'spray', 'stickers'];
            const elementSize = 100;

            if (this._sceneNumber === 1) {
                category = spriteCategories[0];
            } if (this._sceneNumber === 2) {
                category = spriteCategories[1];
            } if (this._sceneNumber === 3) {
                category = spriteCategories[2];
            } if (this._sceneNumber === 4) {
                category = spriteCategories[3];
            } if (this._sceneNumber === 5) {
                category = spriteCategories[4];
            }

            for (let i = 0; i <= 4; i++) {
                const spriteName = `${category}_${i}`;
                const element = new Sprite(spriteName);

                element.x = centerX + (elementSize * i * 3);
                element.y = centerY - element.height / 2;

                this.add(element);

            }
        }
    }

    //     onResize() {
    //         if (this._bg) {
    //             this._resizeBg();
    //         }
    //     }
    // 
    //     _resizeBg() {
    //         const bb = Black.stage.bounds;
    //         this._bg.clear();
    //         this._bg.beginFill(0x000000);
    //         this._bg.drawRect(0, 0, bb.width + Helpers.LP(200, 0), bb.height);
    //         this._bg.endFill();
    //     }
}
