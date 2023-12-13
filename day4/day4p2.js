let fs = require('fs');
let count = 0;
let data = fs.readFileSync('input.txt', 'utf8');
data = data.toString();
let rowList = data.split('\n');
let cards = [];
while(rowList.length > 0){
    let row = rowList.splice(0, 1)[0];
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

    // console.log('Current Card:', card)
    // console.log('Match count:', matchCount)
    cards.push({
        num: parseInt(card.match(/\d+/)),
        matchCount,
        card: row
    });
    
}

let finalList = data.split('\n');
while(finalList.length > 0){

    let final = finalList.splice(0, 1)[0];
    let num = parseInt(final.split(':')[0].match(/\d+/));
    if(cards[num - 1].matchCount > 0){
        for(let i = num; i < cards[num - 1].matchCount + num; i++){
            if(cards[i] !== undefined){
                finalList.push(cards[i].card)
            }
            
        }
    }
    count += 1;
    console.log('Current Count:', count, 'Current list:', finalList.length);
}

console.log('Card count:', count)

