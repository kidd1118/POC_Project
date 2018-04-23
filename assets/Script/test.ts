const {ccclass, property} = cc._decorator;

@ccclass
export class test extends cc.Component {
    
    @property(cc.Node)
    private btnPlaySpine: cc.Node;

    @property(sp.Skeleton)
    private spHit: sp.Skeleton;

    @property(cc.AnimationClip)
    private mc: cc.AnimationClip;

    protected onLoad() {
        this.spHit.paused = true;

        let btnPlaySpine: cc.Node = cc.find("Canvas/btnPlaySpine");
        btnPlaySpine.on(cc.Node.EventType.MOUSE_DOWN, ()=> {
            this.spHit.paused = !this.spHit.paused;
        });

        //this.btnPlaySpine.on(cc.Node.EventType.MOUSE_DOWN, ()=> {
        //    this.spHit.paused = !this.spHit.paused;
        //});

        //let ButtonBase = this.btnPlaySpine.getComponent('ButtonBase');
	}
}