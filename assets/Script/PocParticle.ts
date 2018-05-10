import PocCommon from "./PocCommon";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PocParticle extends PocCommon {

    start() {
        cc.loader.loadRes("particle_config", this._onLoadConfigComplete.bind(this));
    }

    //載入 config 完成
    private _onLoadConfigComplete(error, result) {
        this.config = result;
        this.list = result["keys"];

        this.curType = this.list[0];
        this.isReady = true;
    }

    _onAdd() {
        let node = this._generateNewNode();
        node.setScale(0.5, 0.5);

        let component = node.addComponent(cc.ParticleSystem);
        let data = this.config[this.curType];
        component.file = cc.url.raw(data["path"]);
        component.resetSystem();

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
