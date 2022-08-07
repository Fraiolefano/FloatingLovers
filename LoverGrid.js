class LoverGrid
{   
    constructor(cell_size)
    {
        this.cell_size=cell_size;
        this.max_line=cell_size*1.25;
        this.n_row=floor(WINDOW_SIDE_X/this.cell_size);
        this.n_col=floor(WINDOW_SIDE_Y/this.cell_size);
        this.line_thickness=1;
        this.lovers=new Array(this.n_row);
        for (let c=0;c<this.n_row;c++)
        {
            this.lovers[c]=new Array(this.n_col);
        }
    }
    initLovers()
    {
        for(let row=0;row<this.n_row;row++)
        {
            for(let column=0;column<this.n_col;column++)
            {
                let angle=random(0,2*PI);
                let angle_speeds=[-random(PI/4,PI/2),random(PI/4,PI/2)];
                let angle_speed=angle_speeds[int(random(0,2))];
                let lov_col=color(0,0,255);
                let position=new p5.Vector(this.cell_size*row+(this.cell_size/2),this.cell_size*column+(this.cell_size/2));
                
                this.lovers[row][column]=new Lover(position,3,angle,(this.cell_size/2),angle_speed,lov_col);
            } 
        }
    }
    
    updateLovers()
    {
        for(let row=0;row<this.n_row;row++)
        {
            for(let column=0;column<this.n_col;column++)
            {
                this.lovers[row][column].update((row*this.n_row)+column,row);
            } 
        }  
    }

    drawLovers()
    {
        for(let row=0;row<this.n_row;row++)
        {
            for(let column=0;column<this.n_col;column++)
            {
                this.lovers[row][column].draw();
            } 
        }  
    }

    drawLines()
    {
        this.line_thickness=slider.value();
        stroke(0,0,255);
        strokeWeight(this.line_thickness);
        let distance=0;
        for(let row=1;row<this.n_row-1;row++)
        {
            for(let column=1;column<this.n_col-1;column++)
            {
                let neighbour=[];
                neighbour[0]=this.lovers[row-1][column-1];
                neighbour[1]=this.lovers[row-1][column];
                neighbour[2]=this.lovers[row-1][column+1];

                neighbour[3]=this.lovers[row][column-1];
                neighbour[4]=this.lovers[row][column+1];

                neighbour[5]=this.lovers[row+1][column-1];
                neighbour[6]=this.lovers[row+1][column];
                neighbour[7]=this.lovers[row+1][column+1];

                for(let n=0;n<neighbour.length;n++)
                {
                    let distance=neighbour[n].position.dist(this.lovers[row][column].position);
                    if(distance<this.max_line)
                    {
                        let opacity=(1-(distance/this.max_line))*255;
                        stroke(neighbour[n].col._getRed(),neighbour[n].col._getGreen(),neighbour[n].col._getBlue(),opacity);
                        line(neighbour[n].position.x,neighbour[n].position.y,this.lovers[row][column].position.x,this.lovers[row][column].position.y);
                    }
                }
            }
        }
    }

    draw()
    {
        stroke(255,0,0);
        for(let row=0;row<this.n_row;row++)
        {
            line(0,this.cell_size*row,width,this.cell_size*row);
        }
        for(let column=0;column<this.n_col;column++)
        {
            line(this.cell_size*column,0,this.cell_size*column,height);
        }
    }
}
