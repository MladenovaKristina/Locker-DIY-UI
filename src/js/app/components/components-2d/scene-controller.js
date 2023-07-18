import { Scene } from 'three';
import ConfigurableParams from '../../../data/configurable_params';
import { Tween, Black, Graphics, Sprite, DisplayObject, MessageDispatcher, Ease } from '../../../utils/black-engine.module';
import Helpers from '../../helpers/helpers';
import Scenes from './scenes';

export default class SceneController extends DisplayObject {
    constructor() {
        super();
        this._sceneNumer = 4;

    }

    onAdded() {
        this.controller(this._sceneNumer);
    }

    controller(sceneNumber) {
        this._scenes = new Scenes(sceneNumber);
        this.add(this._scenes);
    }
}
