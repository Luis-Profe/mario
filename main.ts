function check () {
    if (state != 0) {
        return
    }
    if (obs1 == 0) {
        if (obs1_status == 0) {
            if (motion == 0 || motion == 1) {
                fail = 1
            } else {
                pass = 1
            }
        } else {
            if (motion == 1) {
                pass = 1
            } else {
                fail = 1
            }
        }
    } else if (obs2 == 0) {
        if (obs2_status == 0) {
            if (motion == 0 || motion == 1) {
                fail = 1
            } else {
                pass = 1
            }
        } else {
            if (motion == 1) {
                pass = 1
            } else {
                fail = 1
            }
        }
    }
    if (fail == 1) {
        state = 1
        basic.clearScreen()
        basic.showString("GAME OVER")
        basic.showString("SCORE")
        basic.showNumber(score)
        state = -1
    }
}
input.onButtonPressed(Button.A, function () {
    if (state == 0) {
        if (motion == 0) {
            motion = 1
            motion_lock = 2
        }
    }
})
input.onButtonPressed(Button.AB, function () {
    if (state == -1) {
        state = 0
        basic.clearScreen()
    }
})
input.onButtonPressed(Button.B, function () {
    if (state == 0) {
        if (motion == 0) {
            motion = 2
            motion_lock = 1
        }
    }
})
function show_obs () {
    if (state != 0) {
        return
    }
    if (obs1 != -1) {
        if (obs1_status == 0) {
            led.unplot(obs1, 3)
            led.unplot(obs1, 4)
            obs1 += -1
            led.plot(obs1, 3)
            led.plot(obs1, 4)
        } else {
            led.unplot(obs1, 1)
            led.unplot(obs1, 2)
            led.unplot(obs1, 3)
            obs1 += -1
            led.plot(obs1, 1)
            led.plot(obs1, 2)
            led.plot(obs1, 3)
        }
    }
    if (obs2 != -1) {
        if (obs2_status == 0) {
            led.unplot(obs2, 3)
            led.unplot(obs2, 4)
            obs2 += -1
            led.plot(obs2, 3)
            led.plot(obs2, 4)
        } else {
            led.unplot(obs2, 1)
            led.unplot(obs2, 2)
            led.unplot(obs2, 3)
            obs2 += -1
            led.plot(obs2, 1)
            led.plot(obs2, 2)
            led.plot(obs2, 3)
        }
    }
}
function show_mario () {
    if (state != 0) {
        return
    }
    if (motion == 0) {
        led.plot(0, 3)
        led.plot(0, 4)
    } else if (motion == 1) {
        if (motion_lock >= 1) {
            if (motion_lock == 2) {
                led.unplot(0, 3)
            }
            led.plot(0, 4)
            basic.pause(200)
            motion_lock += -1
        } else {
            led.plot(0, 3)
            led.plot(0, 4)
            motion = 0
        }
    } else if (motion == 2) {
        if (motion_lock == 1) {
            led.unplot(0, 4)
            led.plot(0, 2)
            led.plot(0, 3)
            basic.pause(200)
            led.unplot(0, 3)
            led.plot(0, 1)
            basic.pause(200)
            led.unplot(0, 2)
            led.plot(0, 0)
            basic.pause(200)
            motion_lock = 0
        } else {
            led.plot(0, 0)
            led.plot(0, 1)
            basic.pause(200)
            motion = 3
        }
    } else if (motion == 3) {
        led.unplot(0, 0)
        led.plot(0, 1)
        led.plot(0, 2)
        basic.pause(200)
        led.unplot(0, 1)
        led.plot(0, 3)
        basic.pause(200)
        led.unplot(0, 2)
        led.plot(0, 4)
        motion = 0
    }
}
let motion_lock = 0
let score = 0
let obs2_status = 0
let pass = 0
let fail = 0
let motion = 0
let obs1_status = 0
let obs2 = 0
let obs1 = 0
let state = 0
state = -1
basic.forever(function () {
    if (state == -1) {
        basic.showLeds(`
            # # . # #
            # # # # #
            # . # . #
            # . . . #
            # . . . #
            `)
        motion = 0
        motion_lock = 0
        obs1 = -1
        obs1_status = -1
        obs2 = -1
        obs2_status = -1
        score = 0
        fail = 0
    } else if (state == 0) {
        if (obs1 == -1) {
            if (obs2 == -1 || obs2 <= 1) {
                obs1_status = randint(0, 1)
                obs1 = 5
            }
        }
        if (obs2 == -1) {
            if (obs1 == -1 || obs1 <= 1) {
                obs2_status = randint(0, 1)
                obs2 = 5
            }
        }
        pass = 0
        show_mario()
        check()
        show_obs()
        check()
        if (pass == 1) {
            score += 5
        }
    } else {
    	
    }
    basic.pause(500)
})
