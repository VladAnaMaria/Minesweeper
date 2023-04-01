//preparing game
document.querySelector('.sad').style.visibility = 'hidden';
document.querySelector('.win').style.visibility = 'hidden';
document.querySelector('.smile').style.visibility = 'visible';

let gameHasStarted = 0;
let isGameOver = 0;
let totalRow = 10;
let totalColumn = 10;
let totalCells = 100;
let totalMines = 10;
let counterMines = 10;
document.getElementById('minesId').innerHTML = counterMines;

let allPossibleMinePosition = [];
let frequencyMines = [];
let minesPosition = [];

function cellGrid() {
    for (let n = 0; n < totalCells; ++n) {
        allPossibleMinePosition.push(n);
        frequencyMines.push(0);
    }
}

function generateGrid() {
    const grid = document.createElement('table');
    const gridBody = document.createElement('tbody');
    for (let i = 0; i < totalRow; ++i) {
        let row = document.createElement('tr');
        for (let j = 0; j < totalColumn; ++j) {
            let cell = document.createElement('td');
            let positionGrid = (i * totalColumn) + j;
            cell.id = positionGrid;
            row.appendChild(cell);
            cell.onclick = function() { clickCell(parseInt(this.id)); };
            cell.oncontextmenu = function() { setFlag(this.id); return false;};
        }
        gridBody.appendChild(row);
    }
    grid.appendChild(gridBody);
    document.body.appendChild(grid);
}

//random mines
function randomMines() {
    for (let i = 0; i < totalMines; ++i) {
        let mineIndex = Math.floor(Math.random() * allPossibleMinePosition.length);
        let minePosition = allPossibleMinePosition[mineIndex];
        minesPosition.push(minePosition);
        allPossibleMinePosition.splice(mineIndex, 1);
        frequencyMines[minePosition] = -1;
    }
}

//fill around mines
function fillAroundMines() {
    for (let i = 0; i < totalMines; ++i){
        fillOrCheckNeighbours(minesPosition[i], true);
    }
}

function main() {
    cellGrid();
    generateGrid();
    randomMines();
    fillAroundMines();
}

main();

//neighbours
let relativePosition = 10;
let southSide = 90;

function fillOrCheckNeighbours(cellPosition, fill) {
    let northWest = parseInt(cellPosition) - relativePosition - 1;
    let north = parseInt(cellPosition) - relativePosition;
    let northEst = parseInt(cellPosition) - relativePosition + 1;
    let west = parseInt(cellPosition) - 1;
    let est = parseInt(cellPosition) + 1;
    let southWest = parseInt(cellPosition) + relativePosition - 1;
    let south = parseInt(cellPosition) + relativePosition;
    let southEst = parseInt(cellPosition) + relativePosition + 1;
    if (cellPosition > relativePosition && cellPosition % relativePosition != 0 && frequencyMines[northWest] != -1 && document.getElementById(northWest).className != 'flag') {
        if (fill) {
            frequencyMines[northWest] += 1;
        } else {
            if (frequencyMines[northWest] != 0) {
                document.getElementById(northWest).innerHTML = frequencyMines[northWest] + '';
                document.getElementById(northWest).style.color = getColor(frequencyMines[northWest]);
            }
            document.getElementById(northWest).className = 'clicked';
        }
    }
    if (cellPosition > relativePosition && frequencyMines[north] != -1 && document.getElementById(north).className != 'flag') {
        if (fill) {
            frequencyMines[north] += 1;
        } else {
            if (frequencyMines[north] != 0) {
                document.getElementById(north).innerHTML = frequencyMines[north] + '';
                document.getElementById(north).style.color = getColor(frequencyMines[north]);
            }
            document.getElementById(north).className = 'clicked';
        }
    }
    if (cellPosition > relativePosition && cellPosition % relativePosition != relativePosition - 1 && frequencyMines[northEst] != -1 && document.getElementById(northEst).className != 'flag') {
        if (fill) {
            frequencyMines[northEst] += 1;
        } else {
            if (frequencyMines[northEst] != 0) {
                document.getElementById(northEst).innerHTML = frequencyMines[northEst] + '';
                document.getElementById(northEst).style.color = getColor(frequencyMines[northEst]);
            }
            document.getElementById(northEst).className = 'clicked';
        }
    }
    if (cellPosition % relativePosition != 0 && frequencyMines[west] != -1 && document.getElementById(west).className != 'flag') {
        if (fill) {
            frequencyMines[west] += 1;
        } else {
            if (frequencyMines[west] != 0) {
                document.getElementById(west).innerHTML = frequencyMines[west] + '';
                document.getElementById(west).style.color = getColor(frequencyMines[west]);
            }
            document.getElementById(west).className = 'clicked';
        }
    }
    if (cellPosition % relativePosition != relativePosition - 1 && frequencyMines[est] != -1 && document.getElementById(est).className != 'flag') {
        if (fill) {
            frequencyMines[est] += 1;
        } else {
            if (frequencyMines[est] != 0) {
                document.getElementById(est).innerHTML = frequencyMines[est] + '';
                document.getElementById(est).style.color = getColor(frequencyMines[est]);
            }
            document.getElementById(est).className = 'clicked';
        }
    }
    if (cellPosition < southSide && cellPosition % relativePosition != 0 && frequencyMines[southWest] != -1 && document.getElementById(southWest).className != 'flag') {
        if (fill) {
            frequencyMines[southWest] += 1;  
        } else {
            if (frequencyMines[southWest] != 0) {
                document.getElementById(southWest).innerHTML = frequencyMines[southWest] + '';
                document.getElementById(southWest).style.color = getColor(frequencyMines[southWest]);
            }
            document.getElementById(southWest).className = 'clicked';
        }  
    }
    if (cellPosition < southSide && frequencyMines[south] != -1 && document.getElementById(south).className != 'flag') {
        if (fill) {
            frequencyMines[south] += 1;
        } else {
            if (frequencyMines[south] != 0) {
                document.getElementById(south).innerHTML = frequencyMines[south] + '';
                document.getElementById(south).style.color = getColor(frequencyMines[south]);
            }
            document.getElementById(south).className = 'clicked';
        }
    }
    if (cellPosition < southSide && cellPosition % relativePosition != relativePosition - 1 && frequencyMines[southEst] != -1 && document.getElementById(southEst).className != 'flag') {
        if (fill) {
            frequencyMines[southEst] += 1; 
        } else {
            if (frequencyMines[southEst] != 0) {
                document.getElementById(southEst).innerHTML = frequencyMines[southEst] + '';
                document.getElementById(southEst).style.color = getColor(frequencyMines[southEst]);
            }
            document.getElementById(southEst).className = 'clicked';
        }  
    }
    return;
}

