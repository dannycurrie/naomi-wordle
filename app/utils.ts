import { Cell } from "./types"

export const printGrid = (grid: Cell[][]) => {
    console.log(grid.map((row) => row.map((cell) => cell.letter).join("")).join("\n"))
  }

export const getRowWord = (row: Cell[]) => {
    return row.map((cell) => cell.letter).filter((letter) => letter !== "").join("")
}

const colouriseGuess = (guess: string, word: string) => {
    return guess.split("").map((letter, index) => {
        if (letter === word[index]) {
            return "correct"
        } else if (word.includes(letter)) {
            return "present"
        } else {
            return "incorrect"
        }
    })
}

export const colouriseRow = (row: Cell[], word: string) => {
    const colouredGuess = colouriseGuess(getRowWord(row), word)
    return row.map((cell, index) => ({ ...cell, status: colouredGuess[index] as Cell["status"] }))
}