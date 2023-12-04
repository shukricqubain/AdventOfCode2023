let fs = require('fs');

let data = fs.readFileSync('input.txt', 'utf8');
data = data.toString();
let count = 0;
let x = 0;
let y = 0;
///list of * in input
let gearList = [];
///used for storing string of numbers in input
let numString = '';
///index for each digit in numString
let indexList = [];
///list of numStrings and their indices
let numList = [];
let processedChar = '';

for(let char of data){

    if(char !== '\n' && char !== '\r'){

        ///store each star as gear in gearList
        if(char === '*'){
            gearList.push(count);
        }

        ///if digit, start populating numString and indexList
        if(!isNaN(char)){
            numString += char;
            indexList.push(count);
        }

        ///once numString populated, insert it into numList
        if(numString !== '' && isNaN(char)){
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

    } else if(char === '\n') {
        ///get dimensions of input
        if(x == 0){
            x = processedChar.length;
        }
        y += 1;
    }
    
}
///list of indices around gear
let gearArea = [];
///list of gears with exactly two number strings in area
let finalList = [];
for(let gear of gearList){

    // let r1 = '';
    // let r2 = '';
    // let r3 = '';

    ///iterate over area around gear and store the indices 
    for(let i = -1; i <= 1; i++){
        let currentIndex = gear + i;
        let rowBefore = currentIndex - y;
        let rowAfter = currentIndex + y;
        gearArea.push(parseInt(rowBefore));
        gearArea.push(parseInt(currentIndex));
        gearArea.push(parseInt(rowAfter));

        ///used for visual debugging
        // if(processedChar.charAt(rowBefore) === ''){
        //     r1 += '.'
        // } else {
        //     r1 += processedChar.charAt(rowBefore)
        // }
        // if(processedChar.charAt(currentIndex) === ''){
        //     r2 += '.'
        // } else {
        //     r2 += processedChar.charAt(currentIndex)
        // }
        // if(processedChar.charAt(rowAfter) === ''){
        //     r3 += '.'
        // } else {
        //     r3 += processedChar.charAt(rowAfter)
        // }
        
    }

    ///used for visual debugging
    // let checkString = '';
    // checkString += `${r1}\n${r2}\n${r3}\n\n`;
    
    ///iterate over each index in gearArea
    let uniqueNumList = [];
    for(let index of gearArea){
        ///check if index matches any index in numList
        let findMatch = numList.find(obj => obj.indexList.includes(index));
        ///if it matches, check if it's already inserted in list
        if(findMatch !== undefined){
            if(!uniqueNumList.includes(findMatch.num)){
                uniqueNumList.push(findMatch.num);
            }
        }
    }
   
    ///check matches to see if there are exactly two, if so, multiply the numbers
    if(uniqueNumList.length == 2){
        let num1 = parseInt(uniqueNumList[0]);
        let num2 = parseInt(uniqueNumList[1]);
        let res = num1 * num2;
        finalList.push(res);
    }
    uniqueNumList = [];
    gearArea = [];
}

///sum the result of the product of the two numbers for each gear
let sum = 0;
for(let res of finalList){
    sum += res;
}
console.log(sum)
