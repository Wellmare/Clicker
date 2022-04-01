const button = document.querySelector('#btn')
const count = document.querySelector('#clicked')
const superClick = document.querySelector('#super-click')
const timeRemained = document.querySelector('#time')
const $cooldownSuperClick = document.querySelector('#cooldown-super-click')
const timeSuperClick = document.querySelector('.time-super-click')
const divCooldown = document.querySelector('#cooldown')

button.addEventListener('click', clickBtn)
superClick.addEventListener('click', enableSuperClick)



let onSuperClick = false
let countClick = getCount()




count.textContent = getCount()
timeRemained.textContent = getTimeRemaining()
if (getTimeRemaining() === 0) {
    timeSuperClick.classList.add('hide')
} else if (getTimeRemaining() > 0) {
    enableSuperClick()
}
$cooldownSuperClick.textContent = getCooldownSuperClick()
if (getCooldownSuperClick() > 0) {
    superClick.setAttribute('disabled', 'true')
    cooldownSuperClick(getCooldownSuperClick())
} else if (getCooldownSuperClick() === 0) {
    divCooldown.classList.add('hide')
}



function clickBtn() {
    click = onSuperClick ? 5 : 1
    count.textContent = getCount() + click
    localStorage.setItem('count', count.textContent)
}



function enableSuperClick() {
    onSuperClick = true
    timeSuperClick.classList.remove('hide')
    time = getTimeRemaining() ? getTimeRemaining() : 10
    const interval = setInterval(function () {
        superClick.setAttribute('disabled', 'true')
        timeRemained.textContent = time.toFixed(1)
        if (time <= 0) {
            clearInterval(interval)
            onSuperClick = false
            timeRemained.textContent = 0
            timeSuperClick.classList.add('hide')


            cooldownSuperClick(20)
        }
        else {
            localStorage.setItem('time', time.toFixed(1))
            time -= 0.1
        }
    }, 100)

}


function cooldownSuperClick(interval) {
    const cooldownSuper = setInterval(function () {
        divCooldown.classList.remove('hide')
        if (interval <= 0) {
            clearInterval(cooldownSuper)
            superClick.removeAttribute('disabled', 'true')
            divCooldown.classList.add('hide')
        } else {
            interval -= 1
            $cooldownSuperClick.textContent = interval
            localStorage.setItem('cooldownSuperClick', interval)
        }

    }, 1000)
}



function getTimeRemaining() {
    time = parseFloat(localStorage.getItem('time'))
    if (time.toString() === 'NaN') {
        time = 0
    }
    // if (time > 0) {
    //     enableSuperClick()
    // }
    return time
}



function getCount() {
    let countClicked = parseInt(localStorage.getItem('count'))
    if (countClicked.toString() === 'NaN') {
        countClicked = 0
    }
    return countClicked
}

function getCooldownSuperClick() {
    let cooldown = parseInt(localStorage.getItem('cooldownSuperClick'))
    if (cooldown.toString() === 'NaN') {
        return 0
    }
    return cooldown
    
}