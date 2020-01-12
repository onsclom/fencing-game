class Game
{
    constructor()
    {
        this.platform = {
            x: width * .15,
            y: (2 / 3) * height,
            width: width * .7,
            height: (1 / 2) * height, //needs to go below so there is no double outline
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
        this.middleCoords = [width * .5, 45];
        this.winColor = color(0);
        this.winText = "";
        this.largeText = 40;


        this.freezeFrame = 0;
        this.freezeTime = 60;

        this.backgroundColor = color("#bbb");
    }

    draw()
    {
        if (this.freezeFrame > 0)
        {
            this.leftPlayer.runtime=.1;
            this.rightPlayer.runtime=.1;

            this.playersAndPlatformDraw();
    
            let transparentGray = color("gray");
            transparentGray.setAlpha(100);
            background(transparentGray);

            textAlign(CENTER, CENTER);
            textSize(this.largeText);
            fill(this.winColor);
            text(this.winText, this.middleCoords[0], this.middleCoords[1]);

            this.scoreDraw();
           
            
            this.freezeFrame -= 1;
        }
        else if (this.freezeFrame == 0) //incase someone accidently attacked during pause
        {
            this.leftPlayer.attacking = false;
            this.rightPlayer.attacking = false;
            this.newRound();
            this.freezeFrame -= 1;
            
            this.leftPlayer.runtime=1;
            this.rightPlayer.runtime=1;
        }
        else
        {
            this.runningDraw();
        }
    }

    scoreDraw()
    {
        //coords
        textAlign(CENTER, CENTER);
        textSize(this.largeText);
        fill(this.leftPlayer.color);
        text(this.leftScore, this.leftCoords[0], this.leftCoords[1]);

        textSize(this.largeText);
        fill(this.rightPlayer.color);
        text(this.rightScore, this.rightCoords[0], this.rightCoords[1]);
    }


    playersAndPlatformDraw()
    {
        background(color(this.backgroundColor));
        //players 
        this.playersUpdate();
        this.playerCollision();
        this.playersDraw();

        //platform
        fill(this.platform.color);
        rect(this.platform.x, this.platform.y, this.platform.width, this.platform.height);
    }

    winConditionChecks()
    {
        //check swords
        let leftSwordTouching = this.leftPlayer.x + this.leftPlayer.size + this.leftPlayer.weapon.curSize > this.rightPlayer.x && this.leftPlayer.weapon.active;
        let rightSwordTouching = this.rightPlayer.x - this.rightPlayer.weapon.curSize < this.leftPlayer.x + this.leftPlayer.size && this.rightPlayer.weapon.active;
        if (leftSwordTouching && rightSwordTouching)
        {
            this.leftPlayer.forceBack();
            this.rightPlayer.forceBack();
        }
        else if (leftSwordTouching)
        {
            this.pointScored("left");
        }
        else if (rightSwordTouching)
        {
            this.pointScored("right");
        }

        //check if play fell
        if (this.leftPlayer.y > height && this.rightPlayer.y > height)
        {
            this.pointScored("tie");
        }
        else if (this.leftPlayer.y > height)
        {
            this.pointScored("right");
        }
        else if (this.rightPlayer.y > height)
        {
            this.pointScored("left");
        }
    }

    runningDraw()
    {
        this.playersAndPlatformDraw();
        this.scoreDraw();
        this.winConditionChecks();
    }

    pointScored(winner)
    {
        if (winner == "left")
        {
            this.leftScore += 1;
            this.winColor = this.leftPlayer.color;
            this.winText = "BLUE WINS!";

        }
        else if (winner == "right")
        {
            this.rightScore += 1;
            this.winColor = this.rightPlayer.color;
            this.winText = "RED WINS!";
        }
        else if (winner == "tie")
        {
            this.winColor = this.platform.color;
            this.winText = "TIE";
        }
        this.freezeFrame = this.freezeTime;
    }

    newRound()
    {
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