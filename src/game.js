class Game
{
    constructor()
    {
        this.platform = {
            x: -100,
            y: (2 / 3) * height,
            width: width * 2,
            height: (1 / 2) * height,
            color: color('#8f8')
        };

        this.charSize = 30;
        let leftColor = color('#44f');
        let leftDisabledColor = color('#88f');
        let rightColor = color('#f44');
        let rightDisabledColor = color('#f88');
        this.leftStart = (2 / 8) * width;
        this.rightStart = width * (6 / 8) - this.charSize;
        this.leftPlayer = new Character((2 / 8) * width, this.platform.y - this.charSize, this.charSize, leftColor, leftDisabledColor, "left");
        this.rightPlayer = new Character(width * (6 / 8) - this.charSize, this.platform.y - this.charSize, this.charSize, rightColor, rightDisabledColor, "right");

        this.leftScore = 0;
        this.rightScore = 0;
        this.leftCoords = [30, 45];
        this.rightCoords = [width - 30, 45];
        this.textSize = 40;
    }

    draw()
    {
        //players 
        this.playersUpdate();
        this.playerCollision();
        this.playersDraw();

        //platform
        fill(this.platform.color);
        rect(this.platform.x, this.platform.y, this.platform.width, this.platform.height);

        //coords
        textAlign(CENTER, CENTER);
        textSize(this.textSize);
        fill(this.leftPlayer.color);
        text(this.leftScore, this.leftCoords[0], this.leftCoords[1]);

        textSize(this.textSize);
        fill(this.rightPlayer.color);
        text(this.rightScore, this.rightCoords[0], this.rightCoords[1]);

        //check swords
        if (this.leftPlayer.x + this.leftPlayer.size + this.leftPlayer.weapon.curSize > this.rightPlayer.x && this.leftPlayer.weapon.active)
        {
            this.pointScored("left");
        }
        else if (this.rightPlayer.x - this.rightPlayer.weapon.curSize < this.leftPlayer.x + this.leftPlayer.size && this.rightPlayer.weapon.active)
        {
            this.pointScored("right");
        }
    }

    pointScored(winner)
    {
        if (winner == "left")
        {
            this.leftScore += 1;

        }
        else if (winner == "right")
        {
            this.rightScore += 1;
        }
        this.newRound();
    }

    newRound()
    {
        this.leftPlayer.x = this.leftStart;
        this.rightPlayer.x = this.rightStart;
        this.leftPlayer.reset();
        this.rightPlayer.reset();
    }

    playersUpdate()
    {
        this.leftPlayer.update();
        this.rightPlayer.update();
    }

    playersDraw()
    {
        this.leftPlayer.drawPlayer();
        this.rightPlayer.drawPlayer();

        //determining weapon draw priority
        if (this.leftPlayer.weapon.active && this.rightPlayer.weapon.active || this.leftPlayer.weapon.active)
        {
            if (this.leftPlayer.weapon.frame >= this.rightPlayer.weapon.frame)
            {
                this.rightPlayer.drawWeapon();
                this.leftPlayer.drawWeapon();
            }
            else
            {
                this.leftPlayer.drawWeapon();
                this.rightPlayer.drawWeapon();
            }
        }
        else
        {
            this.leftPlayer.drawWeapon();
            this.rightPlayer.drawWeapon();
        }

    }

    playerCollision()
    {
        let overlap = this.leftPlayer.x + this.leftPlayer.size - this.rightPlayer.x;
        if (overlap > 0) //overlap is positive if they are overlapping
        {
            this.leftPlayer.x -= overlap / 2;
            this.rightPlayer.x += overlap / 2;
        }
    }
}