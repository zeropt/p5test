/*
 * Authors: Riley Mann
 * Created: 4 NOV 2021
 * License: Public Domain
 */

 var canvas;
 var button;
 var success;

/* runs on script startup */
function setup() {
    // The Canvas!!!
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0); //move canvas to origin

    // Initialize button element
    button = {
        element: select("#my-button"),
        p: createVector(width/2, height/2),
        v: createVector(0, 0)
    };
    button.element.mouseClicked(onClick);

    success = false;
}

/* runs on window resize */
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

/* runs on button click */
function onClick() {
    success = true;
}

/* runs in a loop */
function draw() {
    if (success) {
        background(255);
        button.element.remove();
    } else {
        background(0);

        //calculate acceleration
        var a = createVector(
            button.p.x - mouseX, button.p.y - mouseY);
        var r = a.mag();
        if (r < sqrt(
            (button.element.size().width**2)/4 + 
            (button.element.size().height**2)/4)
            ) {
            tpButton();
            return;
        }
        a.setMag(100/r);

        //update the button position
        button.v.add(a);
        updateButton();
    }
}

function updateButton() {
    buttonW = button.element.size().width;
    buttonH = button.element.size().height;

    //constrain the button to the window
    if (button.p.x <= buttonW/2) {
        button.p.x = buttonW/2;
        if (button.v.x < 0) {
            button.v.x = 0;
        }
    } else if (button.p.x >= width - buttonW/2) {
        button.p.x = width - buttonW/2;
        if (button.v.x > 0) {
            button.v.x = 0;
        }
    }
    if (button.p.y <= buttonH/2) {
        button.p.y = buttonH/2;
        if (button.v.y < 0) {
            button.v.y = 0;
        }
    } else if (button.p.y >= height - buttonH/2) {
        button.p.y = height - buttonH/2;
        if (button.v.y > 0) {
            button.v.y = 0;
        }
    }

    //update
    button.p.add(button.v);
    buttonX = button.p.x - button.element.size().width/2;
    buttonY = button.p.y - button.element.size().height/2;
    button.element.position(buttonX, buttonY);
}

function tpButton() {
    buttonW = button.element.size().width;
    buttonH = button.element.size().height;
    
    //teleport to a new position
    newX = random(buttonW/2, width - buttonW/2);
    newY = random(buttonH/2, height - buttonH/2);
    button.p.set(newX, newY);

    //set the velocity to zero
    button.v.set(0, 0);
}
