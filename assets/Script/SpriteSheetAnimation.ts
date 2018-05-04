
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
export default class SpriteSheetAnimation extends cc.Component {
    
    @property(cc.Integer)
    public fps = 15;

    @property(cc.String)
    public path = "atlas/Ch_attck";
    //public path = "json/Ch_jump.json";

    @property(cc.String)
    public clipName = "attck_";

    private sp: cc.Sprite = null;
    private ch_Atlas: cc.SpriteAtlas = null;
    private isPlaying: boolean = false;
    private max = 0;
    private index = 0;
    private delta = 0.0;

    onLoad () {
        this.sp = this.addComponent(cc.Sprite);
    }    

    start() {
        var self = this;
        //較好的方式 plist 檔案需與 texture 分開 folder 或是使用不同的名稱
        cc.loader.loadRes(this.path, cc.SpriteAtlas, function (err, atlas) {
            self.ch_Atlas = atlas;
            self.max = atlas.getSpriteFrames().length;
            self.isPlaying = true;
        });
    }

    update(dt) {
        if (this.isPlaying && this.fps > 0) {
            this.delta += Math.min(1, dt);
            let rate = 1 / this.fps;
            if (rate < this.delta) {
                this.delta = (rate > 0) ? this.delta - rate : 0;
                if (++this.index >= this.max) {
                    this.index = 0;
                }
                this.sp.spriteFrame = this.ch_Atlas.getSpriteFrame(this.clipName + this.index);
            }
        }
    }

}
