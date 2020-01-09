function keyPressed()
{
    if (keyCode === 65 || keyCode === 37)
    {
        char.left = true;
        char.curDir = -1;
    }
    else if (keyCode === 68 || keyCode === 39)
    {
        char.right = true;
        char.curDir = 1;
    }
    else if (keyCode === 32 || keyCode === 87)
    {
        char.jump();
    }
    return;
}

function keyReleased()
{
    if (document.activeElement.nodeName == 'INPUT')
    {
        return;
    }

    if (keyCode === 65 || keyCode === 37)
    {
        char.left = false;
        if (char.right)
        {
            char.curDir = 1;
        }
        else
        {
            char.curDir = 0;
        }
    }
    else if (keyCode === 68 || keyCode === 39)
    {

        char.right = false;
        if (char.left)
        {
            char.curDir = -1;
        }
        else
        {
            char.curDir = 0;
        }
    }
    else if (keyCode === 32 || keyCode === 87)
    {
        char.jumpRelease();
    }
    return;
}