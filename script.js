const romanBt = document.querySelector(".roman-bt")
const romanInput = document.querySelector(".roman-input")

const intBt = document.querySelector(".int-bt")
const intInput = document.querySelector(".int-input")

const nextBt = document.querySelector(".next")
const reloadBt = document.querySelector(".reload")

nextBt.addEventListener("click", () => {
    newGeneration()
})

reloadBt.addEventListener("click", () => {
    window.location.reload()
})

romanBt.addEventListener("click", () => {
    intInput.value = romanToInt(romanInput.value)
})

intBt.addEventListener("click", () => {
    romanInput.value = intToRoman(intInput.value)
    console.log(intToRoman(intInput.value))
})

function romanToInt(romanNum) {
    const romanObject = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000
    }

    let acc = 0
    romanNum = romanNum.toUpperCase()

    for (let i = 0; i < romanNum.length; i++) {
        if (romanNum[i] === "I" && romanNum[i + 1] === "V") {
            acc += 4
            i++
        } else if (romanNum[i] === "I" && romanNum[i + 1] === "X") {
            acc +=9
            i++
        } else if (romanNum[i] === "X" && romanNum[i + 1] === "L") { 
            acc += 40
            i++
        } else if (romanNum[i] === "X" && romanNum[i + 1] === "C") {
            acc += 90
            i++
        } else if (romanNum[i] === "C" && romanNum[i + 1] === "D") {
            acc += 400
            i++
        } else if (romanNum[i] === "C" && romanNum[i + 1] === "M") {
            acc += 900
            i++
        } else {
            acc += romanObject[romanNum[i]]
        }
    }
    return acc
}

function intToRoman(int) {
    if (int === 0) return ""

    const romanMatrix = [
        [1000, 'M'],
        [900, 'CM'],
        [500, 'D'],
        [400, 'CD'],
        [100, 'C'],
        [90, 'XC'],
        [50, 'L'],
        [40, 'XL'],
        [10, 'X'],
        [9, 'IX'],
        [5, 'V'],
        [4, 'IV'],
        [1, 'I']
      ];

    for (let i = 0; i < romanMatrix.length; i++) {
        if (int >= romanMatrix[i][0]) {
            return romanMatrix[i][1] + intToRoman(int - romanMatrix[i][0])
        }
    }
}
//
const size = 10
const EMPTY = 0
const ALIVE = 1
let htmlElements
let cells

function createField() {
    htmlElements = []
    cells = []

    let table = document.getElementById("field")

    for (let i = 0; i < size; i++) {
        let tr = document.createElement("tr")
        let tdElements = []
        
        cells.push(new Array(size).fill(EMPTY))
        htmlElements.push(tdElements)
        table.appendChild(tr)

        for (let j = 0; j < size; j++) {
            let td = document.createElement("td")
            
            tdElements.push(td)
            tr.appendChild(td)
        }
    }
}

function draw() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            htmlElements[i][j].setAttribute("class", "cell " + (cells[i][j] == 1 ? "filled" : "empty"))
        }
    }
}

function countNeibhours(x, y) {
    var count = 0;
    for (dy = -1; dy <= 1; dy++) {
      for (dx = -1; dx <= 1; dx++) {
        let nx = (x + dx + size) % size, ny = (y + dy + size) % size;
        count = count + cells[ny][nx];
      }
    }
    return count - cells[y][x];
  }

function newGeneration() {
    let newCells = [];

    for (let i = 0; i < size; i++) {
      newCells.push(new Array(size).fill(EMPTY));
    }

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let neibhours = countNeibhours(j, i);
        if (cells[i][j] == EMPTY && neibhours == 3) {
          newCells[i][j] = ALIVE;
        }
        if (cells[i][j] == ALIVE && (neibhours == 2 || neibhours == 3)) {
          newCells[i][j] = ALIVE;
        }
      }
    }

    cells = newCells;

    draw();
  }

function init() {
    createField()

    for (let i = 0; i < Math.floor(size * size * 0.3); i++) {
        let x, y

        do {
            x = Math.floor(Math.random() * size)
            y = Math.floor(Math.random() * size)
            
            if (cells[x][y] == EMPTY) {
                cells[x][y] = ALIVE
                break
            }
        } while (true)
    }
    draw()
}

init()