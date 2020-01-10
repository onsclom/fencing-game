let backgroundColor = '#bbb';
let game;

function setup()
{
    let canvas = createCanvas(600, 300);
    canvas.parent('sketch-holder');
    game = new Game();
    strokeWeight(4);
    stroke('black');
}


function draw()
{
    background(color(backgroundColor));

    game.draw();
}