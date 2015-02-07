var stage;
var cardImages;
var cards;
var testImage;
var background_colour = "green";
var stageWidth        = 1000;
var stageHeight       = 1000;

function init()
{
	var urlList = [];
	//cardImages = load_images(urlList, on_image_load);
	
	testImage = new Image();
	
	testImage.onload = on_image_load;
  testImage.onerror = function() { console.log("oops!")};
  testImage.src = "img/fog.jpg";
};

// function load_images(urls, callback)
// {
  // var bitmap = new createjs.Bitmap("http://images.clipartpanda.com/mountain-clip-art-mountain-clip-art-10.jpg");
	// cardImages.push(bitmap);
	//bitmap.image.onload = function() { };
	
	// callback();
// };

function on_image_load()
{
	stage = make_stage(stageWidth, stageHeight, background_colour);
	var cardsContainer = make_cards_container(stageWidth/2, stageHeight/2);
	stage.cardsContainer = cardsContainer;
	stage.addChild(stage.cardsContainer);
	
	var cards = make_cards(cardImages);
	_.each(cards, function(card, index, list) 
	{
		card.gameStage = stage;
		card.gameContainer = stage.cardsContainer;
	  cardsContainer.addChild(card);
	});
	
	stage.update();
};

function make_stage(width, height, background_colour)
{
	var stage = new createjs.Stage("demoCanvas");
	stage.mouseMoveOutside = true;
	stage.cardsContainer = 0;
	
	var square = new createjs.Shape();
	square.graphics.beginFill(background_colour).drawRect(0, 0, width, height);
	square.x = 0;
	square.y = 0;
	square.name = "background";
	
	square.gameStage = stage;
	
	square.on("mousedown", function (evt) {
		stage.cardsContainer.offset = {x: stage.cardsContainer.x - evt.stageX, 
														       y: stage.cardsContainer.y - evt.stageY};
	});
	
	square.on("pressmove",function(evt) {
		stage.cardsContainer.x = evt.stageX + stage.cardsContainer.offset.x;
		stage.cardsContainer.y = evt.stageY + stage.cardsContainer.offset.y;
		square.gameStage.update();   
	});
	
	stage.addChild(square);
	return stage;
};

function make_cards_container(origin_x, origin_y)
{
	var container = new createjs.Container();
	container.x = origin_x;
	container.y = origin_y;
	return container;
};

function make_cards(images)
{
	var cards = [];
	
  var circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 50);
	
	var label = new createjs.Text("drag me", "bold 14px Arial", "#FFFFFF");
	label.textAlign = "center";
	label.y = -7;
	
	var dragger = new createjs.Container();
	dragger.x = dragger.y = 0;
	dragger.regX = dragger.regY = 25;
	dragger.addChild(circle, label);
	dragger.gameContainer = 0;
	dragger.gameStage = 0;
	dragger.offset = {x: 0, y: 0};
	
	// methods	
	dragger.on("mousedown", function (evt) {
		// record offset
		var pt = dragger.gameContainer.globalToLocal(evt.stageX, evt.stageY);
	
		this.offset = {x: this.x - pt.x, y: this.y - pt.y};
	});
	
	dragger.on("pressmove",function(evt) {
		var pt = dragger.gameContainer.globalToLocal(evt.stageX, evt.stageY);
		
		this.x = pt.x + this.offset.x;
		this.y = pt.y + this.offset.y;
		dragger.gameStage.update();   
	});
	
	cards.push(dragger);
	
	var testData = new createjs.SpriteSheet({
	  images: [testImage],
    frames: {width:222, height:310, count:20, regX: 111, regY:155, spacing:0, margin:0}
	});
	var sprite = new createjs.Sprite(testData);
	sprite.x = 0;
	sprite.y = 0;
	cards.push(sprite);
	
	// methods	
	sprite.on("mousedown", function (evt) {
		// record offset
		var pt = sprite.gameContainer.globalToLocal(evt.stageX, evt.stageY);
	
		this.offset = {x: this.x - pt.x, y: this.y - pt.y};
	});
	
	sprite.on("pressmove",function(evt) {
		var pt = sprite.gameContainer.globalToLocal(evt.stageX, evt.stageY);
		
		this.x = pt.x + this.offset.x;
		this.y = pt.y + this.offset.y;
		sprite.gameStage.update();   
	});
	
	return cards;
}