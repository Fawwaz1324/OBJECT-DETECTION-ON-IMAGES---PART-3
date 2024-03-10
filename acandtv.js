img = "";
status = "";
objects = [];

function preload()
{
    img = loadImage('acandtv.jpg');
}

function setup()
{
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML  = "Status :Detecting Objects";
}

function draw()
{
    image(img, 0, 0, 640, 420);
    
    if(status !="")
    {
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill("#03421c");
            percent = floor(objects[i].confidence * 100);
            stroke("#03421c");
            textSize(15);
            text(objects[i].label + " " + percent + "%", objects[i].x+60, objects[i].y+60);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x+60, objects[i].y+60, objects[i].width+60, objects[i].height+60);
        }
    }
}

function modelLoaded()
{
    console.log("Model Loaded!")
    status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}