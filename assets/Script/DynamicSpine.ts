
// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;


@ccclass
export default class DynamicSpine extends cc.Component {
    
    private sp: sp.Skeleton = new sp.Skeleton();

    onLoad () {
        var self = this;
        /*let texture = cc.textureCache.addImage('http://localhost:7456/res/raw-assets/resources/spine/Spine_Hit%20the%20point.png', ()=>{}, null);
        let jsonPath = 'spine/Spine_Hit the point.json';
        let atlasPath = 'spine/Spine_Hit the point.atlas';

        var skeletonData = new sp.SkeletonData();
            skeletonData.textures = [texture];

        cc.loader.loadRes(jsonPath, (err, atlas) => {

            skeletonData.atlasText = atlas;

            cc.loader.loadRes(atlasPath, (err, atlas) => {

                skeletonData.skeletonJson = atlas;
        
                self.sp.skeletonData = skeletonData;
                self.sp.animation = "Hit the point";
                self.sp.paused = false;
                self.sp.loop = true;
            });
        });*/

        let jsonPath = cc.url.raw( 'resources/spine/Spine_NS_Farmer.json' );
        let atlasPath = cc.url.raw( 'resources/spine/Spine_NS_Farmer.atlas' );
        let texturePath = cc.url.raw( 'resources/spine/Spine_NS_Farmer.png' );
        let texture = cc.textureCache.addImage(cc.url.raw( 'resources/spine/Spine_NS_Farmer.png' ), ()=>{}, null);

        cc.loader.load( [texturePath, jsonPath, atlasPath], (err, result) => {
            let skeletonData: sp.SkeletonData = new sp.SkeletonData();
            skeletonData.textures = [result.getContent(texturePath)];
            skeletonData.atlasText = result.getContent(atlasPath);
            skeletonData.skeletonJson = result.getContent(jsonPath);

            let node = new cc.Node();
            let skeleton: sp.Skeleton = node.addComponent(sp.Skeleton); 
            skeleton.skeletonData = skeletonData; 
            skeleton.animation = "Idle";
            skeleton.paused = false;
            skeleton.loop = true;

            node.setPosition(100, 100);
            this.node.addChild(node);
        }); 
    }

    start() {

    }

    update(dt) {

    }

}
