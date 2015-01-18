var stage, output;

function init() {
	stage = new createjs.Stage("demoCanvas");
	
	// this lets our drag continue to track the mouse even when it leaves the canvas:
	// play with commenting this out to see the difference.
	stage.mouseMoveOutside = true; 
	
	var square = new createjs.Shape();
	square.graphics.beginFill("green").drawRect(0, 0, 1000, 1000);
	square.x = 0;
	square.y = 0;
	square.name = "background";
	stage.addChild(square);
	
	var container = new createjs.Container();
	container.x = container.y = 500;
	
	var circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 50);
	
	var label = new createjs.Text("drag me", "bold 14px Arial", "#FFFFFF");
	label.textAlign = "center";
	label.y = -7;
	
	var dragger = new createjs.Container();
	dragger.x = dragger.y = 100;
	dragger.regX = dragger.regY = 25;
	dragger.addChild(circle, label);
	
	
	
	
	var circle2 = new createjs.Shape();
	circle2.graphics.beginFill("blue").drawCircle(0, 0, 50);
	
	var label2 = new createjs.Text("drag me", "bold 14px Arial", "#FFFFFF");
	label2.textAlign = "center";
	label2.y = -7;
	
	var dragger2 = new createjs.Container();
	dragger2.x = 200;
	dragger2.y = 100;
	dragger2.regX = dragger2.regY = 25;
	dragger2.addChild(circle2, label2);
	
	
	
	
	stage.addChild(container);
	
	square.on("mousedown", function (evt) {
		container.offset = {x: container.x - evt.stageX, y: container.y - evt.stageY};
	});
	
	square.on("pressmove",function(evt) {
		// currentTarget will be the container that the event listener was added to:
		container.x = evt.stageX + container.offset.x;
		container.y = evt.stageY + container.offset.y;
		// make sure to redraw the stage to show the change:
		stage.update();   
	});
	
	dragger.on("mousedown", function (evt) {
		var pt = container.globalToLocal(evt.stageX, evt.stageY);
	
		this.offset = {x: this.x - pt.x, y: this.y - pt.y};
	});
	
	dragger.on("pressmove",function(evt) {
		var pt = container.globalToLocal(evt.stageX, evt.stageY);
		
		this.x = pt.x + this.offset.x;
		this.y = pt.y + this.offset.y;
		// make sure to redraw the stage to show the change:
		stage.update();   
	});
	
	dragger2.on("mousedown", function (evt) {
		var pt = container.globalToLocal(evt.stageX, evt.stageY);
	
		this.offset = {x: this.x - pt.x, y: this.y - pt.y};
	});
	
	dragger2.on("pressmove",function(evt) {
		var pt = container.globalToLocal(evt.stageX, evt.stageY);
		
		this.x = pt.x + this.offset.x;
		this.y = pt.y + this.offset.y;
		// make sure to redraw the stage to show the change:
		stage.update();   
	});
	
	container.addChild(dragger);
	container.addChild(dragger2);
	
	container.rotation=45;
	container.scaleX=1.5;
	container.scaleY=1.5;
	stage.update();
}