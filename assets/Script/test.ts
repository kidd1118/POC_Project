const {ccclass, property} = cc._decorator;

@ccclass
export class test extends cc.Component {
    
    @property(cc.Node)
    private btnPlaySpine: cc.Node;

    @property(cc.Node)
    private btnPlaySpriteSheet: cc.Node;

    @property(sp.Skeleton)
    private spHit: sp.Skeleton;

    @property(cc.Animation)
    private animation: cc.Animation;

    @property(cc.AnimationClip)
    private animationClip: cc.AnimationClip;

    @property(cc.SpriteAtlas)
    private spriteAtlas: cc.SpriteAtlas;

    @property(cc.SpriteFrame)
    private spriteFrame: cc.SpriteFrame;

    @property(cc.Sprite)
    private sprite: cc.Sprite;

    protected onLoad() {
        this.spHit.paused = true;
        this.animation.stop();

        let btnPlaySpine: cc.Node = cc.find("Canvas/btnPlaySpine");
        btnPlaySpine.on(cc.Node.EventType.MOUSE_DOWN, ()=> {
            this.spHit.paused = !this.spHit.paused;
        });

        this.btnPlaySpriteSheet.on(cc.Node.EventType.MOUSE_DOWN, ()=> {
            this.animation.play();
        });

        this.spriteFrame.setTexture('asstes/Texture/Ch_attck.plist');
        var aa = this.spriteFrame.getTexture();
	}
}