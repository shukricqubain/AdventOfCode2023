let fs = require('fs');

function main(){

    let count = 0;
    let data = fs.readFileSync('demo.txt', 'utf8');
    data = data.toString();
    let rowList = data.split('\n');
    let originalRowList = JSON.parse(JSON.stringify(rowList));
    
    let cardIndex = createIndex(originalRowList);
    let totalList = [];
    while(true){
        let row = rowList.splice(0, 1)[0];
        let results = processData(row);
        totalList.push(results);
        // console.log(results)
        if(rowList.length == 0){
            break;
        }
        /// grab matchCount of processed row
        let matchCount = results.matchCount;
        ///update rowList after data was processed
        ///first remove first row since it was processed
        let tempCard = row;
        
        count+= 1;
        
        ///for each match found, add a copy for each subsequent card
        let tempArray = [];
        let tempCardName = tempCard.split(':')[0];
        //console.log('\n\n')
        //console.log(tempCardName, 'Resulted in:');
        let offsetIndex = cardIndex.find(obj => obj.cardName === tempCardName).index;
        //console.log(offsetIndex)
        for(let i = 1 + offsetIndex; i <= matchCount + offsetIndex; i++){
            
            //console.log(originalRowList[i]);
            tempArray.push(originalRowList[i])
        }
        ///merge two arrays
        Array.prototype.push.apply(rowList, tempArray);
        
        console.log()
        console.log('current rowList length:')
        console.log(rowList.length)

        ///stop processing once all cards are removed
        if(rowList.length == 0){
            break;
        }
    }
    
    console.log('Card count:', count)
    //console.log(totalList)
    finalList(totalList);
}

///process row
function processData(row){

    ///int to track number of matches in each card
    let matchCount = 0;
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

        ///if match, increment matchCount for current card
        if (checkNumber.length > 0) {
            matchCount += 1;
        }
        }
    return {num: card, row, matchCount};
}

function finalList(totalList){

    totalList = totalList.sort( (a,b) => {
        aNum = a.num;
        bNum = b.num;
        if(aNum > bNum){
            return 1;
        } else if(aNum < bNum){
            return -1;
        } else {
            return 0;
        }
    });
    console.log(totalList)
    console.log(totalList.length)
}

function createIndex(originalRowList){
    let indexArray = [];
    let index = 0;
    for(let row of originalRowList){
        let cardName = row.split(':')[0];
        indexArray.push({cardName, index, card: row});
        index += 1;
    }
    return indexArray;
}

main();
