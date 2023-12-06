let fs = require('fs');

function main(){

    let count = 1;
    let data = fs.readFileSync('demo.txt', 'utf8');
    data = data.toString();
    let rowList = data.split('\n');
    let originalRowList = JSON.parse(JSON.stringify(rowList));
    let totalList = [];
    while(true){
        let row = rowList.splice(0, 1)[0];
        let results = processData(row);
        totalList.push(results);
        //console.log(results)
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
        let offsetIndex = parseInt(tempCardName.match(/\d+/));
        console.log('\n\n')
        console.log(tempCardName, 'Resulted in:');
        //console.log(offsetIndex)
        for(let i = offsetIndex; i < matchCount + offsetIndex; i++){
            
            console.log(originalRowList[i]);
            if(originalRowList[i] != undefined){
                tempArray.push(originalRowList[i])
            }
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
    console.log(totalList.length)
    //finalList(totalList);
}

///process row
function processData(row){

    ///int to track number of matches in each card
    let matchCount = 0;
    ///grab card from row
    let card = row.split(':')[0];
    ///grab winning numbers and store them in a list
    let winningNumbers = row.split(':')[1].split('|')[0].trim(' ').split(' ');
    ///grab my numbers and store them as string
    let myNumbers = row.split(':')[1].split('|')[1].trim(' ');

    ///iterate over winning numbers
    for(let num of winningNumbers){
        ///check index of current winning number
        let index = myNumbers.indexOf(num);
        ///if not -1, increment match
        if(index != -1){
            matchCount +=1;
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

main();
