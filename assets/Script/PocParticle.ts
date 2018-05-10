import PocCommon from "./PocCommon";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PocParticle extends PocCommon {

    start() {
        this.curType = "particle_texture";
        this.isReady = true;
    }

    _onAdd() {
        let node = this._generateNewNode();
        let component = node.addComponent(cc.ParticleSystem);
        component.file = cc.url.raw("resources/particle/particle_texture.plist");
        component.resetSystem();
        this.displayWindow.addChild(node);
        this.count++;
    }

}
