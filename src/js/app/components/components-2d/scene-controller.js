import { Scene } from 'three';
import ConfigurableParams from '../../../data/configurable_params';
import { Tween, Black, Graphics, Sprite, DisplayObject, TextField, Ease } from '../../../utils/black-engine.module';
import Helpers from '../../helpers/helpers';
import Scenes from './scenes';
import Hint from './hint';

export default class SceneController extends DisplayObject {
    constructor() {
        super();
        this._sceneNumer = 1;
    }

    onAdded() {
        this.controller(this._sceneNumer);
    }

    controller(sceneNumber) {
        this._scenes = new Scenes(sceneNumber);
        this.add(this._scenes);

        this._hint = new Hint(sceneNumber, this._scenes._sceneElements);
        this.add(this._hint)
    }
}
