import { Black, DisplayObject, Rectangle, Sprite } from '../../../utils/black-engine.module';
import model from '../../../data/model';
import Helpers from '../../helpers/helpers';
import PlayButton from './play-button';
import Endscreen from './endscreen';
import ConfigurableParams from '../../../data/configurable_params';
import TopText from './top-text';
import Tutorial from './tutorial';
import ReferencePhoto from './ref-photo';
import SceneController from './scene-controller';
import ObjectController from './object-controller';
import Hint from './hint';
import { MessageDispatcher } from "../../../utils/black-engine.module";

// works as a main class in 2D playables
export default class Layout2D extends DisplayObject {
  constructor() {
    super();

    this.onPlayBtnClickEvent = 'onPlayBtnClickEvent';
    this.onActionClickEvent = 'onActionClickEvent';

    this.messageDispatcher = new MessageDispatcher();
    this.onSelectEvent = 'onSelectEvent';
    this.onDeselectEvent = 'onDeselectEvent';


    this._platform = model.platform;
    this._downloadBtn = null;
    this._logoGoogle = null;
    this._endScreen = null;

    this._isStaticStoreMode = false;
  }

  onAdded() {
    this._topText = new TopText();
    this.add(this._topText);

    this._refPhoto = new ReferencePhoto();
    this.add(this._refPhoto);

    // this._tutorial = new Tutorial();
    // this.add(this._tutorial);

    this._createEndscreen();

    this._createLogo();
    this._createDownloadBtn();
    this._initSceneController();
    this._initObjectController();
    this._initHint();

    this.onResize();
    Black.stage.on('resize', this.onResize, this);
  }

  onResize() {
    const bb = Black.stage.bounds;

    this._topText.onResize();
    this._topText.x = bb.left;
    this._topText.y = bb.top + Number(ConfigurableParams.getData()["top_text"]["top_title_offset"]["value"]);


    this._refPhoto.x = bb.left + Number(ConfigurableParams.getData()["reference_photo"]["offset"]["x"]);
    this._refPhoto.y = bb.top + Number(ConfigurableParams.getData()["reference_photo"]["offset"]["y"]);
    if (this._topText.visible)
      this._refPhoto.y = this._topText.y + this._topText.height + Number(ConfigurableParams.getData()["reference_photo"]["offset"]["y"]);
    // 
    //     this._tutorial.x = Black.stage.centerX;
    //     this._tutorial.y = Black.stage.centerY + bb.height * 0.18;

    this._endScreen.onResize(bb);

    if (this._logoGoogle) {
      this._logoGoogle.scaleX = 0.9;
      this._logoGoogle.scaleY = 0.9;

      this._logoGoogle.x = bb.right - 240;
      this._logoGoogle.y = bb.top + 15;
    }

    if (this._downloadBtn) {
      this._downloadBtn.scaleX = 0.6;
      this._downloadBtn.scaleY = 0.6;

      this._downloadBtn.x = Helpers.LP(bb.right - 170, Black.stage.centerX);
      this._downloadBtn.y = bb.bottom - 85;
    }
  }

  _createEndscreen() {
    const endscreen = this._endScreen = new Endscreen();
    this.add(endscreen);

    endscreen.on(endscreen.onPlayBtnClickEvent, msg => {
      this.post(this.onPlayBtnClickEvent);
    });
  }

  _createLogo() {
    if (model.platform === "google_landscape" || model.platform === "google_portrait") {
      const logo = this._logoGoogle = new Sprite('logo');
      logo.alignAnchor(0, 0);
      this.add(logo);
    }
  }

  _createDownloadBtn() {
    if (model.platform === "mintegral" || ConfigurableParams.isNeedShowPN()) {
      const downloadBtn = this._downloadBtn = new PlayButton(ConfigurableParams.getData()["play_button"]["play_now_text"]["value"]);
      downloadBtn.visible = true;
      this.add(downloadBtn);
    }
  }
  _initSceneController() {
    this._sceneController = new SceneController();
    this.add(this._sceneController)
  }

  _initHint() {
    this._hint = new Hint(this._sceneController._scenes._sceneElements);
    this.add(this._hint)
  }

  _initObjectController() {
    this._objectController = new ObjectController(this._sceneController._scenes, this._hint);
    this.add(this._objectController)

    this._objectController.messageDispatcher.on(this._objectController.onSelectEvent, (msg, elementSelected) => {
      this.onSelectEvent = 'onSelectEvent';
      this.messageDispatcher.post(this.onSelectEvent, elementSelected);
    });
    this._objectController.messageDispatcher.on(this._objectController.onDeselectEvent, (msg, elementSelected) => {
      this.onDeselectEvent = 'onDeselectEvent';
      this.messageDispatcher.post(this.onDeselectEvent, elementSelected);

    });
  }

  onDown(x, y) {
    const defaultPos = { x: x, y: y };
    const blackPos = Black.stage.worldTransformationInverted.transformVector(defaultPos);

    const ifDownloadButtonClicked = this._ifDownloadButtonClicked(blackPos.x, blackPos.y);
    if (ifDownloadButtonClicked) return true;

    // this._tutorial.hide();
    this._endScreen.onDown(blackPos.x, blackPos.y);
    this._objectController.onDown(blackPos.x, blackPos.y);
  }

  onMove(x, y) {
    const defaultPos = { x: x, y: y };
    const blackPos = Black.stage.worldTransformationInverted.transformVector(defaultPos);
  }

  onUp() {
  }

  enableStoreMode() {
    if (this._isStaticStoreMode) return;
    this._isStaticStoreMode = true;

    if (this._downloadBtn) this._downloadBtn.visible = false;
    if (this._logoGoogle) this._logoGoogle.visible = false;
    this._topText.visible = false;
    // this._tutorial.visible = false;
    this._refPhoto.visible = false;

    this._endScreen.show();
  }

  _ifDownloadButtonClicked(x, y) {
    if (!this._isStaticStoreMode && this._downloadBtn) {
      const isButtonClick = this._downloadBtn.isDown(x, y);
      if (isButtonClick) {
        this.post(this.onPlayBtnClickEvent);
        return true;
      }
    }

    return false;
  }
}
