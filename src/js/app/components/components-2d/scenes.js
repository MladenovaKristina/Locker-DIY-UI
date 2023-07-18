import ConfigurableParams from '../../../data/configurable_params';
import { Tween, Black, Graphics, Sprite, DisplayObject, GameObject, Ease } from '../../../utils/black-engine.module';
import Helpers from '../../helpers/helpers';
import UIObject from './object';

export default class Scene extends DisplayObject {
    constructor(sceneNumber) {
        super();
        this._sceneNumber = sceneNumber;
        this._bg = null;
        this.object = null;
        this.highlight = null;
        this._sceneElements = [];
        this.initView();
    }

    initView() {
        const bb = Black.stage.bounds;

        this.highlight = new Graphics();
        this.highlight.fillStyle(0xffffff, 1);
        this.highlight.circle(0, 0, 80);
        this.highlight.fill();
        this.highlight.visible = false;
        this.add(this.highlight)

        this._bg = new GameObject();
        this._bg.width = bb.width;
        this._bg.height = bb.height;

        const height = 200;
        const circleSize = 70;

        const centerX = bb.width / 2;
        const centerY = bb.bottom - height / 2 - 100;

        const bg = new Graphics();
        bg.fillStyle(0xFFFFFF, 0.7);
        bg.rect(bb.left, centerY - height / 2, bb.width, height);
        bg.fill();
        this.add(bg);

        this.add(this._bg);

        if (this._sceneNumber === 0) {
            const colors = [0xFFFF00, 0xFF0000, 0x800080, 0x0000FF];

            for (let i = 0; i < colors.length; i++) {
                const color = new Graphics();
                color.fillStyle(colors[i], 1);
                color.circle(centerX - (colors.length) * 40 + i * 200 - circleSize * 2, centerY, circleSize);
                color.fill();

                const colorContainer = new GameObject();
                colorContainer.addChild(color);


                this._bg.addChild(colorContainer);
                //this doesnt work becayse Graphics dont have x position unfortionately idk how to fix
            }

        } else {
            const spriteCategories = ['wallpaper', 'light', 'decoration', 'spray', 'stickers'];
            const category = spriteCategories[this._sceneNumber - 1];

            for (let i = 0; i < 4; i++) {
                this.object = new UIObject(category, i, height, this._bg, centerY);
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
                const spacing = (bb.width - totalWidth) / (childrenCount + 1);

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
