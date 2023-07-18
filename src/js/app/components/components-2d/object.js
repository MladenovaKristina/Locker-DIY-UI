import { Tween, Black, Graphics, Sprite, DisplayObject, TextField, Ease } from '../../../utils/black-engine.module';

export default class UIObject extends DisplayObject {
    constructor(category, object, height, bg, positionY) {
        super();
        const spriteName = `${category}_${object}`;
        this._element = new Sprite(spriteName);

        const aspectRatio = this._element.width / this._element.height;
        const desiredHeight = height;
        this._element.height = desiredHeight;
        this._element.width = desiredHeight * aspectRatio;
        this._element.y = positionY - this._element.height / 2

        this.visible = true;
        this.active = false;

        bg.addChild(this._element);

    }


}