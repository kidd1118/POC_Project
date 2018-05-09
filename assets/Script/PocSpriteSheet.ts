import SpriteSheetAnimation from "./SpriteSheetAnimation";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PocSpriteSheet extends cc.Component {

    @property(cc.Label)
    label_type: cc.Label = null;

    @property(cc.Label)
    label_count: cc.Label = null;

    @property(cc.Node)
    displayWindow: cc.Node = null;

    @property(cc.Node)
    btn_add: cc.Node = null;

    @property(cc.Node)
    btn_next: cc.Node = null;

    @property(cc.Node)
    btn_prev: cc.Node = null;

    private curType = "";
    private index: number = 0;
    private list: string[] = [];
    private config: object;
    private count: number = 0;

    start() {
        cc.loader.loadRes("spritesheet_config", this._onLoadConfigComplete.bind(this));
    }

    //載入 spritesheet config 完成
    private _onLoadConfigComplete(error, result) {
        this.config = result;
        this.list = result["keys"];
        this.btn_add.on(cc.Node.EventType.TOUCH_END, this._onAdd.bind(this));
        this.btn_next.on(cc.Node.EventType.TOUCH_END, this._onNext.bind(this));
        this.btn_prev.on(cc.Node.EventType.TOUCH_END, this._onPrev.bind(this));

        this.curType = this.list[0];
        this.label_type.string = this.curType;
    }

    private _onNext() {
        if (++this.index >= this.list.length)
            this.index = 0;
        this.curType = this.list[this.index];
        this.label_type.string = this.curType;
    }

    private _onPrev() {
        if (--this.index < 0)
            this.index = this.list.length - 1;
        this.curType = this.list[this.index];

        this.label_type.string = this.curType;
    }

    private _onAdd() {
        let node = new cc.Node();
        let ani = node.addComponent(SpriteSheetAnimation);
        let data = this.config[this.curType]
        ani.Apply(data["path"], data["clip"]);
        let x = this.displayWindow.width / 2 - Math.random() * this.displayWindow.width;
        let y = this.displayWindow.height / 2 - Math.random() * this.displayWindow.height;
        node.setPosition(x, y);
        this.displayWindow.addChild(node);

        this.label_count.string = "Count : " + (this.count++)
    }
}
