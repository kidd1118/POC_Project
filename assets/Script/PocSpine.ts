import SpriteSheetAnimation from "./SpriteSheetAnimation";
import PocCommon from "./PocCommon";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PocSpine extends PocCommon {
    start() {
        cc.loader.loadRes("spine_config", this._onLoadConfigComplete.bind(this));
    }

    private _onLoadConfigComplete(error, result) {
        this.config = result;
        this.list = ["BIGWIN_LQ", "BIGWIN", "FS_BG", "Hit the point", "Multiple_BG", "NS_BG", "NS_Farmer", "YouGotFreeSpin_LQ", "YouGotFreeSpin"];

        this.curType = this.list[0];
        this.isReady = true;
    }

    _onAdd() {
        let _url: string = "spine/Spine_" + this.curType + "/Spine_" + this.curType;
        cc.loader.loadRes(_url, sp.SkeletonData, this._onLoadComplete.bind(this));
    }

    _onLoadComplete(error: Error, resource: any) {
        cc.loader.setAutoRelease(resource, true);
        let node = this._generateNewNode();

        let skeleton: sp.Skeleton = node.addComponent(sp.Skeleton);
        skeleton.skeletonData = resource;
        skeleton.animation = this.config[this.curType]["ani"][0];
        skeleton.paused = false;
        skeleton.loop = true;
        skeleton.premultipliedAlpha = false;

        node.setScale(0.2, 0.2);

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
