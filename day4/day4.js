let fs = require('fs');

let data = fs.readFileSync('input.txt', 'utf8');
data = data.toString();

let rowList = data.split('\n');
///boolean to check first match
let firstMatch = true;
///int for storing match points
let matchPoints = 0;
///list for storing points of each card
let pointsList = [];

///iterate over each row of input data
for (let row of rowList) {
    ///grab card from row
    let card = row.split(':')[0];
    ///grab winning numbers and store them in a list
    let winningNumbers = row.split(':')[1].split('|')[0].trim(' ').split(' ');
    ///grab my numbers and store them in a list
    let myNumbers = row.split(':')[1].split('|')[1].trim(' ').split(' ');

    ///iterate over list of my numbers
    for (let number of myNumbers) {

        ///convert string to number
        number = parseInt(number);

        ///filter winning numbers to see if it matches my number
        let checkNumber = winningNumbers.filter(num => {

            ///convert string to number
            num = parseInt(num);

            ///only compare if both values are actually numbers
            if (!isNaN(num) && !isNaN(number)) {
                ///return match
                return num == number;
            }
        })

        ///if match and first match add 1, otherwise multiply by 2
        if (checkNumber.length > 0 && firstMatch == true) {
            firstMatch = false;
            matchPoints += 1;
        } else if (checkNumber.length > 0) {
            matchPoints *= 2;
        }
    }
    ///store points for card in pointsList
    pointsList.push(matchPoints);
    ///reset matchPoints and firstMatch
    matchPoints = 0;
    firstMatch = true;
}
///sum points
let sum = 0;
for(let points of pointsList){
    sum += points;
}
console.log(sum);