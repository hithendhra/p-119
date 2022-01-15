function preload()
{
    classifier=ml5.imageClassifier('DoodleNet');
}

function setup()
{
    canvas=createCanvas(280,280);
    canvas.center();
    background("reds");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}

function draw()
{
   stroke("blue");
   strokeWeight(10);
   if (mouseIsPressed)
   {
       line(pmouseX,pmouseY,mouseX,mouseY);
   }
}

function classifyCanvas()
{
    classifier.classify(canvas,gotresult);
}

function ClearCanvas()
{
    background("white");
}

function gotresult(error,results)
{
   if(error)
   {
       console.error(error);
   }
   console.log(results);
   document.getElementById("label").innerHTML='Label : '+results[0].label;
   document.getElementById("Confidence").innerHTML='Confidence : '+ Math.round(results[0].confidence * 100)+'%';
   utterthis=new SpeechSynthesisUtterance(results[0].label);
   synth.speak(utterthis);
}