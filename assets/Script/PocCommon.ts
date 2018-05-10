
const { ccclass, property } = cc._decorator;

@ccclass
export default abstract class PocCommon extends cc.Component {

    //顯示目前所用的資源名稱
    @property(cc.Label)
    private label_type: cc.Label = null;

    //顯示目前所產生的數量
    @property(cc.Label)
    private label_count: cc.Label = null;

    @property(cc.Node)
    displayWindow: cc.Node = null;

    @property(cc.Node)
    btn_add: cc.Node = null;

    @property(cc.Node)
    btn_next: cc.Node = null;

    @property(cc.Node)
    btn_prev: cc.Node = null;

    @property(cc.Node)
    btn_clean: cc.Node = null;

    protected index: number = 0;
    protected config: object = null;
    protected list: string[] = null;

    private _count: number = 0;
    get count(): number {
        return this._count;
    }
    set count(theCount: number) {
        this._count = theCount;
        if (this.label_count != null)
            this.label_count.string = "Count : " + this.count.toString();
    }

    private _isReady: boolean = false;
    get isReady(): boolean {
        return this._isReady;
    }
    set isReady(theReady: boolean) {
        this._isReady = theReady;

        if (this._isReady) {
            this.registerButtonEvent();
        }
    }

    private _curType: string = "";
    get curType(): string {
        return this._curType;
    }
    set curType(theType: string) {
        this._curType = theType;
        this.label_type.string = this._curType;
    }

    protected registerButtonEvent(): void {
        this.btn_add.on(cc.Node.EventType.TOUCH_END, this._onAdd.bind(this));
        this.btn_next.on(cc.Node.EventType.TOUCH_END, this._onNext.bind(this));
        this.btn_prev.on(cc.Node.EventType.TOUCH_END, this._onPrev.bind(this));
        this.btn_clean.on(cc.Node.EventType.TOUCH_END, this._onClean.bind(this));

        cc.find("Canvas").on("clear_screen", this._onClean.bind(this));
    }

    abstract _onAdd(): void;

    protected _onNext() {
        if (++this.index >= this.list.length)
            this.index = 0;
        this.curType = this.list[this.index];
        this.label_type.string = this.curType;
    }

    protected _onPrev() {
        if (--this.index < 0)
            this.index = this.list.length - 1;
        this.curType = this.list[this.index];
        this.label_type.string = this.curType;
    }

    _onClean() {
        let childs = this.displayWindow.children;
        for (let i = 0; i < childs.length; i++) {
            childs[i].destroy();
        }
        this.count = 0;
    }

    protected _generateNewNode(): cc.Node {
        let node: cc.Node = new cc.Node();
        let x = this.displayWindow.width / 2 - Math.random() * this.displayWindow.width;
        let y = this.displayWindow.height / 2 - Math.random() * this.displayWindow.height;
        node.setPosition(x, y);
        return node;
    }

    public randomPosition() {
        let x = this.displayWindow.width / 2 - Math.random() * this.displayWindow.width;
        let y = this.displayWindow.height / 2 - Math.random() * this.displayWindow.height;
        return new cc.Vec2(x, y);
    }
}
