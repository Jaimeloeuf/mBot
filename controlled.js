let lftmx = 0
let rhtmx = 0
let direction = ""
let Rvalue = 0
let Lvalue = 0
radio.onReceivedValue(function (name, value) {
    if ("stop" == name) {
        Lvalue = 0
        Rvalue = 0
        kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Forward, Lvalue)
        kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, Rvalue)
    } else if (!("stop" == name)) {
        if ("yaxis" == name) {
            if (value < 5) {
                direction = "F"
            } else {
                if (value > 15) {
                    direction = "R"
                } else {
                    direction = "N"
                }
            }
        } else if ("xaxis" == name) {
            if (value > 30) {
                rhtmx = 0
            } else if (value > 10) {
                rhtmx = 1
            } else if (value < -30) {
                lftmx = 0
            } else if (value < -10) {
                lftmx = 1
            } else {
                rhtmx = 2
                lftmx = 2
            }
        }
        Lvalue = 25 * lftmx
        Rvalue = 25 * rhtmx
        if ("F" == direction) {
            kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Forward, Lvalue)
            kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, Rvalue)
        } else {
            if ("R" == direction) {
                kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, Lvalue)
                kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, Rvalue)
            } else {
                if ("N" == direction) {
                    kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Forward, 0)
                    kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, 0)
                }
            }
        }
    }
})
radio.setGroup(10)
basic.showLeds(`
    # . . # .
    # . # . #
    # . # . #
    # . # . #
    # . . # .
    `)
Lvalue = 0
Rvalue = 0
lftmx = 2
rhtmx = 2
