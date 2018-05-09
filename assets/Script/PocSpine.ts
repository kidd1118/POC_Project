import SpriteSheetAnimation from "./SpriteSheetAnimation";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PocSpine extends cc.Component {

    @property(cc.Label)
    label_type: cc.Label = null;

    @property(cc.Label)
    label_count: cc.Label = null;

    @property(cc.Node)
    displayWindow: cc.Node = null;

    @property(cc.Node)
    btn_add_spine: cc.Node = null;

    @property(cc.Node)
    btn_next_spine: cc.Node = null;

    @property(cc.Node)
    btn_prev_spine: cc.Node = null;

    private _curType = "";
    private _index: number = 0;
    private count: number = 0;
    private list: string[] = ["BIGWIN_LQ", "BIGWIN", "FS_BG", "Hit the point", "Multiple_BG", "NS_BG", "NS_Farmer", "YouGotFreeSpin_LQ", "YouGotFreeSpin"];
    private config: object;

    start() {
        cc.loader.loadRes("spine_config", this._onConfigLoadComplete.bind(this));
    }

    private _onConfigLoadComplete(error, result) {
        this.config = result;

        this.btn_add_spine.on(cc.Node.EventType.TOUCH_END, this._onAddSpine.bind(this));
        this.btn_next_spine.on(cc.Node.EventType.TOUCH_END, this._nextSpine.bind(this));
        this.btn_prev_spine.on(cc.Node.EventType.TOUCH_END, this._prevSpine.bind(this));

        this._curType = this.list[0];
        this.label_type.string = this._curType;
    }

    _nextSpine() {
        if (++this._index >= this.list.length)
            this._index = 0;
        this._curType = this.list[this._index];
        this.label_type.string = this._curType;
    }

    _prevSpine() {
        if (--this._index < 0)
            this._index = this.list.length - 1;
        this._curType = this.list[this._index];
        this.label_type.string = this._curType;
    }

    _onAddSpine() {
        let _url: string = "spine/Spine_" + this._curType + "/Spine_" + this._curType;
        cc.loader.loadRes(_url, sp.SkeletonData, this._onLoadComplete.bind(this));
    }

    _onLoadComplete(error: Error, resource: any) {
        cc.loader.setAutoRelease(resource, true);
        let node = new cc.Node();
        let skeleton: sp.Skeleton = node.addComponent(sp.Skeleton);
        skeleton.skeletonData = resource;
        skeleton.animation = this.config[this._curType]["ani"][0];
        skeleton.paused = false;
        skeleton.loop = true;
        let x = this.displayWindow.width / 2 - Math.random() * this.displayWindow.width;
        let y = this.displayWindow.height / 2 - Math.random() * this.displayWindow.height;
        node.setPosition(x, y);
        node.setScale(0.2, 0.2);
        this.displayWindow.addChild(node);
        this.count ++;

        this.label_count.string = "Count : " + (this.count++)
    }
}
