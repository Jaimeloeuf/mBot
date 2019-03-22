//Preset values for movement
const LvalueSmall: number = 35
const LvalueBig: number = 70
const RvalueSmall: number = 35
const RvalueBig: number = 70
const rotateSpeed: number = 30

const channel: number = 10
const enum directions {
    Invalid = -2,
    None = -1,
    North = 0,
    NorthEast = 1,
    Clockwise = 2,
    SouthEast = 3,
    South = 4,
    SouthWest = 5,
    AntiClockwise = 6,
    NorthWest = 7
}

let moveFlag: boolean = false
let dir: directions = directions.Invalid

// Assumes that the desired direction is applied to both wheels
function setWheelsSpeed(leftWheel: number, rightWheel: number, motorDir: kitronik.MotorDirection = kitronik.MotorDirection.Forward) {
    kitronik.motorOn(kitronik.Motors.Motor1, motorDir, leftWheel)

    //hack : somehow, the direction has to be reversed, as according to the previous code. Pls check with ZD on this.
    if (motorDir == kitronik.MotorDirection.Forward)
        motorDir = kitronik.MotorDirection.Reverse;
    else
        motorDir = kitronik.MotorDirection.Forward;

    kitronik.motorOn(kitronik.Motors.Motor2, motorDir, rightWheel)
}

radio.onReceivedValue(function (name, value) {
    if (name == "DIRECT" && moveFlag) {
        dir = value
    }
    if (name == "startMoving" && !moveFlag) {
        moveFlag = true
        basic.showLeds(`
        # . . # .
        # . # . #
        # . # . #
        # . # . #
        # . . # .
        `)
    }
    if (name == "stopMoving" && moveFlag) {
        moveFlag = false
        dir = directions.Invalid
        basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
    }
})

radio.setGroup(channel)
basic.showLeds(`
    # . . . #
    . # . # .
    . . # . .
    . # . # .
    # . . . #
    `)

basic.forever(() => {
    if (!moveFlag || dir == directions.Invalid) {
        kitronik.motorOff(kitronik.Motors.Motor1)
        kitronik.motorOff(kitronik.Motors.Motor2)
        return
    }

    switch (dir) {
        case directions.None:
            kitronik.motorOff(kitronik.Motors.Motor1)
            kitronik.motorOff(kitronik.Motors.Motor2)
            break

        case directions.North:
            setWheelsSpeed(LvalueBig, RvalueBig)
            break
        case directions.South:
            setWheelsSpeed(LvalueBig, RvalueBig, kitronik.MotorDirection.Reverse)
            break

        case directions.NorthEast:
            setWheelsSpeed(LvalueBig, RvalueSmall)
            break
        case directions.NorthWest:
            setWheelsSpeed(LvalueSmall, RvalueBig)
            break
        case directions.SouthEast:
            setWheelsSpeed(LvalueBig, RvalueSmall, kitronik.MotorDirection.Reverse)
            break
        case directions.SouthWest:
            setWheelsSpeed(LvalueSmall, RvalueBig, kitronik.MotorDirection.Reverse)
            break

        case directions.AntiClockwise:
            kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Forward, rotateSpeed)
            //kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, rotateSpeed)
            kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, rotateSpeed) //hack : refer line 29
            break
        case directions.Clockwise:
            kitronik.motorOn(kitronik.Motors.Motor1, kitronik.MotorDirection.Reverse, rotateSpeed)
            //kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Forward, rotateSpeed)
            kitronik.motorOn(kitronik.Motors.Motor2, kitronik.MotorDirection.Reverse, rotateSpeed) //hack : refer line 29
            break

        default:
            basic.showString("default")
    }

    //basic.showNumber(dir)
})
