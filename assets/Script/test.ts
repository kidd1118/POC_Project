const {ccclass, property} = cc._decorator;

@ccclass
export class test extends cc.Component {
    
    @property(cc.Node)
    private btnPlaySpine: cc.Node;

    @property(cc.Node)
    private btnPlaySpriteSheet: cc.Node;

    @property(cc.Node)
    private btnAddSpriteSheet: cc.Node;

    @property(cc.Node)
    private btnAddParticle: cc.Node;

    @property(cc.Node)
    private btnAddSpine: cc.Node;

    @property(sp.Skeleton)
    private spHit: sp.Skeleton;

    @property(cc.Animation)
    private animation: cc.Animation;

    @property(cc.Node)
    private mcInCode: cc.Node;

    @property(cc.Node)
    private ParticleInCode: cc.Node;

    @property(cc.Label)
    private labelAnimCount: cc.Label;
    private anminCount: number = 0;

    @property(cc.Label)
    private labelParticleCount: cc.Label;
    private particleCount: number = 0;

    @property(cc.Label)
    private labelSpineCount: cc.Label;
    private spineCount: number = 0;

    @property(cc.Node)
    private spineInCode: cc.Node;

    protected onLoad() {
        this.spHit.paused = true;
        this.animation.stop();

        let btnPlaySpine: cc.Node = cc.find("Canvas/btnPlaySpine");
        btnPlaySpine.on(cc.Node.EventType.TOUCH_START, ()=> {

            this.spHit.paused = !this.spHit.paused;
        });

        this.btnPlaySpriteSheet.on(cc.Node.EventType.TOUCH_START, ()=> {
            this.animation.play();
        });

        this.btnAddSpriteSheet.on(cc.Node.EventType.TOUCH_START, ()=> {
            var _node: cc.Node = new cc.Node();
            _node.x = Math.random() * 100;
            _node.y = 100;
            _node.addComponent('SpriteSheetAnimation');
            this.mcInCode.addChild(_node);

            this.labelAnimCount.string = (++this.anminCount).toString();
        });

        this.btnAddParticle.on(cc.Node.EventType.TOUCH_START, ()=> {
            var _node: cc.Node = new cc.Node();
            _node.x = Math.random() * 100;
            _node.y = 100;
            _node.addComponent('ParticleTest');
            this.ParticleInCode.addChild(_node);

            this.labelParticleCount.string = (++this.particleCount).toString();
        });

        this.btnAddSpine.on(cc.Node.EventType.TOUCH_START, ()=> {
            var _node: cc.Node = new cc.Node();
            _node.x = Math.random() * 100;
            _node.y = 100;
            _node.addComponent('DynamicSpine');
            this.spineInCode.addChild(_node);

            this.labelSpineCount.string = (++this.spineCount).toString();

            //cc.loader.load([jsonPath, atlasPath], (err, result) => {

            //    var skeletonData = new sp.SkeletonData();
            //    skeletonData.textures = [texture];
            //    skeletonData.atlasText = result.getContent(atlasPath);
            //    skeletonData.skeletonJson = result.getContent(jsonPath);
        
            //    this.spineInCode.skeletonData = skeletonData;

                //node.setPosition(200, 200);
                //this.node.addChild(node, 5);
            //});
        });

	}
}