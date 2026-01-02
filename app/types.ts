export type Cell = {
    letter: string
    status: "correct" | "incorrect" | "present" | "pending"
  }

export type WordOption = {
    id: number
    word: string
    createdAt: string
    isCurrentWord: boolean
}