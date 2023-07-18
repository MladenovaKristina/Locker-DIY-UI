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

        const centerX = bb.width / 2.5;
        const centerY = bb.bottom - height / 2 - 100;

        this._bg.rect(bb.left, centerY - height / 2, bb.width, height);
        this._bg.fill();

        this.addChild(this._bg);

        if (this._sceneNumber === 0) {
            const colors = [0xFFFF00, 0xFF0000, 0x800080, 0x0000FF];

            for (let i = 0; i < colors.length; i++) {
                const color = new Graphics();
                color.fillStyle(colors[i], 1);
                color.circle(centerX - (colors.length) * 40 + i * 200 - 70, centerY, circleSize);
                color.fill();
                this._bg.addChild(color);
            }
            const colorGraphics = this._bg.mChildren.filter(child => child instanceof Graphics);


        } else {
            const spriteCategories = ['wallpaper', 'light', 'decoration', 'spray', 'stickers'];
            const category = spriteCategories[this._sceneNumber - 1];

            for (let i = 0; i < 4; i++) {
                const spriteName = `${category}_${i}`;
                const element = new Sprite(spriteName);
                const aspectRatio = element.width / element.height;
                const desiredHeight = height;
                element.height = desiredHeight;
                element.width = desiredHeight * aspectRatio;
                element.y = centerY - element.height / 2;

                this._bg.addChild(element);
            }

            if (this._bg.mChildren && this._bg.mChildren.length > 0) {
                this._sceneElements = this._bg.mChildren;
                const childrenCount = this._bg.mChildren.length;

                // Calculate total width of all elements
                let totalWidth = 0;
                for (let i = 0; i < childrenCount; i++) {
                    const element = this._bg.mChildren[i];
                    totalWidth += element.width;
                }

                // Calculate spacing between elements
                const spacing = (this._bg.width - totalWidth) / (childrenCount + 1);

                // Position elements with even spacing
                let currentX = 0 - this._bg.mChildren[0].width * 0.8;
                for (let i = 0; i < childrenCount; i++) {
                    const element = this._bg.mChildren[i];
                    element.x = currentX + element.width;
                    currentX += element.width + spacing;
                }
            }


        }
    }
}
