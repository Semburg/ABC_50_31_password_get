const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol,
    upper: getRandomUpper,
}

clipboardEl.addEventListener('click', () => {
    const textArea = document.createElement('textarea')
    const password = resultEl.innerText

    if (!password) { return }

    textArea.value = password
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
    alert('Password copied to clipboard')
})


generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasLower = lowercaseEl.checked
    const hasUpper = uppercaseEl.checked
    const hasNumber = numbersEl.checked
    const hasSymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(hasLower, hasNumber, hasSymbol, hasUpper, length)

    // console.log(hasLower, hasNumber, hasSymbol, hasUpper)

})

function generatePassword(lower, number, symbol, upper, length) {
    let generatedPassword = ''
    const typesCount = lower + number + symbol + upper

    const typesArr = [{ lower }, { number }, { symbol }, { upper }]
        .filter(item => Object.values(item)[0])

    if (typesCount === 0) {
        return ''
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()

            // console.log(funcName)
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword

    // tests
    //console.log(typesArr)
    // console.log(typesCount)
}

function getRandomLower() {
    // char codes from 97 to 122 - getting random
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    // char codes from 65 - getting random
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String(Math.floor(Math.random() * 10))
}


function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'

    return symbols[Math.floor(Math.random() * symbols.length)]
}

console.log(getRandomLower())
console.log(getRandomUpper())
console.log(getRandomNumber())
console.log(getRandomSymbol())


