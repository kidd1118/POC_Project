import PocSpriteSheet from "./PocSpriteSheet";
import PocCommon from "./PocCommon";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PocTween extends PocCommon {

    protected _pss: PocSpriteSheet = null;
    protected _sp: cc.Node = null
    protected _isRun: boolean = false;

    protected _max: number = 0;
    protected _min: number = 0;
    protected _enableAddBtnTxt = "Tween Pos";

    start() {
        this._pss = cc.find("Canvas").getComponentInChildren(PocSpriteSheet);
        this.isReady = (this._pss !== null);

        this.list = ["easeIn", "easeInOut", "easeBackIn", "easeBounceIn", "easeQuarticActionIn"];
        this.curType = this.list[0];

        this._min = -this.displayWindow.width / 3 + 50;
        this._max = this.displayWindow.width / 2;
    }

    _onClean() {
        this._sp = null;
        this._isRun = false;
        this.unscheduleAllCallbacks();
        this.btn_add.getComponentInChildren(cc.Label).string = this._isRun ? "Stop" : this._enableAddBtnTxt;
    }

    _onAdd() {
        if (this.isReady) {
            if (this._sp == null) {
                this.node.dispatchEvent(new cc.Event.EventCustom('clear_screen', true));
                this._sp = this._pss._onAdd();
            }

            if (!this._isRun) {
                this.scheduleOnce(this._run.bind(this), 0);
                this._isRun = true;
            } else {
                this._sp.stopAllActions();
                this._isRun = false;
            }
            this.btn_add.getComponentInChildren(cc.Label).string = this._isRun ? "Stop" : "Start Tween";
        }
    }

    //run in next frame
    _run() {
        this._sp.setPosition(new cc.Vec2(this._min, 0));
        var finish = cc.callFunc(this._onFinish, this, this._sp)
        var aa = cc.sequence(cc.moveTo(1.5, this._max, 0).easing(this._switchEase(this.curType)), finish);
        this._sp.runAction(aa);
    }

    _onFinish(sp: cc.Node) {
        this.scheduleOnce(this._run.bind(this), 1);
    }

     protected _switchEase(thetype: string) {
        switch (thetype) {
            case "easeIn": return cc.easeIn(3);
            case "easeInOut": return cc.easeInOut(3);
            case "easeBackIn": return cc.easeBackIn();
            case "easeBounceIn": return cc.easeBounceIn();
            case "easeQuarticActionIn": return cc.easeQuarticActionIn();
        }
    }
}
