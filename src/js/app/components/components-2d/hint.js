import ConfigurableParams from '../../../data/configurable_params';
import { Tween, Black, Graphics, Sprite, DisplayObject, TextField, Ease, Timer } from '../../../utils/black-engine.module';
import UTween from '../../helpers/../../utils/utween';
import { TutorialHand } from './tutorial-hand';

export default class Hint extends DisplayObject {
    constructor(sceneNumber, sceneElements) {
        super();

        this._sign = null;

        this.scaleX = 1;
        this.scaleY = 1;

        this.visible = true;

        this._sceneNumber = sceneNumber;
        this._sceneElements = sceneElements;
    }

    onAdded() {

        // this._sign.blendMode = 'mask';
        const bb = Black.stage.bounds;
        this._hand = new TutorialHand();
        this._hand.x = this._sceneElements[0].x;
        this._hand.y = bb.bottom - 300;

        this.add(this._hand);

        if (ConfigurableParams.getData()['hint']['starting_hint_type']['value'] === 'INFINITY ONLY') this._hand.visible = false;
        this.show();

    }

    show() {
        if (ConfigurableParams.getData()['hint']['starting_hint_type']['value'] === 'NONE') return;

        console.log('show');
        this.visible = true;

        const numElements = this._sceneElements.length;
        let currentIndex = 0;

        const tapAndMove = new Tween(
            {
                scaleX: [1, 0.7, 1],
                scaleY: [1, 0.7, 1],
            },
            1,
            { ease: Ease.sinusoidalOut, delay: 1 }
        );

        tapAndMove.on('complete', () => {
            currentIndex++;
            if (currentIndex === numElements) {
                currentIndex = 0;
            }
            const nextElement = this._sceneElements[currentIndex];
            this._hand.x = nextElement.x;

        });

        this._hand.add(tapAndMove);
    }


    hide() {
        const hideTween = new Tween({
            y: Black.stage.bounds.bottom + 250
        }, 0.2);

        this.add(hideTween);

        hideTween.on('complete', msg => this.visible = false);
    }
}
