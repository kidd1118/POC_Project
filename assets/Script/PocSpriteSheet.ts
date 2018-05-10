import SpriteSheetAnimation from "./SpriteSheetAnimation";
import PocCommon from "./PocCommon";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PocSpriteSheet extends PocCommon {

    start() {
        cc.loader.loadRes("spritesheet_config", this._onLoadConfigComplete.bind(this));
    }

    //載入 spritesheet config 完成
    private _onLoadConfigComplete(error, result) {
        this.config = result;
        this.list = result["keys"];

        this.curType = this.list[0];
        this.isReady = true;
    }

    _onAdd() {
        let node = this._generateNewNode();
        let ani = node.addComponent(SpriteSheetAnimation);
        let data = this.config[this.curType]
        ani.Apply(data["path"], data["clip"]);

        let child: cc.Node = this.displayWindow.getChildByName(this.curType);
        if (child == null){
            child = new cc.Node();
            child.name = this.curType;
            this.displayWindow.addChild(child);
        }

        child.addChild(node);
        this.count++;
    }
}
