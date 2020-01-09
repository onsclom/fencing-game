class Character
{
    constructor(x, y, size, color)
    {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
    }

    draw()
    {
        fill(this.color);
        square(this.x, this.y, this.size);
    }
}