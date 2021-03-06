/**Platform
 * @param ctor : posX,posY,length
 * length can be 0..n
 */

var Shoes = cc.Class.extend({

    // renderer related.
    spriteSheet: null,
    sprite: null,

    // physics related.
    space: null,
    body: null,
    shape: null,

    x: 0,
    y: 0,
    /**
     * Construct a new player.
     */
    ctor: function (posX, posY) {

        this.x = posX;
        this.y = posY;

        this.spriteSheet = new cc.SpriteBatchNode(res.shoes.png);

        this.rotatingAction = new cc.RepeatForever(new cc.Animate(
            new cc.Animation([0, 1, 2, 3, 4].map(function (i) {
                return cc.spriteFrameCache.getSpriteFrame("shoes_0" + i + ".png");
            }), 0.15)
        ));
        this.rotatingAction.retain();

        this.sprite = new cc.PhysicsSprite("#shoes_00.png");
        this.sprite.setScale(0.4);
        this.spriteSheet.addChild(this.sprite);
        this.sprite.runAction(this.rotatingAction);
        this.sprite.retain();
        this.spriteSheet.retain();

        //physics
        var contentSize = this.sprite.getContentSize();
        var radius = 0.95 * this.sprite.getContentSize().width / 4;
        var body = new cp.Body(0.1, cp.momentForBox(Number.POSITIVE_INFINITY, contentSize.width, contentSize.height));
        body.applyForce(cp.v(0, 150), cp.v(0, 0));
        body.setPos(cc.p(posX, posY));
        this.sprite.setBody(body);
        this.body = body;

        this.shape = new cp.CircleShape(body, radius, cp.vzero);
        this.shape.setCollisionType(SpriteTag.shoes);
        //Sensors only call collision callbacks, and never generate real collisions
        this.shape.setSensor(true);
    },

    /**
     * Called by layer initialization.
     *
     */
    addToLayer: function (space, layer) {
        this.layer = layer;
        layer.addChild(this.spriteSheet, 5);

        this.space = space;
        space.addShape(this.shape);
    },

    /**
     * Called by layer cleanup.
     */
    removeFromLayer: function () {
//		var action = cc.moveTo(1, cc.p(this.x-50,this.y+300)).easing(cc.easeBounceOut());
//		this.sprite.runAction(action);
//
//		//remove sprite
//		this.sprite.removeFromParent();
//		this.sprite.release();
//		this.sprite = null;
//
//		//remove spritesheet
//		//this.spriteSheet.removeFromParent();
//		this.spriteSheet.removeFromParent();
//		
//		//remove action
//		this.rotatingAction.release();
//		this.rotatingAction = null;	
////		this.anim.release();
////		this.anim = null;
//		
//		this.space.removeStaticShape(this.shape);
//		//this.space.removeBody(this.shape.getBody());
//		this.shape = null;

//		this.spriteSheet.setVisible(false);
//		setTimeout(function(){
//			this.spriteSheet.setVisible(true);
//		}.bind(this),3000);
        var px = this.sprite.getPositionX();
        var py = this.sprite.getPositionY();
        this.action = cc.moveTo(0.5, cc.p(px + 200, py + 300)).easing(cc.easeBackIn());
        this.action.retain();
        this.sprite.runAction(this.action);
//		setTimeout(function(){
//			this.sprite.stopAction(this.action);
//		}.bind(this), 500);
    },

    getX: function () {
        return this.sprite.getPositionX();
    },

    getShape: function () {
        return this.shape;
    },

    getName: function () {
        return "shoes";
    }
}) 