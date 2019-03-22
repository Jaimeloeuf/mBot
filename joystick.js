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

function readJoystick2() {
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
}
function convertToDirection2() {
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
}


input.onButtonPressed(Button.A, function () {
    start = 1
    radio.sendString("startMoving")
    basic.clearScreen()
})

input.onButtonPressed(Button.B, function () {
    start = 0
    radio.sendString("stopMoving")
    basic.showLeds(`
        # . . # .
        # . # . #
        # . # . #
        # . # . #
        # . . # .
        `)
})

direction = -2

start = 0

radio.setGroup(10)

basic.showLeds(`
    # . . # .
    # . # . #
    # . # . #
    # . # . #
    # . . # .
    `)


basic.forever(function () {
    if (start == 1) {
        readJoystick2()
        convertToDirection2()
        radio.sendValue("DIRECT", direction)
        basic.showArrow(direction)
    }
})
