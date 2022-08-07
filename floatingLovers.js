//By Fraiolefano

const WINDOW_SIDE_X=Math.min(window.innerWidth,window.innerHeight);
const WINDOW_SIDE_Y=WINDOW_SIDE_X;

var grid;
var t=0;

var slider; var sliderT; var sliderCells;var n_cellsText;
function setup()
{
    pixelDensity(1);
    createCanvas(WINDOW_SIDE_X,WINDOW_SIDE_Y);
    initGrid(WINDOW_SIDE_X/10);
    generateGui();
}

function draw()
{
    t+=0.025;
    background(0);
    grid.updateLovers();
    grid.drawLines();
    grid.drawLovers();
    //grid.draw();

    updateLabel();
}

function initGrid(cell_size)
{
    grid=new LoverGrid(cell_size);
    grid.initLovers();
}

function generateGui()
{
    slider=createSlider(0.1,10,1,0.1);
    slider.addClass("sliderClass");
    sliderT=document.createElement("h3");
    sliderT.innerText="Spessore linea : "+nf(slider.value(),0,1);
    ms.append(sliderT);
    slider.parent(ms);

    sliderCells=createSlider(0,30,10,1);
    sliderCells.addClass("sliderClass");

    n_cellsText=document.createElement("h3");
    n_cellsText.innerText="Numero suddivisioni : "+sliderCells.value();
    ms.append(n_cellsText);
    sliderCells.parent(ms);
}

function updateLabel()
{
    let cValue=sliderCells.value();
    sliderT.innerText="spessore linea : "+nf(slider.value(),0,1);
    n_cellsText.innerText="Numero suddivisioni : "+cValue;
    if(cValue!=grid.n_row)
    {
        initGrid(WINDOW_SIDE_X/cValue);
    }
}
