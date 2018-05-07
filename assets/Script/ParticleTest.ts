// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class ParticleTest extends cc.Component {
    start() {
        var self = this;
        
        let particleNode = new cc.Node();
        let particle = particleNode.addComponent(cc.ParticleSystem) as cc.ParticleSystem;
        particle.file = cc.url.raw("resources/particle/particle_texture.plist");
        this.node.addChild(particleNode);

        // cc.loader.loadRes("particle_png/particle_texture-2", function (err, atlas) {
        //     console.log("enter load done");
        //     var p: cc.ParticleSystem = self.addComponent(cc.ParticleSystem) as cc.ParticleSystem;
        //     p.file = atlas;
        //     //p.file = atlas;
        //     console.log("over test script");
        // });
    }

    // update (dt) {}
}
