"use client"
import { useEffect, useState, useRef } from "react"
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
  const [loading, setLoading] = useState<boolean>(false)
  const [invalidWord, setInvalidWord] = useState<boolean>(false)

  const [currentCell, setCurrentCell] = useState<[number, number]>([0,0])
  const [grid, setGrid] = useState<Cell[][]>(Array.from({ length: rows }, () => Array(cols).fill({ letter: "", status: "pending" })))
  const inputRef = useRef<HTMLInputElement>(null)

  const guess = async() => {
    setLoading(true)
    const guess = getRowWord(grid[currentCell[0]])
    const isValid = await fetch('api/isValid', {
      method: 'POST',
      body: JSON.stringify({ word: guess }),
    }).then(res => res.json()).then(data => data.isValid)
    setLoading(false)
    if (!isValid) {
      setInvalidWord(true)
      setTimeout(() => {
        setInvalidWord(false)
      }, 2000)
      return
    }
    if (guess === word) {
      setGameOver("win")
    } else if (currentCell[0] >= rows - 1) {
      setGameOver("lose")
    }

    const newGrid = [...grid]
    const row = colouriseRow(newGrid[currentCell[0]], word)
    newGrid[currentCell[0]] = row as Cell[]
    setGrid(newGrid)
    setCurrentCell([currentCell[0] + 1, 0])
  }

  useEffect(() => {
    setLoading(true)
    fetch('api/word', { cache: 'no-store' }).then(res => res.json()).then(data => {
      setWord(data.word)
    }).finally(() => {
      setLoading(false)
    })
  }, [])

  const handleInput = (key: string) => {
    if (gameOver) return
    
    if (key.length === 1 && key.match(/[a-z]/i) && currentCell[1] < cols) {
      const newGrid = [...grid]
      const newRow = [...newGrid[currentCell[0]]]
      newRow[currentCell[1]] = { letter: key.toUpperCase(), status: "pending" }
      newGrid[currentCell[0]] = newRow
      setGrid(newGrid)
      setCurrentCell([currentCell[0], currentCell[1] + 1])
    } else if (key === "Backspace" && currentCell[1] > 0) {
      const newCol = currentCell[1] - 1
      const newGrid = [...grid]
      const newRow = [...newGrid[currentCell[0]]]
      newRow[newCol] = { letter: "", status: "pending" }
      newGrid[currentCell[0]] = newRow
      setGrid(newGrid)
      setCurrentCell([currentCell[0], newCol])
    } else if (key === "Enter" && currentCell[0] < rows && currentCell[1] === cols) {
      guess()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clear the input value as we handle it via onKeyDown
    e.target.value = ""
  }

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    handleInput(e.key)
  }

  const handleMainClick = () => {
    if (!gameOver && inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <main 
      className={`flex min-h-screen flex-col items-center justify-center bg-white p-8 
      ${loading ? "animate-pulse" : "animate-none"}
      ${invalidWord ? "animate-wobble" : ""}
      `}
      onClick={handleMainClick}
    >
      <input
        ref={inputRef}
        type="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        inputMode="text"
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <div className="flex flex-col items-center gap-8">
        <h1 className={`text-4xl font-bold text-gray-900 ${loading ? "animate-pulse" : "animate-none"}`}>Naomi Wordle</h1>
        {gameOver && (
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900">Game Over</h2>
            <p className="text-lg text-gray-900">You {gameOver === "win" ? "win 😄" : "lose 😥"}!</p>
          </div>
        )}
        {invalidWord ? (
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg text-gray-900">That&apos;s not a valid word!</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <p className="text-lg text-gray-900">You have {rows - currentCell[0]} guesses left</p>
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

