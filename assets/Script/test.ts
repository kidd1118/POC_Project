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

    @property(cc.Node)
    private mcInCode: cc.Node;


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

        this.mcInCode.addComponent('SpriteSheetAnimation');
        
        //cc.loader.
        //cc.loader.("res/lookup-html5.plist", function(){
        //    var sprite = cc.Sprite.create("grossini.bmp");
        //});

	}
}