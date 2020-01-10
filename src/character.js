class Character
{
    constructor(x, y, size, color, disColor, side)
    {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.disabledColor = disColor;
        this.left = false;
        this.right = false;
        this.speed = 1.25;
        this.dir = 0; //-1 is left, 0 neither, 1 right
        this.side = side; //"left" or "right"
        this.disabledFrames = 0;
        this.missPenalty = 30;

        this.attacking = false;
        this.weapon = {
            unactiveColor: '#000',
            frame: 0,
            maxSize: 50,
            curSize: 0,
            width: 10,
            holdOffset: 5,
            active: false,
            activeColor: '#fff',
            framesProtracting: 15,
            framesMaxed: 10,
            framesRetracting: 15,
        }
        this.weapon.totalFrames = this.weapon.framesProtracting + this.weapon.framesMaxed + this.weapon.framesRetracting;
    }

    update()
    {
        //weapon stuff
        if (this.attacking)
        {
            this.weapon.frame += 1;

            if (this.weapon.frame <= this.weapon.framesProtracting)
            {
                this.weapon.active = true;
                this.weapon.curSize = this.weapon.maxSize * (this.weapon.frame / this.weapon.framesProtracting)
                this.disabledFrames = this.missPenalty;
            }
            else if (this.weapon.frame <= this.weapon.framesProtracting + this.weapon.framesMaxed)
            {
                this.weapon.active = true;
                this.disabledFrames = this.missPenalty;
            }
            else if (this.weapon.frame <= this.weapon.totalFrames)
            {
                this.weapon.active = false;
                this.weapon.curSize = this.weapon.maxSize * ((this.weapon.totalFrames - this.weapon.frame) / this.weapon.framesRetracting);
                this.disabledFrames = this.missPenalty;
            }
            else
            {
                this.attacking = false;
                this.weapon.frame = 0;
            }
        }

        //player location - half speed if attacking
        if (this.disabledFrames > 0)
        {
            this.disabledFrames -= 1;
            this.x += this.dir * (this.speed / 4);
        }
        else
        {
            this.x += this.dir * this.speed;
        }

        //checking if char past in the edge
        if (this.side == "left" && this.x < 0)
        {
            this.x = 0;
        }
        else if (this.side == "right" && this.x + this.size > width)
        {
            this.x = width - this.size;
        }
    }

    drawPlayer()
    {
        fill(this.color);
        if (this.disabledFrames > 0)
        {
            fill(this.disabledColor);
        }
        square(this.x, this.y, this.size);
    }

    drawWeapon()
    {
        //weapon
        if (this.weapon.active)
        {
            fill(this.weapon.activeColor);
        }
        else
        {
            fill(this.weapon.unactiveColor);
        }
        if (this.side == "left")
        {
            rect(this.x + this.size, this.y + this.weapon.holdOffset, this.weapon.curSize, this.weapon.width);
        }
        else
        {
            rect(this.x, this.y + this.weapon.holdOffset, -1 * this.weapon.curSize, this.weapon.width);
        }
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
        if (this.disabledFrames == 0)
        {
            this.attacking = true;
        }
    }

    reset()
    {
        this.disabledFrames = 0;
        this.weapon.frame = 0;
        this.weapon.active = false;
        this.weapon.curSize = 0;
        this.attacking = false;
    }
}