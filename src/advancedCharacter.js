class Character
{
    constructor(x, y, size, color, disColor, dashAttackingColor, side)
    {
        this.runtime = 1; //FOR SLOW MO!

        this.x = x;
        this.y = y;
        this.initialx = x;
        this.initialy = y;
        this.size = size;
        this.color = color;
        this.disabledColor = disColor;
        this.dashAttackingColor = dashAttackingColor;
        this.left = false;
        this.right = false;
        this.speed = 2;
        this.dir = 0; //-1 is left, 0 neither, 1 right
        this.oldDir = 0; //saves for slowmo TODO
        this.side = side; //"left" or "right"
        this.disabledFrames = 0;
        this.inDashAttackLag = false;
        this.missPenalty = 40;
        this.falling = false;
        this.gravity = 0;

        this.attacking = false;
        this.dashAttacking = false;
        this.weapon = {
            unactiveColor: '#000',
            frame: 0,
            maxSize: 50,
            curSize: 0,
            width: 10,
            holdOffset: 3,
            active: false,
            activeColor: '#fff',
            framesProtracting: 3,
            framesMaxed: 10,//10
            framesRetracting: 1, //these frames do not allow movement
        }
        this.weapon.totalFrames = this.weapon.framesProtracting + this.weapon.framesMaxed + this.weapon.framesRetracting;

        this.forceFrames = 0;
        this.currentForce = 0;

        this.dashing = false;
        this.dashCooldown = 30;
        
        this.ready = false;
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
                this.disabledFrames = this.missPenalty
            }
            else
            {
                this.attacking = false;
                this.weapon.frame = 0;
                this.disabledFrames = this.missPenalty*.5;//half the penalty for dash attack missing
            }
        }

        if (this.dashAttacking)
        {
            this.weapon.frame += 1 * this.runtime;

            if (this.weapon.frame <= this.weapon.framesProtracting)
            {
                this.weapon.active = true;
                this.weapon.curSize = this.weapon.maxSize*.85 * (this.weapon.frame / this.weapon.framesProtracting);
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
                this.weapon.frame = 0;
                this.disabledFrames = this.missPenalty;
                this.dashAttacking = false;
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
            this.x += (this.oldDir * (this.speed * ((this.missPenalty-this.disabledFrames) /this.missPenalty)) + this.currentForce) * this.runtime;
        }
        else if (this.disabledFrames == 0)
        {
            if (this.inDashAttackLag)
            {
                this.inDashAttackLag=false;
            }
            this.x += (this.oldDir * this.speed + this.currentForce) * this.runtime;
        }

        //slowdown force (friction)
        if (this.currentForce != 0)
        {
            this.currentForce *= .9 + .1*(1-this.runtime);
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

        //update dashing time
        this.dashFrame -= 1 * this.runtime;
        if (this.dashFrame < 0)
        {
            this.dashing = false;
        }
    }

    drawPlayer()
    {
        fill(this.color);
        if (this.inDashAttackLag)
        {
            fill(this.dashAttackingColor);
        }
        else if (this.disabledFrames > 0)
        {
            fill(this.disabledColor);
        }
        square(this.x, this.y, this.size);

        //draw dashing arrow above char
        if (this.dashing)
        {
            textAlign(CENTER, CENTER);
            textSize(20);
            this.color.setAlpha(150 + 105*(this.dashFrame/this.dashCooldown));
            fill(this.color);
            this.color.setAlpha(255);
            let dir;
            if (this.dashDir=="left")
            {
                dir="⬅";
            }
            else
            {
                dir="➡"
            }
            strokeWeight(0);
            text(dir, this.x+this.size/2, this.y-20);
            strokeWeight(1);
        }
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
        if (this.runtime != 1) //if it is in replay dont attack
        {
            return;
        }
        if (this.disabledFrames == 0 && ((this.side=="left" && this.dir == 1) && (this.dashing==false || this.dashDir!="right") 
            || (this.side=="right" && this.dir == -1) && (this.dashing==false || this.dashDir!="left")))
        {
            //dash forward
            this.dashing = true;
            this.dashFrame = this.dashCooldown;
            this.forceBack(-4);

            if (this.dir == 1)
            {
                this.dashDir = "right";
            }
            else
            {
                this.dashDir = "left";
            }
        }
        else if (this.disabledFrames == 0 && ((this.side=="left" && this.dir == -1) && (this.dashing==false || this.dashDir!="left") 
        || (this.side=="right" && this.dir == 1) && (this.dashing==false || this.dashDir!="right")))
        {
            //dash back
            this.dashing = true;
            this.dashFrame = this.dashCooldown;
            this.forceBack(4);

            if (this.dir == 1)
            {
                this.dashDir = "right";
            }
            else
            {
                this.dashDir = "left";
            }
        }
        else if (!this.dashAttacking && !this.inDashAttackLag && (this.side=="right" && this.dashing && this.dashDir=="left" || this.side=="left" && this.dashing && this.dashDir=="right"))
        //if dashing in, then allow dash attack
        {
            this.dashAttacking = true;
            this.forceBack(-3,"add");
            this.inDashAttackLag = true;
        }
        else if (this.disabledFrames == 0 && this.dir == 0)
        {
            this.attacking = true;
        }
        else if (!this.dashAttacking && this.disabledFrames == 0)
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
        this.currentForce = 0;
        this.dashing = false;
        this.y = this.initialy;
        this.x = this.initialx;
        this.dashAttacking=false;
        this.inDashAttackLag=false;
    }

    forceBack(amt,opt)
    {

        if (opt == "add")
        {
            if (this.side == "left")
            {
                this.currentForce -= amt;
            }
            else
            {
                this.currentForce += amt;
            }
        }

        else if (this.side == "left")
        {
            this.currentForce = -amt;
        }
        else
        {
            this.currentForce = amt;
        }
    }

}