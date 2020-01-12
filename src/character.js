class Character
{
    constructor(x, y, size, color, disColor, side)
    {
        this.runtime = 1; //FOR SLOW MO!

        this.x = x;
        this.y = y;
        this.initialx = x;
        this.initialy = y;
        this.size = size;
        this.color = color;
        this.disabledColor = disColor;
        this.left = false;
        this.right = false;
        this.speed = 2;
        this.dir = 0; //-1 is left, 0 neither, 1 right
        this.oldDir = 0; //saves for slowmo TODO
        this.side = side; //"left" or "right"
        this.disabledFrames = 0;
        this.missPenalty = 20;
        this.falling = false;
        this.gravity = 0;

        this.attacking = false;
        this.weapon = {
            unactiveColor: '#000',
            frame: 0,
            maxSize: 50,
            curSize: 0,
            width: 10,
            holdOffset: 3,
            active: false,
            activeColor: '#fff',
            framesProtracting: 5,
            framesMaxed: 10,
            framesRetracting: 15, //not drawing this anymore, so framesRetracting+missPenalty = total lag
        }
        this.weapon.totalFrames = this.weapon.framesProtracting + this.weapon.framesMaxed + this.weapon.framesRetracting;

        this.forceFrames = 0;
        this.currentForce = 0;
    }

    update()
    {

        //weapon stuff
        if (this.attacking)
        {
            this.weapon.frame += 1 * this.runtime;

            if (this.weapon.frame <= this.weapon.framesProtracting)
            {
                this.weapon.active = true;
                this.weapon.curSize = this.weapon.maxSize * (this.weapon.frame / this.weapon.framesProtracting)
                this.disabledFrames = this.missPenalty;
            }
            else if (this.weapon.frame <= (this.weapon.framesProtracting + this.weapon.framesMaxed))
            {
                this.weapon.active = true;
                this.disabledFrames = this.missPenalty;
            }
            else if (this.weapon.frame <= (this.weapon.totalFrames))
            {
                this.weapon.active = false;
                this.weapon.curSize = 0;
                this.disabledFrames = this.missPenalty;
            }
            else
            {
                this.attacking = false;
                this.weapon.frame = 0;
            }
        }

        //oldDir for slowmo
        if (this.runtime==1)
        {
            this.oldDir = this.dir;
        }
        //player location - half speed if attacking
        if (this.disabledFrames > 0)
        {
            this.disabledFrames -= 1 * this.runtime;
            this.x += (this.oldDir * (this.speed / 4) + this.currentForce) * this.runtime;
        }
        else
        {
            this.x += (this.oldDir * this.speed + this.currentForce) * this.runtime;
        }

        //slowdown force (friction)
        if (this.currentForce != 0)
        {
            this.currentForce *= .9;
        }
        if (Math.abs(this.currentForce) < .1)
        {
            this.currentForce = 0;
        }

        //checking if char past in the edge
        if (this.falling == false && this.side == "left" && this.x + this.size < width * .15)
        {
            this.falling = true;
            this.gravity = .25 * this.runtime;
        }
        else if (this.falling == false && this.side == "right" && this.x > width * .85)
        {
            this.falling = true;
            this.gravity = .25 * this.runtime;
        }

        if (this.falling)
        {
            this.gravity += .5*this.runtime;
            this.y += this.gravity * this.runtime;

            if (this.side == "left" && this.x + this.size > width * .15) //hardcoded platform end
            {
                this.x = width * .15 - this.size;
            }
            else if (this.side == "right" && this.x < width * .85)
            {
                this.x = width - width * .15;
            }
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
            this.color.setAlpha(150);
            fill(this.color);
            this.color.setAlpha(255);
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
        this.falling = false;
        this.gravity = 0;
        this.y = this.initialy;
        this.x = this.initialx;
    }

    forceBack()
    {
        //smoothen this out later
        if (this.side == "left")
        {
            this.currentForce = -2;
        }
        else
        {
            this.currentForce = 2;
        }
    }
}