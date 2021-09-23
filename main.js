song = "";
scoreleftwrist = 0;
scoreleftwrist = 0;
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;

function preload() {
    song = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded");
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreleftwrist > 0.2){
        circle(leftwristX, leftwristY, 20);
        num_leftwristy = Number(leftwristY);
        removedecimals = floor(num_leftwristy);
        volume = removedecimals/500;
        document.getElementById("DUH2").innerHTML = "Volume = " + volume;
        song.setVolume(volume);
    }
    if(scorerightwrist > 0.2){
        circle(rightwristX, rightwristY, 20);

        if(rightwristY > 0 && rightwristY <= 100){
            document.getElementById("div_speed").innerHTML = "Speed = 0.5x";
            song.rate(0.5);
        }
        else if(rightwristY > 100 && rightwristY <= 200){
            document.getElementById("div_speed").innerHTML = "Speed = 1x";
            song.rate(1);
        }
        else if(rightwristY > 200 && rightwristY <= 300){
            document.getElementById("div_speed").innerHTML = "Speed = 1.5x";
            song.rate(1.5);
        }
        else if(rightwristY > 300 && rightwristY <= 400){
            document.getElementById("div_speed").innerHTML = "Speed = 2x";
            song.rate(2);
        }
        else if(rightwristY > 400){
            document.getElementById("div_speed").innerHTML = "Speed = 2.5x";
            song.rate(2.5);
        }
    }
}

function PLAY() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;
        scoreleftwrist = results[0].pose.keypoints[9].score;
        console.log("leftwristx = " + leftwristX + " y =" + leftwristY + "score = " + scoreleftwrist);

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("rightwristx = " + rightwristX + " y =" + rightwristY + "score = " + scorerightwrist);
    }
}