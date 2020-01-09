class Game
{
    constructor()
    {
        this.platform = {
            x: (1 / 8) * width,
            y: (2 / 3) * height,
            width: (6 / 8) * width,
            height: (1 / 20) * height,
            color: color('#8f8')
        };

        let charSize = 30;
        let leftColor = color('#88f');
        let rightColor = color('#f88');
        this.leftPlayer = new Character((2 / 8) * width, this.platform.y - charSize, charSize, leftColor);
        this.rightPlayer = new Character(width * (6 / 8) - charSize, this.platform.y - charSize, charSize, rightColor);

        this.leftScore = 0;
        this.rightScore = 0;
        this.leftCoords = [30, 45];
        this.rightCoords = [width-30,45];
        this.textSize=40;
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
    }

    playersUpdate()
    {
        this.leftPlayer.update();
        this.rightPlayer.update();
    }

    playersDraw()
    {
        this.leftPlayer.draw();
        this.rightPlayer.draw();
    }

    playerCollision()
    {
        let overlap = this.leftPlayer.x+this.leftPlayer.size - this.rightPlayer.x;
        if ( overlap > 0 ) //overlap is positive if they are overlapping
        {
            console.log("test");
            this.leftPlayer.x -= overlap/2;
            this.rightPlayer.x += overlap/2;
        }
    }
}