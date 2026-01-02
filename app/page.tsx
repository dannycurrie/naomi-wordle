"use client"
import { useEffect, useState } from "react"
import { Cell } from "./types"
import { colouriseRow, getRowWord } from "./utils"


const getCellColour = (status: "correct" | "incorrect" | "present" | "pending") => {
  switch (status) {
    case "correct":
      return "bg-green-500 text-white"
    case "incorrect":
      return "bg-gray-500 text-white"
    case "present":
      return "bg-yellow-500 text-white"
    case "pending":
      return "bg-white text-gray-900"
  }
}

export default function Home() {
  const rows = 6
  const cols = 5

  const [word, setWord] = useState<string>("")
  const [gameOver, setGameOver] = useState<"win" | "lose" | null>(null)

  const [currentCell, setCurrentCell] = useState<[number, number]>([0,0])
  const [grid, setGrid] = useState<Cell[][]>(Array.from({ length: rows }, () => Array(cols).fill({ letter: "", status: "pending" })))

  const guess = () => {
    const guess = getRowWord(grid[currentCell[0]])
    if (guess === word) {
      setGameOver("win")
      alert("You win!")
    } else if (currentCell[0] >= rows) {
      setGameOver("lose")
      alert("You lose!")
    }

    const newGrid = [...grid]
    const row = colouriseRow(newGrid[currentCell[0]], word)
    newGrid[currentCell[0]] = row as Cell[]
    setGrid(newGrid)
    setCurrentCell([currentCell[0] + 1, 0])
  }

  useEffect(() => {
    fetch('api/word', { cache: 'no-store' }).then(res => res.json()).then(data => {
      setWord(data.word)
    })
  }, [])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameOver) {
        window.removeEventListener("keydown", handleKeyPress)
        return
      }
      if (event.key.length === 1 && event.key.match(/[a-z]/i) && currentCell[1] < cols) {
        const newGrid = [...grid]
        const newRow = [...newGrid[currentCell[0]]]
        newRow[currentCell[1]] = { letter: event.key.toUpperCase(), status: "pending" }
        newGrid[currentCell[0]] = newRow
        setGrid(newGrid)
        setCurrentCell([currentCell[0], currentCell[1] + 1])
      } else if (event.key === "Backspace" && currentCell[1] > 0) {
        const newCol = currentCell[1] - 1
        const newGrid = [...grid]
        const newRow = [...newGrid[currentCell[0]]]
        newRow[newCol] = { letter: "", status: "pending" }
        newGrid[currentCell[0]] = newRow
        setGrid(newGrid)
        setCurrentCell([currentCell[0], newCol])
      } else if (event.key === "Enter" && currentCell[0] < rows && currentCell[1] === cols) {
        guess()
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => {
      window.removeEventListener("keydown", handleKeyPress)
    }
  }, [word, currentCell, grid])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white p-8">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-4xl font-bold text-gray-900">Naomi Wordle</h1>
        {gameOver && (
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">Game Over</h2>
            <p className="text-lg text-gray-900">You {gameOver === "win" ? "win" : "lose"}!</p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          {grid.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2">
              {grid[rowIndex].map((_, colIndex) => (
                <div
                  key={colIndex}
                  className={`flex h-14 w-14 items-center justify-center border-2 border-gray-300 text-2xl font-bold text-gray-900 ${getCellColour(row[colIndex].status)}`}>  
                  {row[colIndex].letter}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

