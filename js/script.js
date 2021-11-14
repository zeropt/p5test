/*
 * Authors: Riley Mann
 * Created: 4 NOV 2021
 * License: Public Domain
 */

let anchor_x, anchor_y, x, y;
kp = 0.05;

function setup() {
    createCanvas(windowWidth, windowHeight);
    anchor_x = width/2;
    anchor_y = height/2;
    x = width/2;
    y = height/2;
}

function draw() {
    background(128);
    x += kp * (mouseX - x);
    y += kp * (mouseY - y);
    drawBalloonTest(anchor_x, anchor_y, x, y);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    anchor_x = width/2;
    anchor_y = height/2;
}

function drawBalloonTest(x1, y1, x2, y2) {
    strokeWeight(4);
    stroke(255);
    line(x1, y1, x2, y2);
    noStroke();
    fill(255);
    ellipse(x2, y2, 60, 60);
}
