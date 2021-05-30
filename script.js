const resultElements = document.getElementById('result')
const lengthElements = document.getElementById('length')
const uppercaseElements = document.getElementById('uppercase')
const lowercaseElements = document.getElementById('lowercase')
const numbersElements = document.getElementById('numbers')
const symbolsElements = document.getElementById('symbols')
const generateElements = document.getElementById('generate')
const clipboardElements = document.getElementById('clipboard')

const randomFunc = {
    lowerletters: getRandomLower,
    upperletters: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

clipboardElements.addEventListener('click', () => {
    const textarea = document.createElement('textarea')
    const pswd = resultElements.innerText

    if(!pswd) { return }

    textarea.value = pswd
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    textarea.remove()
    alert('Password copied to clipboard!')
})

generateElements.addEventListener('click', () => {
    const length = +lengthElements.value
    const hasLower = lowercaseElements.checked
    const hasUpper = uppercaseElements.checked
    const hasNumber = numbersElements.checked
    const hasSymbol = symbolsElements.checked

    resultElements.innerText = uniquePasswordGenerator(hasLower, hasUpper, hasNumber, hasSymbol, length)
})

function uniquePasswordGenerator(lowerletters, upperletters, number, symbol, length) {
    let generatedPassword = ''
    const typesCount = lowerletters + upperletters + number + symbol
    const typesArr = [{lowerletters}, {upperletters}, {number}, {symbol}].filter(item => Object.values(item)[0])
    
    if(typesCount === 0) {
        return ''
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0]
            generatedPassword += randomFunc[funcName]()
        })
    }

    const finalPassword = generatedPassword.slice(0, length)

    return finalPassword
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}