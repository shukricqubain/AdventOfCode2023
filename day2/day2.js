let fs = require('fs');

let data = fs.readFileSync('input.txt', 'utf8');
data = data.toString();
let lineArr = data.split('\n');

let bag = [
    { num: 12, color: 'red' },
    { num: 13, color: 'green' },
    { num: 14, color: 'blue' }
]

let checkList = [];
for (let line of lineArr) {
    line = line.trim('');
    //grab game and results, split results by each set
    let game = line.split(':')[0];
    let res = line.split(':')[1];
    let setArr = res.split(';');

    ///check each set
    for (let set of setArr) {

        let dieArr = set.split(',');

        ///check each individual die roll from set
        for (let die of dieArr) {
            die = die.trim(' ');
            let num = die.split(' ')[0];
            num = parseInt(num);
            let color = die.split(' ')[1];

            let dieCheck = bag.find(obj => obj.color === color);
            ///check if die values are not possible
            if (dieCheck !== undefined) {
                if (dieCheck.num < num) {
                    let pos = checkList.find(obj => obj.game == game)
                    if (pos == undefined) {
                        checkList.push({ game, possible: 'impossible' })
                    }
                }
            }
        }
    }
    ///check if game is in list, if not it is possible
    let pos = checkList.find(obj => obj.game == game)
    if (pos == undefined) {
        checkList.push({ game, possible: 'possible' })
    }

}

///sum ids of possible games
let sum = 0;
for (let game of checkList) {
    if (game.possible === 'possible') {
        let id = game.game.split(' ')[1];
        id = parseInt(id)
        sum += id;
    }
}
console.log(sum)