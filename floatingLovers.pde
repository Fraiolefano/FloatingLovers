//By Fraiolefano

final int WINDOW_SIDE_X=600;
final int WINDOW_SIDE_Y=600;

int n_divisions=10;
float cell_size=WINDOW_SIDE_X/n_divisions;

LoverGrid grid;
float t; 
void settings()
{
    size(WINDOW_SIDE_X,WINDOW_SIDE_Y);
}

void setup()
{
    initGrid();
}

void initGrid()
{
    cell_size=WINDOW_SIDE_X/n_divisions;
    grid=new LoverGrid(cell_size);
    grid.initLovers();
}

void draw()
{
    t+=0.025;
    background(0);
    grid.updateLovers();
    grid.drawLines();
    grid.drawLovers();
    //grid.draw();
}

void keyPressed()
{
  if (key=='d')
  {
    if(n_divisions<30)
    {
      n_divisions++;
      initGrid();
      println("Numero suddivisioni : "+n_divisions);
    }
  }
  else if (key=='a')
  {
     if (n_divisions>1)
     {
       n_divisions--;
       initGrid();
       println("Numero suddivisioni : "+n_divisions);
     }
  }
}

void mouseWheel(MouseEvent e)
{
    if(e.getCount()>0)
    {
        if(line_thickness>0.1)
          line_thickness-=0.1;
    }
    else
    {
        if(line_thickness<10)
          line_thickness+=0.1;
    }
    println("Spessore linea : "+line_thickness);
}
