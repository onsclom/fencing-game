let backgroundColor = '#bbb';
let game;

function setup()
{
    let canvas = createCanvas(600, 300);
	canvas.parent('sketch-holder');
	game = new Game();
}


function draw()
{
	background(color(backgroundColor));
	
	game.draw();
}