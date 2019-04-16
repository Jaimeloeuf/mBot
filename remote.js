let xTilt = 0
let yTilt = 0
let y = 0
let x = 0
let start = 0
let stop = 0
input.onButtonPressed(Button.A, function () {
    stop = 0
    start = 1
})
input.onButtonPressed(Button.B, function () {
    start = 0
    stop = 1
})
radio.setGroup(10)
basic.showLeds(`
    # . . # .
    # . # . #
    # . # . #
    # . # . #
    # . . # .
    `)
xTilt = 0
yTilt = 10
basic.forever(function () {
    if (stop == 1) {
        radio.sendValue("stop", 0)
        xTilt = 0
        yTilt = 10
    } else if (start == 1) {
        yTilt = input.rotation(Rotation.Pitch) - 10
        xTilt = input.rotation(Rotation.Roll)
    }
    radio.sendValue("yaxis", yTilt)
    radio.sendValue("xaxis", xTilt)
    basic.pause(100)
})
