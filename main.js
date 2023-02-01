var isVideoP = true
var status = "";
var objects = [];
video = ""

function preload() {
    video = createVideo("NewR.mp4");
}

function setup() {
    canvas = createCanvas(640, 266);
    canvas.center();
    video2 = createCapture(VIDEO)
    video2.hide();
    video.hide();
}

function draw() {
    ddVal = document.getElementById("LiveOrNot").value;
    if (ddVal == "live") {
        image(video2, 0, 0, 640, 266);
        if (status != "") {
            model.detect(video2, res);
            for (i= 0; i < objects.length; i++) {
                document.getElementById("Stats").innerHTML = "Status: objetc detected!";
                document.getElementById("ObjAmo").innerHTML = "Amount Of Objects: " + objects.length;
                fill("#ff0000");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + ": " + percent + "%", objects[i].x + 15, objects[i].y + 15)
                noFill();
                stroke("#ff0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
    }else {
        image(video, 0, 0, 640, 266);
        if (status != "") {
            model.detect(video, res);
            for (i= 0; i < objects.length; i++) {
                document.getElementById("Stats").innerHTML = "Status: objetc detected!";
                document.getElementById("ObjAmo").innerHTML = "Amount Of Objects: " + objects.length;
                fill("#ff0000");
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + ": " + percent + "%", objects[i].x + 15, objects[i].y + 15)
                noFill();
                stroke("#ff0000");
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
        }
    }
}

function loaded() {
    console.log("Cocossd loaded succesfully!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
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

function Start() {
    model = ml5.objectDetector('cocossd', loaded);
    document.getElementById("Stats").innerHTML = "Status: Detecting...";
}

window.addEventListener("keydown", OKD)

function OKD(e) {
    if (e.keyCode == "32") {
        if (isVideoP == true) {
            video.pause();
        } else {
            video.loop();
        }
        isVideoP = !isVideoP;
    }
}