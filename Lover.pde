class Lover
{
    PVector position,start_position;
    float radius,angle,max_rotation,angle_speed;
    color col;
    float variationRed,variationGreen,variationBlue;
    float redSpeed,sizeSpeed;
    
    Lover(PVector start_position,float radius,float angle,float max_rotation,float angle_speed,color col)
    {
        this.start_position=start_position;
        this.position=start_position.copy();
        this.radius=radius;
        this.angle=angle;
        this.max_rotation=max_rotation;
        this.angle_speed=angle_speed;
        this.col=col;
        this.variationRed=0;
        this.redSpeed=0.6;
        this.sizeSpeed=0.025;
    }

    void draw()
    {
        stroke(col);
        strokeWeight(radius);
        point(position.x,position.y);
    }

    void update(float noiseX,float noiseY)           
    {
        this.position.x=start_position.x+(max_rotation*cos(angle+(noise(noiseX)*angle_speed*t)));
        this.position.y=start_position.y+(max_rotation*sin(noise(noiseY)+angle+(angle_speed*t)));
        controlColor();
        //controlSize();
    }

    void controlColor()
    {       
        variationGreen=255-((this.position.x/width)*255);
        variationBlue=255-((this.position.y/height)*255);

        if(variationRed<0 || variationRed>255)
            redSpeed=-redSpeed;

        variationRed+=redSpeed;

        this.col=color(variationRed,variationGreen,variationBlue);
    }

    void controlSize()
    {
        this.radius+=sizeSpeed;

        if(this.radius<1)
        {
            this.radius=1;
            this.sizeSpeed=-sizeSpeed;
        }
        else if(this.radius>3)
        {
            this.radius=3;
            this.sizeSpeed=-sizeSpeed;
        }
    }
}
