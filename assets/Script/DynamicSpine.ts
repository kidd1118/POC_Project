
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
        let texture = cc.textureCache.addImage('http://172.16.49.136:7458/res/raw-assets/resources/spine/Spine_Hit%20the%20point.png', ()=>{}, null);
        let jsonPath = 'spine/Spine_Hit the point.json';
        let atlasPath = 'spine/Spine_Hit the point.atlas';

        var skeletonData = new sp.SkeletonData();
            skeletonData.textures = [texture];

        cc.loader.loadRes(jsonPath, (err, atlas) => {

            skeletonData.atlasText = atlas;

            cc.loader.loadRes(atlasPath, (err, atlas) => {

                skeletonData.skeletonJson = atlas;
        
                self.sp.skeletonData = skeletonData;
                self.sp.paused = false;
                self.sp.loop = true;
            });
        });
    }

    start() {

    }

    update(dt) {

    }

}
