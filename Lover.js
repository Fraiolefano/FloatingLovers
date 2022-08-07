class Lover
{
    constructor(start_position,radius,angle,max_rotation,angle_speed,col)
    {
        this.start_position=start_position;
        this.position=start_position.copy();
        this.radius=radius;
        this.angle=angle;
        this.max_rotation=max_rotation;
        this.angle_speed=angle_speed;
        this.col=col;
        this.variationRed=0;
        this.variationGreen=0;
        this.variationBlue=0;
        this.redSpeed=0.6;
        this.sizeSpeed=0.025;
    }

    draw()
    {
        stroke(this.col);
        strokeWeight(this.radius);
        point(this.position.x,this.position.y);
    }

    update(noiseX,noiseY)           
    {
        this.position.x=this.start_position.x+(this.max_rotation*cos(this.angle+(noise(noiseX)*this.angle_speed*t)));
        this.position.y=this.start_position.y+(this.max_rotation*sin(noise(noiseY)+this.angle+(this.angle_speed*t)));
        
        this.controlColor();
        //this.controlSize();
    }

    controlColor()
    {       
        this.variationGreen=255-((this.position.x/width)*255);
        this.variationBlue=255-((this.position.y/height)*255);

        if(this.variationRed<0 || this.variationRed>255)
            this.redSpeed=-this.redSpeed;

        this.variationRed+=this.redSpeed;

        this.col=color(this.variationRed,this.variationGreen,this.variationBlue);
    }

    controlSize()
    {
        this.radius+=this.sizeSpeed;

        if(this.radius<1)
        {
            this.radius=1;
            this.sizeSpeed=-this.sizeSpeed;
        }
        else if(this.radius>3)
        {
            this.radius=3;
            this.sizeSpeed=-this.sizeSpeed;
        }
    }
}
