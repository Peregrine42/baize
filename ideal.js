var stage;
var cards_container;
var card_images;

function init()
{
	card_images = load_images(url_list, on_image_load);
};

function on_image_load()
{
	var background_colour = "green";
	stage = make_stage(1000, 1000, background_colour);
	cards_container = make_cards_container(500, 500);
	stage.addChild(cards_container);
	
	make_cards(cards_container, card_images);
	
	stage.update();
};

function make_stage(width, height, background_colour)
{
	var stage = new createjs.Stage("demoCanvas");
	stage.mouseMoveOutside = true;
	
	var square = new createjs.Shape();
	square.graphics.beginFill(background_colour).drawRect(0, 0, width, height);
	square.x = 0;
	square.y = 0;
	square.name = "background";
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

function make_cards(container, images)
{
  
}