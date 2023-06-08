import { Roman } from "./roman.js"
import { Life } from "./life.js"

Life.nextBt.addEventListener("click", Life.newGeneration)
Life.reloadBt.addEventListener("click", () => {
    window.location.reload()
})

Roman.romanBt.addEventListener("click", () => {
    Roman.intInput.value = Roman.romanToInt(Roman.romanInput.value)
})
Roman.intBt.addEventListener("click", () => {
    Roman.romanInput.value = Roman.intToRoman(Roman.intInput.value)
})

Life.init()