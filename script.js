const msgEl = document.getElementById("msg")

const randomNum = getRandomNumber()
console.log("Number : ", randomNum)



let recognition = new window.webkitSpeechRecognition();

// Start Recognising
recognition.start()


// Generate a Random Number
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1
}

function onSpeak(event) {
    // results[0][0].transcript
    const message = event.results[0][0].transcript

    writeMessage(message)
    checkNumber(message)
}

function writeMessage(msg) {
    console.log(msg);
    msgEl.innerHTML = `
    <div>You said :</div>
    <span class="box">${msg}</span>
    `
}
function checkNumber(msg) {
    let num = +msg
    if (Number.isNaN(num)) {
        msgEl.innerHTML += "<div>That is not a valid number 🤷‍♂️</div>"
        return
    }
    if (num > 100 || num < 1) {
        msgEl.innerHTML += "<div>Number must be strictly between 1 - 100 inclusive</div>"
        return
    }
    if (num === randomNum) {
        document.body.innerHTML = `
        <h2>Congo You have guessed the number 🥂🥳🎉</h2>
        <br>
        <h2>It was ${num}</h2>
        <button class="play-again" id='play-again'>Play Again</button>
        `
    } else if (num > randomNum) {
        msgEl.innerHTML += "<div>Go Lower</div>"
    } else {
        msgEl.innerHTML += "<div>Higher HIgher GOoo</div>"
    }

}
recognition.addEventListener("result", onSpeak)
// End Sr service
recognition.addEventListener("end", () => recognition.start())

document.body.addEventListener("click", (e) => {
    if (e.target.id === "play-again") {
        window.location.reload()
    }
})