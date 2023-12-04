let fs = require('fs');

let data = fs.readFileSync('input.txt', 'utf8');
data = data.toString();
let count = 0;
let x = 0;
let y = 0;
///string for grabbing number
let numString = '';
///list for index of each digit in number
let indexList = [];
let numList = [];
let processedChar = '';

///go over each character
for (let char of data) {

    if (char !== '\n' && char !== '\r') {

        ///if digit add it to numString
        ///store index in list
        if (!isNaN(char)) {
            numString += char;
            indexList.push(count);
        }

        //if numString finished populating insert object in numList
        ///reset values
        if (numString !== '' && isNaN(char)) {
            numList.push(
                {
                    num: numString,
                    indexList: indexList
                }
            );
            numString = '';
            indexList = [];
        }

        processedChar += char;
        count += 1;

    } else if (char === '\n') {
        ///populate dimensions
        if (x == 0) {
            x = processedChar.length;
        }
        y += 1;
    }

}

///list for adjacent values
let foundAdjacent = [];
///string used for displaying grid around number string
let checkArray = '';
///iterate over each number string
for (let obj of numList) {

    let r1 = '';
    let r2 = '';
    let r3 = '';

    ///get areas around num
    let numLength = obj.num.length;
    ///iterate over num string
    for (let i = -1; i <= numLength; i++) {
        
        ///grab index of current digit, row above's digit, and row below's digit
        let currentIndex = obj.indexList[0] + i;
        let rowBefore = currentIndex - y;
        let rowAfter = currentIndex + y;

        ///if in edge of input, add . to make visualization easy
        if (processedChar.charAt(rowBefore) === '') {
            r1 += '.'
        } else {
            r1 += processedChar.charAt(rowBefore)
        }
        if (processedChar.charAt(currentIndex) === '') {
            r2 += '.'
        } else {
            r2 += processedChar.charAt(currentIndex)
        }
        if (processedChar.charAt(rowAfter) === '') {
            r3 += '.'
        } else {
            r3 += processedChar.charAt(rowAfter)
        }
    }

    ///checkString to use when debugging
    let checkString = '';
    checkString += `${r1}\n${r2}\n${r3}\n\n`;
    checkArray += checkString;

    ///iterate over each area around number string and check for special character
    for (let i = 0; i < checkString.length; i++) {
        if (checkString[i] !== '.' && isNaN(checkString[i])) {
            foundAdjacent.push(obj.num);
            break;
        }
    }
}

///sum all numbers with special character adjacent
let sum = 0;
for (let num of foundAdjacent) {
    num = parseInt(num);
    sum += num;
}
console.log(sum)