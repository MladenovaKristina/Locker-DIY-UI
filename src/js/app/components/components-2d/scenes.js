import ConfigurableParams from '../../../data/configurable_params';
import { Tween, Black, Graphics, Sprite, DisplayObject, TextField, Ease } from '../../../utils/black-engine.module';
import Helpers from '../../helpers/helpers';

export default class Scene extends DisplayObject {
    constructor(sceneNumber) {
        super();
        this._sceneNumber = sceneNumber;
        this._bg = null;
        this._sceneElements = [];
        this.initView();
    }

    initView() {
        const bb = Black.stage.bounds;
        this._bg = new Graphics();
        this._bg.fillStyle(0xFFFFFF, 1);
        const height = 200;
        const circleSize = 70;

        const centerX = bb.width / 2;
        const centerY = bb.bottom - height / 2 - 100;

        this._bg.rect(bb.left, centerY - height / 2, bb.width, height);
        this._bg.fill();

        this.addChild(this._bg);

        if (this._sceneNumber === 0) {
            const colors = [0xFFFF00, 0xFF0000, 0x800080, 0x0000FF, 0x00FF00];

            for (let i = 0; i < colors.length - 1; i++) {
                const g = new Graphics();
                g.fillStyle(colors[i], 1);
                g.circle(centerX - (colors.length - 1) * 40 + i * 80, centerY, circleSize);
                g.fill();
                this._bg.addChild(g);
            }
        } else {
            const spriteCategories = ['wallpaper', 'light', 'decoration', 'spray', 'stickers'];
            const category = spriteCategories[this._sceneNumber - 1];

            for (let i = 0; i < 4; i++) {
                const spriteName = `${category}_${i}`;
                const element = new Sprite(spriteName);
                const aspectRatio = element.width / element.height;
                const desiredHeight = height * 0.8;
                element.height = desiredHeight;
                element.width = desiredHeight * aspectRatio;
                element.y = centerY - element.height / 2;

                this._bg.addChild(element);
            }
        }



        if (this._bg.mChildren && this._bg.mChildren.length > 0) {
            this._sceneElements = this._bg.mChildren;
            console.log(this._sceneElements)
            const childrenCount = this._bg.mChildren.length;
            const totalWidth = this._bg.width;
            const spacing = (totalWidth - childrenCount * this._bg.mChildren[0].width) / (childrenCount + 1);
            let currentX = spacing;

            for (let i = 0; i < childrenCount; i++) {
                const element = this._bg.mChildren[i];
                element.x = currentX + element.width / 2;
                currentX += element.width + spacing;
            }

        }
    }
}
