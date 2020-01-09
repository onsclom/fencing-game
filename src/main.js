let backgroundColor = '#bbb';

function setup()
{
    let canvas = createCanvas(600, 300);
    canvas.parent('sketch-holder');
}


function draw()
{
	background(color(backgroundColor));

	//draw platform
	fill(220); 
	rect((1/8)*width,(2/3)*height,(6/8)*width,(1/20)*height);
}