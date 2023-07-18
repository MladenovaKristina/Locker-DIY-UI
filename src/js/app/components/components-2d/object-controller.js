import { DisplayObject, Sprite, Black } from '../../../utils/black-engine.module';

export default class ObjectController extends DisplayObject {
    constructor(scene, hint) {
        super();
        this._scene = scene;
        this._objects = this._scene._bg.mChildren;
        this._bb = Black.stage.bounds;
        this.initCheckmark();
    }

    onDown(x, y) {
        this.getObjectAtPosition(x, y)
    }

    initCheckmark() {
        this._checkmark = new Sprite("check");
        this._checkmark.scale = 0.4;

        this._checkmark.x = this._bb.right - this._checkmark.width;
        this._checkmark.y = this._bb.height / 2;
        this._checkmark.visible = false;
        this._checkBounds = this._checkmark.getBounds();
        this.add(this._checkmark)
    }

    getObjectAtPosition(x, y) {
        let selectedObject = null;

        for (let i = 0; i < this._objects.length; i++) {
            const object = this._objects[i];
            const objectBounds = object.getBounds();
            if (
                x >= objectBounds.x &&
                x <= objectBounds.x + objectBounds.width &&
                y >= objectBounds.y &&
                y <= objectBounds.y + objectBounds.height
            ) {
                selectedObject = object;
                console.log('Object selected:', selectedObject);
                this.hide(selectedObject);
                break; // Exit the loop after finding the first selected object
            } else if (x >= this._checkBounds.x &&
                x <= this._checkBounds.x + this._checkBounds.width &&
                y >= this._checkBounds.y &&
                y <= this._checkBounds.y + this._checkBounds.height) {
                selectedObject = object;

                this.show(selectedObject);
            }
        }

        if (!selectedObject) {
            console.log('No object selected');

        }
    }

    show(object) {
        object.visible = true;
        object.active = false;
        this._checkmark.visible = false;
        console.log("showing")
    }

    hide(object) {
        object.visible = false;
        object.active = true;
        console.log("hiding element")
        this._checkmark.visible = true;
    }
}
