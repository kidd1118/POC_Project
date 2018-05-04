const {ccclass, property} = cc._decorator;

@ccclass
export class test extends cc.Component {
    
    @property(cc.Node)
    private btnPlaySpine: cc.Node;

    @property(cc.Node)
    private btnPlaySpriteSheet: cc.Node;

    @property(cc.Node)
    private btnAddSpriteSheet: cc.Node;

    @property(sp.Skeleton)
    private spHit: sp.Skeleton;

    @property(cc.Animation)
    private animation: cc.Animation;

    @property(cc.Node)
    private mcInCode: cc.Node;

    @property(cc.Node)
    private spineInCode: cc.Node;

    @property(cc.Label)
    private labelAnimCount: cc.Label;
    private anminCount: number = 0;

    private spinetest: sp.Skeleton;

    protected onLoad() {
        this.spHit.paused = true;
        this.animation.stop();

        let btnPlaySpine: cc.Node = cc.find("Canvas/btnPlaySpine");
        btnPlaySpine.on(cc.Node.EventType.MOUSE_DOWN, ()=> {
            //this.spHit.paused = !this.spHit.paused;

            let texture = cc.textureCache.addImage('resources/spine/Spine_Hit the point.png', ()=>{}, null);
            let jsonPath = 'resources/spine/Spine_Hit the point.json';
            let atlasPath = 'resources/spine/Spine_Hit the point.atlas';

            cc.loader.load([jsonPath, atlasPath], (err, result) => {

                var skeletonData = new sp.SkeletonData();
                skeletonData.textures = [texture];
                skeletonData.atlasText = result.getContent(atlasPath);
                skeletonData.skeletonJson = result.getContent(jsonPath);
        
                this.spinetest.skeletonData = skeletonData; 
        
                //node.setPosition(200, 200);
                //this.node.addChild(node, 5);
            });
        });

        this.btnPlaySpriteSheet.on(cc.Node.EventType.MOUSE_DOWN, ()=> {
            this.animation.play();
        });

        this.btnAddSpriteSheet.on(cc.Node.EventType.MOUSE_DOWN, ()=> {
            var _node: cc.Node = new cc.Node();
            _node.x = Math.random() * 100;
            _node.y = 100;
            _node.addComponent('SpriteSheetAnimation');
            this.mcInCode.addChild(_node);
            this.labelAnimCount.string = (++this.anminCount).toString();
        });

	}
}