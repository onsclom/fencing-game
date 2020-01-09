class Character
{
    constructor(x, y, size, color)
    {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.left = false;
        this.right = false;
        this.speed = 1.25;
        this.dir = 0; //-1 is left, 0 neither, 1 right
    }

    update()
    {
        this.x += this.dir * this.speed;
    }

    draw()
    {
        fill(this.color);
        square(this.x, this.y, this.size);
    }

    leftPressed()
    {
        this.dir = -1;
        this.left = true;
    }

    leftReleased()
    {
        if (this.right)
        {
            this.dir = 1;
        }
        else
        {
            this.dir = 0;
        }
        this.left = false;
    }

    rightPressed()
    {
        this.dir = 1;
        this.right = true;
    }

    rightReleased()
    {
        if (this.left)
        {
            this.dir = -1;
        }
        else
        {
            this.dir = 0;
        }
        this.right = false;
    }

    attack()
    {
        
    }
}