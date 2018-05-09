const { ccclass, property } = cc._decorator;

@ccclass
export default class SpriteSheetAnimation extends cc.Component {

    @property(cc.Integer)
    public fps = 15;

    @property(cc.String)
    public debugPath = "";

    @property(cc.String)
    public clipName = "";

    private _sprite: cc.Sprite = null;
    private _atlas: cc.SpriteAtlas = null;
    private _isPlaying: boolean = false;
    private _max = 0;
    private _index = 0;
    private _delta = 0.0;

    onLoad() {
        this._sprite = this.addComponent(cc.Sprite);

        if (this.debugPath != ""){
            this.Apply(this.debugPath , this.clipName);
        }
    }

    public Apply(path: string, clip: string): void {
        this.clipName = clip;
        //即使 error 依樣可以正常運行 ( cocos 底層 ts load 少了 cc.SpriteAtlas 這個 type )
        cc.loader.loadRes(path, cc.SpriteAtlas, this._onLoadComplete.bind(this));
    }

    // public Pause(): void {
    //     this._isPlaying = false;
    // }

    // public Play(loop :boolean): void {
    //     this._isPlaying = true;
    // }

    private _onLoadComplete(err, atlas) {
        if (err == null){
            cc.loader.setAutoRelease(atlas , true);
            this._atlas = atlas;
            this._max = atlas.getSpriteFrames().length;
            this._isPlaying = true;
        }else{
            console.error(err);
        }
    }

    update(dt) {
        if (this._isPlaying && this.fps > 0) {
            this._delta += Math.min(1, dt);
            let rate = 1 / this.fps;
            if (rate < this._delta) {
                this._delta = (rate > 0) ? this._delta - rate : 0;
                if (++this._index >= this._max) {
                    this._index = 0;
                }
                this._sprite.spriteFrame = this._atlas.getSpriteFrame(this.clipName + this._index);
            }
        }
    }

}
