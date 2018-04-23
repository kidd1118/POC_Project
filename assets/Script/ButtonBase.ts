export class ButtonBase extends cc.Component {

    private pressedScale: number = 1;
    private transDuration: number = 1;
    private initScale;
    private button;
    private scaleDownAction;
    private scaleUpAction;

    protected onLoad(): void {
		var self = this;

        self.initScale = this.node.scale;
        self.button = self.getComponent(cc.Button);
        self.scaleDownAction = cc.scaleTo(self.transDuration, self.pressedScale);
        self.scaleUpAction = cc.scaleTo(self.transDuration, self.initScale);
        function onTouchDown (event) {
            console.log('onTouchDown!!!!!!!!!!!!!!1111');
            this.stopAllActions();
            this.runAction(self.scaleDownAction);
        }
        function onTouchUp (event) {
            console.log('onTouchUp!!!!!!!!!!!!!!1111');
            this.stopAllActions();
            this.runAction(self.scaleUpAction);
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
	}
}
