float line_thickness=1;
class LoverGrid
{
    float cell_size,max_line;
    int n_row,n_col;
    Lover lovers[][];

    LoverGrid(float cell_size)
    {
        this.cell_size=cell_size;
        this.max_line=cell_size*1.25;
        this.n_row=floor(WINDOW_SIDE_X/this.cell_size);
        this.n_col=floor(WINDOW_SIDE_Y/this.cell_size);
        this.lovers=new Lover[n_row][n_col];
    }

    void initLovers()
    {
        for(int row=0;row<n_row;row++)
        {
            for(int column=0;column<n_col;column++)
            {
                float angle=random(0,2*PI);
                float angle_speeds[]={-random(PI/4,PI/2),random(PI/4,PI/2)};
                float angle_speed=angle_speeds[int(random(0,2))];
                color lov_col=color(0,0,255);
                PVector position=new PVector(this.cell_size*row+(this.cell_size/2),this.cell_size*column+(this.cell_size/2));
                
                lovers[row][column]=new Lover(position,3,angle,(this.cell_size/2),angle_speed,lov_col);
            } 
        }
    }
    
    void updateLovers()
    {
        for(int row=0;row<n_row;row++)
        {
            for(int column=0;column<n_col;column++)
            {
                lovers[row][column].update((row*n_row)+column,row);
            } 
        }  
    }

    void drawLovers()
    {
        for(int row=0;row<n_row;row++)
        {
            for(int column=0;column<n_col;column++)
            {
                lovers[row][column].draw();
            } 
        }  
    }

    void drawLines()
    {
        stroke(0,0,255);
        strokeWeight(line_thickness);
        float distance;
        for(int row=1;row<n_row-1;row++)
        {
            for(int column=1;column<n_col-1;column++)
            {
                Lover neighbour[]=new Lover[8];
                neighbour[0]=lovers[row-1][column-1];
                neighbour[1]=lovers[row-1][column];
                neighbour[2]=lovers[row-1][column+1];

                neighbour[3]=lovers[row][column-1];
                neighbour[4]=lovers[row][column+1];

                neighbour[5]=lovers[row+1][column-1];
                neighbour[6]=lovers[row+1][column];
                neighbour[7]=lovers[row+1][column+1];

                for(int n=0;n<neighbour.length;n++)
                {
                    distance=neighbour[n].position.dist(lovers[row][column].position);
                    if(distance<max_line)
                    {
                        float opacity=(1-(distance/max_line))*255;
                        stroke(neighbour[n].col,opacity);
                        line(neighbour[n].position.x,neighbour[n].position.y,lovers[row][column].position.x,lovers[row][column].position.y);
                    }
                }
            }
        }
    }

    void draw()
    {
        stroke(255,0,0);
        for(int row=0;row<n_row;row++)
        {
            line(0,cell_size*row,width,cell_size*row);
        }
        for(int column=0;column<n_col;column++)
        {
            line(cell_size*column,0,cell_size*column,height);
        }
    }
}
