const Roman = {
    romanBt: document.querySelector(".roman-bt"),
    romanInput: document.querySelector(".roman-input"),
    intBt: document.querySelector(".int-bt"),
    intInput: document.querySelector(".int-input"),

    romanToInt(romanNum) {
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
    },

    intToRoman(int) {
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
        ]

        for (let i = 0; i < romanMatrix.length; i++) {
            if (int >= romanMatrix[i][0]) {
                return romanMatrix[i][1] + Roman.intToRoman(int - romanMatrix[i][0])
            }
        }
    }
}

export { Roman } 