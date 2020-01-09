function keyPressed()
{
    if (keyCode === 65)
    {
        game.leftPlayer.leftPressed();
    }
    else if (keyCode === 37)
    {
        game.rightPlayer.leftPressed();
    }
    else if (keyCode === 68)
    {
        game.leftPlayer.rightPressed();
    }
    else if (keyCode === 39)
    {
        game.rightPlayer.rightPressed();
    }
    else if (keyCode === 83)
    {
        game.leftPlayer.attack();
    }
    else if (keyCode === 40)
    {
        game.rightPlayer.attack();
    }
}

function keyReleased()
{
    if (keyCode === 65)
    {
        game.leftPlayer.leftReleased();
    }
    else if (keyCode === 37)
    {
        game.rightPlayer.leftReleased();
    }
    else if (keyCode === 68)
    {
        game.leftPlayer.rightReleased();
    }
    else if (keyCode === 39)
    {
        game.rightPlayer.rightReleased();
    }
}