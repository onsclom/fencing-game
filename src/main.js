let game;

function setup()
{
    let canvas = createCanvas(600, 300);
    canvas.parent('sketch-holder');
    game = new Game();
    strokeWeight(1);
    stroke(color('rgb(211,211,211)'));
}


function draw()
{
    game.draw();
}