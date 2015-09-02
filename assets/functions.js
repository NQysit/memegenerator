window.maxwidth = 600;      //max canvas width
window.color = "#ffffff";   //text color
window.stroke = "#000000";  //text border color

/**
 * loadImage()
 * get the image selected and load it in canvas
 * after loading, reset range values and write texts 
 */
function loadImage()
{   
    if(!(document.getElementById("originalpic").files.length > 0))
        return;
        
    var file = document.getElementById("originalpic").files[0];

    var imageType = /image.*/;

    if (!file.type.match(imageType))
        return;
    
    var img = new Image;
    var imageURL = window.URL.createObjectURL(file);
    img.onload = function()
    {
        var canvas = document.getElementById("areaCanvas");
        var context = canvas.getContext("2d");
        
        var width = img.width;
        if(img.width > window.maxwidth)
            width = window.maxwidth;
    
        context.canvas.width = width;
        context.canvas.height = img.height * (width / img.width);
        
        clearCanvas();
        context.drawImage(img, 0, 0, width, img.height * (width / img.width));
        setRangeValues();
        addTexts();
    };
    
    img.src = imageURL;
};

/**
 * wrapText()
 * write in canvas any text in several lines if it is longer than canvas width
 */

function wrapText(context, text, x, y, maxWidth, lineHeight)
{    
    var words = text.split(' ');
    var line = '';
    
    for(var n = 0; n < words.length; n++)
    {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0)
        {
            context.fillText(line, x, y);
            context.strokeText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
    context.strokeText(line, x, y);
};   

/**
 * addUpperText()
 * load upper text
 */
function addUpperText()
{   
    var size = document.getElementById("sizeUpper").value;
    var pos = document.getElementById("positionUpper").value;
    var text = document.getElementById("text1").value;
    var canvas = document.getElementById("areaCanvas");
	var context = canvas.getContext("2d");
    
	context.textAlign="center"; 
    context.font = 'bolder ' + size + 'pt Impact';    
    text = text.toUpperCase();

  	context.fillStyle = window.color;
    context.strokeStyle = window.stroke;
    
    wrapText(context, text, canvas.width / 2, pos, canvas.width * 0.9, size * 1.2);        
};

/**
 * addBottomText()
 * load bottom text
 */
function addBottomText()
{   
    var size = document.getElementById("sizeBottom").value;
    var pos = document.getElementById("positionBottom").value;
    var text = document.getElementById("text2").value;
    var canvas = document.getElementById("areaCanvas");
    var context = canvas.getContext("2d");
    
    context.textAlign="center"; 
    context.font = 'bolder ' + size + 'pt Impact';    
    text = text.toUpperCase();
    
    context.fillStyle = window.color;
    context.strokeStyle = window.stroke;
    
    wrapText(context, text, canvas.width / 2, pos, canvas.width * 0.9, size * 1.2);      
};

/**
 * clearCanvas()
 * draw a white square with canvas size
 */
function clearCanvas()
{
    var canvas = document.getElementById("areaCanvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
};

/**
 * setRangeValues()
 * check range values after loading any image
 */
function setRangeValues()
{
    var canvas = document.getElementById("areaCanvas");
    
    document.getElementById("positionUpper").min = canvas.height * 0.1;
    document.getElementById("positionBottom").min = canvas.height * 0.1;
    document.getElementById("positionUpper").max = canvas.height;
    document.getElementById("positionBottom").max = canvas.height;
    
    if(document.getElementById("positionUpper").value > canvas.height)
        document.getElementById("positionUpper").value = document.getElementById("positionUpper").max / 2;
     if(document.getElementById("positionBottom").value > canvas.height)   
        document.getElementById("positionBottom").value = document.getElementById("positionBottom").max / 2;
};

function updateCanvas()
{
    loadImage();
};

function addTexts()
{
    addUpperText();
    addBottomText();
};

function exportPNG()
{
    var c=document.getElementById("areaCanvas");
    window.open(c.toDataURL('image/png'));	
};