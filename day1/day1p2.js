let fs = require('fs');

let data = fs.readFileSync('input.txt', 'utf8');
data = data.toString();
let lineArr = data.split('\n');

let numStrings = [
    'one','two','three','four','five','six','seven','eight','nine'
]

let match = [];
let numArr = [];
let sum = 0;

for (let line of lineArr) {
    line = line.trim('\n')

    ///search for numbers as words
    numStrings.filter(num => {
        if (line.includes(num)) {
            let val = numStrings.indexOf(num);
            val += 1;
            let re = new RegExp(num,'gi');
            let results = new Array();//this 
            while (re.exec(line)){
                results.push(re.lastIndex - num.length);
            }
            for(res of results){
                match.push({ index: res, val })
            }
        }
    });

    ///search for numbers as digits
    let count = 0;
    for (let char of line) {
        if (!isNaN(char)) {
            let index = count;
            let val = parseInt(char);
            match.push({ index, val })
        }
        count += 1;
    }

    ///sort results
    match = match.sort((a, b) => {
        let aIndex = a.index;
        let bIndex = b.index;
        if(aIndex > bIndex){
            return 1;
        } else if (aIndex < bIndex){
            return -1;
        } else {
            return 0;
        }
    });
    
    //grab digits
    let firstDigit = match[0].val;
    let secondDigit = match[match.length -1].val;
    let finalNum = `${firstDigit}${secondDigit}`;
    finalNum = parseInt(finalNum);
    numArr.push(finalNum)
    match = [];
}
///sum numbers
for(let num of numArr){
    sum += num;
}
console.log(sum)

