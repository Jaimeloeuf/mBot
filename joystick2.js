let upDown = 0
let leftRight = 0
let button = 0
let joyY = 0
let start = 0
let joyX = 0
let buttonVal = 0
let direction = 0

function readButtons2() {
    buttonVal = pins.analogReadPin(AnalogPin.P2)
    if (buttonVal < 256)
        button = 1;
    else if (buttonVal < 597)
        button = 2;
    else if (buttonVal < 725)
        button = 3;
    else if (buttonVal < 793)
        button = 4;
    else if (buttonVal < 836)
        button = 6;
    else if (buttonVal < 938)
        button = 5;
    else
        button = 0;
}

// Read joystick value and return a number corresponding with the category
function readJoystick() {
    joyX = pins.analogReadPin(AnalogPin.P0)
    joyY = pins.analogReadPin(AnalogPin.P1)

    if (joyX < 400)
        leftRight = -1;
    else if (joyX > 600)
        leftRight = 1;
    else
        leftRight = 0;

    if (joyY < 400)
        upDown = -1;
    else if (joyY > 600)
        upDown = 1;
    else
        upDown = 0;

    // Return the values as a list
    return [leftRight, upDown];
}

// Given a joystick's value, return a direction
// function convertToDirection1(directions) {
    if (leftRight == 0 && upDown == 1)
        direction = 0
    else if (leftRight == 1 && upDown == 1)
        direction = 1
    else if (leftRight == 1 && upDown == 0)
        direction = 2
    else if (leftRight == 1 && upDown == -1)
        direction = 3
    else if (leftRight == 0 && upDown == -1)
        direction = 4
    else if (leftRight == -1 && upDown == -1)
        direction = 5
    else if (leftRight == -1 && upDown == 0)
        direction = 6
    else if (leftRight == -1 && upDown == 1)
        direction = 7
    else
        direction = -1

    return direction;
}

// Given a joystick's value, return a direction
function convertToDirection2(directions) {
    if (directions[0] == 0) {
        if (directions[1] == 1)
            direction = 0;
        else if (directions[1] == -1)
            direction = 4;
    }

    else if (directions[0] == 1) {
        if (directions[1] == 1)
            direction = 1;
        else if (directions[1] == 0)
            direction = 2;
        else if (directions[1] == -1)
            direction = 3;
    }

    else if (directions[0] == -1) {
        if (directions[1] == -1)
            direction = 5;
        else if (directions[1] == 0)
            direction = 6;
        else if (directions[1] == 1)
            direction = 7;
    }
    // Fail safe check to stop motor if numbers are wrong
    else
        direction = -1

    return direction;
}

// Given a joystick's value, return a direction
function convertToDirection3(directions) {
    let d1 = directions[1];

    switch (directions[0]) {
        case 0:
            if (d1 == 1)
                direction = 0;
            else if (d1 == -1)
                direction = 4;
            break;

        case 1:
            if (d1 == 1)
                direction = 1;
            else if (d1 == 0)
                direction = 2;
            else if (d1 == -1)
                direction = 3;
            break;

        case -1:
            if (d1 == -1)
                direction = 5;
            else if (d1 == 0)
                direction = 6;
            else if (d1 == 1)
                direction = 7;
            break;
    }
    return direction;
}


const showLeds = () => basic.showLeds(`
    # . . # .
    # . # . #
    # . # . #
    # . # . #
    # . . # .
    `);

input.onButtonPressed(Button.A, () => {
    start = 1;
    radio.sendString("startMoving")
    basic.clearScreen()
})

input.onButtonPressed(Button.B, () => {
    start = 0;
    radio.sendString("stopMoving")
    showLeds()
})

direction = -2

// Clear set bit to start at a non-command waiting stage
start = 0

radio.setGroup(10);

// Display the radio group number on the LEDs at the start
showLeds();

basic.forever(() => {
    // Infinite loop as long as start is set
    while (start) {
        radio.sendValue("DIRECT", convertToDirection(readJoystick()))
        basic.showArrow(direction);
    }
});