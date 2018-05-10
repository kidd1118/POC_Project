import PocTween from "./PocTween";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PocTweenScale extends PocTween {

    start() {
        super.start();
        this._max = 2;
        this._min = 0.5;
    }

    _run() {
        this._sp.setScale(this._min, this._min);
        this._sp.setPosition(new cc.Vec2(0, 0));
        var finish = cc.callFunc(this._onFinish, this, this._sp)
        var act = cc.sequence(cc.scaleTo(1.5, this._max, this._max).easing(this._switchEase(this.curType)), finish);
        this._sp.runAction(act);
    }
}
