const size = 10
const EMPTY = 0
const ALIVE = 1
let htmlElements
let cells

const Life = {
    nextBt: document.querySelector(".next"),
    reloadBt: document.querySelector(".reload"),

    newGeneration() {
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
    },

    init() {
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
}

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
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        let nx = (x + dx + size) % size, ny = (y + dy + size) % size;
        count = count + cells[ny][nx];
      }
    }
    return count - cells[y][x];
}

export { Life }