var imagee = "";
var status = "";
var objects = [];

function preload() {
    imagee = loadImage('dogBaby.jpeg');
    dropDown = document.getElementById("DropW")
    dropDown.addEventListener("change", ()=> {
        imagee.setAttribute("src", dropDown.selectedOptions[0].value);
    })
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    model = ml5.objectDetector('cocossd', loaded);
    document.getElementById("Stats").innerHTML = "Status: Detecting...";
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        model.detect(video, res);
        for (i= 0; i < objects.length; i++) {
            document.getElementById("Stats").innerHTML = "Status: objetc detected!";
            document.getElementById("ObjAmo").innerHTML = "Amount Of Objects: " + objects.length;
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + ": " + percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}

function loaded() {
    console.log("Cocossd loaded succesfully!");
    status = true;
}

function res(error, results) {
    if (error) {
        console.warn(error);
    }
    else {
        console.log(results);
        objects = results
    }
}