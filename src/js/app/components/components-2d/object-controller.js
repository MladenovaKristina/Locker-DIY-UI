import { DisplayObject, Sprite, Black, Graphics } from '../../../utils/black-engine.module';
import { MessageDispatcher } from "../../../utils/black-engine.module";

export default class ObjectController extends DisplayObject {
    constructor(scene) {
        super();
        this._scene = scene;
        this._objects = this._scene._bg.mChildren;
        this.highlight = this._scene.highlight;
        this._bb = Black.stage.bounds;
        this.initCheckmark();

        this.messageDispatcher = new MessageDispatcher();

        this.onSelectEvent = 'onSelectEvent';
        this.onDeselectEvent = 'onDeselectEvent';

        this.selectedObject = null;
    }

    onDown(x, y) {
        this.getObjectAtPosition(x, y);
    }

    initCheckmark() {
        this._checkmark = new Sprite("check");
        this._checkmark.scale = 0.4;

        this._checkmark.x = this._bb.right - this._checkmark.width;
        this._checkmark.y = this._bb.height / 2;
        this._checkmark.visible = false;
        this._checkBounds = this._checkmark.getBounds();
        this.add(this._checkmark);
    }

    getObjectAtPosition(x, y) {
        let clickedObject = null;

        for (let i = 0; i < this._objects.length; i++) {
            const object = this._objects[i];
            const objectBounds = object.getBounds();

            if (
                x >= objectBounds.x &&
                x <= objectBounds.x + objectBounds.width &&
                y >= objectBounds.y &&
                y <= objectBounds.y + objectBounds.height
            ) {
                clickedObject = object;
                break; // Exit the loop after finding the clicked object
            } else if (
                x >= this._checkBounds.x &&
                x <= this._checkBounds.x + this._checkBounds.width &&
                y >= this._checkBounds.y &&
                y <= this._checkBounds.y + this._checkBounds.height
            ) {
                clickedObject = null; // Set clickedObject to null when checkmark is pressed
                break; // Exit the loop after finding the clicked object
            }
        }

        if (clickedObject === this.selectedObject) {
            this.deselectObject(clickedObject);
        } else {
            this.selectObject(clickedObject);
        }
    }

    selectObject(object) {
        const elementSelected = this._objects.indexOf(object);

        if (this.selectedObject) {
            const selectedElementIndex = this._objects.indexOf(this.selectedObject);
            if (selectedElementIndex !== -1) {
                this.messageDispatcher.post(this.onDeselectEvent, selectedElementIndex);
            }
            this.selectedObject = null; // Deselect the current item
        }

        if (object) {
            this.selectedObject = object;
            this.activateObject(this.selectedObject);
            this.messageDispatcher.post(this.onSelectEvent, elementSelected);
        } else {
            console.log('No object selected');
        }
    }

    deselectObject(object) {
        if (this.selectedObject) {
            const selectedElementIndex = this._objects.indexOf(this.selectedObject);
            if (selectedElementIndex !== -1) {
                this.messageDispatcher.post(this.onDeselectEvent, selectedElementIndex);
            }
            this.deactivateObject(this.selectedObject);
            this.selectedObject = null;
        }
    }

    activateObject(object) {
        this.highlight.visible = true;
        object.active = true;
        this._checkmark.visible = true;

        this.highlight.x = object.x + object.width / 2;
        this.highlight.y = object.y + object.height / 2;
    }

    deactivateObject(object) {
        this.highlight.visible = false;
        object.active = false;
        this._checkmark.visible = false;
    }
}