function getColor (numberAroundMines) {
    if (numberAroundMines == 1) {
        return 'blue';
    }
    if (numberAroundMines == 2) {
        return 'green';
    }
    if (numberAroundMines == 3) {
        return 'red';
    }
    if (numberAroundMines == 4) {
        return 'black';
    }
    if (numberAroundMines == 5) {
        return 'grey';
    }
    if (numberAroundMines == 6) {
        return 'yellow';
    }
}

//set flags on right click
let minesPositionLength = minesPosition.length;
let flags = [];

function setFlag(cellId) {
    if (gameOverLose == 0 || gameOverWin == 0) {
        return;
    }
    if (document.getElementById(cellId).className != 'clicked') {
        if (flags.includes(parseInt(cellId))) {
            document.getElementById(cellId).innerHTML = '';
            ++counterMines;
            flags.splice(flags.indexOf(parseInt(cellId)), 1);
            document.getElementById(cellId).className = 'flag';
        } else if (!flags.includes(parseInt(cellId)) && counterMines > 0){
            document.getElementById(cellId).innerHTML = '🚩';
            --counterMines;
            flags.push(parseInt(cellId));
            document.getElementById(cellId).className = 'flag';
        }
        if (counterMines == 0) {
            if (flags.length == minesPositionLength) {
                let ok = 0;
                for (let i = 0; i < minesPositionLength; ++i) {
                    for (let j = 0; j < minesPositionLength; ++j) {
                        if (flags[i] == minesPosition[j]) {
                            ok += 1;
                            continue;
                        }
                    }
                }
                if (ok == totalMines) {
                    gameOverWin();
                    return;
                }
            }
        }
    }
    document.getElementById('minesId').innerHTML = counterMines;
}

//acces cell by click
function clickCell(cellId) {
    if (gameHasStarted == 0) {
        gameHasStarted = 1;
        myInterval = setInterval(stopwatch, 1000);
    }
    if (!flags.includes(cellId)) {
        if (frequencyMines[cellId] == -1) {
            gameOverLose();
            return;
        }
        if (isGameOver != 1) {
            if (frequencyMines[cellId] != 0) {
                document.getElementById(cellId).innerHTML = frequencyMines[cellId] + '';
                document.getElementById(cellId).style.color = getColor(frequencyMines[cellId]);
            }
            if (document.getElementById(cellId).className != 'flag' && frequencyMines[cellId] == 0 && document.getElementById(cellId).className != 'clicked') {
                fillOrCheckNeighbours(cellId, false);
            }
            document.getElementById(cellId).className = 'clicked';
        }
    }
}

//game over
//game over - win
function gameOverWin () {
    clearInterval(myInterval);
    document.querySelector('.win').style.visibility = 'visible';
    isGameOver = 1;
    return;
}

//game over - lose
function gameOverLose() {
    clearInterval(myInterval);
    for (let i = 0; i < minesPositionLength; ++i) {
        document.getElementById(minesPosition[i]).innerHTML = '💣';
        document.getElementById(minesPosition[i]).className = 'clicked';
        document.querySelector('.sad').style.visibility = 'visible';
    }
    isGameOver = 1;
    return;
}

//stopwatch
document.getElementById('stopwatch').innerHTML = '00:00';

let time = 0;
let myInterval;

function stopwatch() {
    time += 1000;
    let minutes = Math.floor(time / 1000 / 60);
    let seconds = Math.floor((time/1000) % 60);
    document.getElementById('stopwatch').innerHTML = minutes + ":" + seconds;
}