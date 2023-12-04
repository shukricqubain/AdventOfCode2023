let fs = require('fs');
let data = fs.readFileSync('input.txt', 'utf8');
data = data.toString();
let lineArr = data.split('\n');
let row = [];
let numArr = [];
// let writeStream = fs.createWriteStream('debug.txt');
let debug = ''
for (line of lineArr) {
    line = line.trim(' ')

    //search for numbers
    let count = 0;
    for (let char of line) {
        if (!isNaN(char)) {
            let val = parseInt(char);
            let index = count;
            row.push({index, val})
        }
        count += 1;
    }

    ///sort items
    row = row.sort((a,b) => {
        let aIndex = a.index;
        let bIndex = b.index;
        if(aIndex > bIndex){
            return 1;
        } else if(aIndex < bIndex){
            return -1;
        } else {
            return 0;
        }
    });

    ///grab digits
    let firstDigit = row[0].val;
    let secondDigit = row[row.length - 1].val;
    let finalNum = `${firstDigit}${secondDigit}`;
    finalNum = parseInt(finalNum);
    row = [];
    numArr.push(finalNum)
    // debug += `${line} ${finalNum}\n`
}

///sum values
let sum = 0;
for(let num of numArr){
    sum += num;
}
// writeStream.write(debug);