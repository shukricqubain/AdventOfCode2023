let fs = require('fs');

let data = fs.readFileSync('input.txt', 'utf8');
data = data.toString();
let lineArr = data.split('\n');

let setMax = []
let gameMax = []
let setString = ''

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
            let checkDie = setMax.find(obj => obj.color == color);

            ///see if setMax contains a current max value for the current color die
            ///if not insert
            if (checkDie == undefined) {
                setMax.push({ num, color })
            } else {
                ///compare values and update max accordingly
                if (checkDie.num < num) {
                    checkDie.num = num;
                }
            }
        }
    }

    //groom data for summation
    for (let die of setMax) {
        setString += `${die.num} `
    }
    setString = setString.trim();
    gameMax.push({ game, setString })
    setMax = [];
    setString = ''
}

let powerSum = 0;
///multiply then sum the results of each game
for (let game of gameMax) {

    let multArr = game.setString.split(' ');
    let res = parseInt(multArr[0]) * parseInt(multArr[1]) * parseInt(multArr[2]);
    powerSum += res;
}
console.log(powerSum)