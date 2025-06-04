'use client'
import { createContext, useContext, useState } from 'react'

interface Snippet {
  id: number
  title: string
  code: string
}

type SnippetContextType = {
  snippets: Snippet[]
  addSnippet: (title: string, code: string) => void
  deleteSnippet: (id: number) => void
  updateSnippet: (id: number, title: string, code: string) => void
}

const SnippetContext = createContext<SnippetContextType | undefined>(undefined)

export function SnippetProvider({ children }: { children: React.ReactNode }) {
  const [snippets, setSnippets] = useState<Snippet[]>([])

  const addSnippet = (title: string, code: string) => {
    setSnippets((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        code,
      },
    ])
  }

  const deleteSnippet = (id: number) => {
    setSnippets((prev) => prev.filter((snippet) => snippet.id !== id))
  }

  const updateSnippet = (id: number, title: string, code: string) => {
    setSnippets((prev) =>
      prev.map((snippet) =>
        snippet.id === id ? { ...snippet, title, code } : snippet
      )
    )
  }

  return (
    <SnippetContext.Provider
      value={{ snippets, addSnippet, deleteSnippet, updateSnippet }}
    >
      {children}
    </SnippetContext.Provider>
  )
}

export function useSnippets() {
  const context = useContext(SnippetContext)
  if (!context) {
    throw new Error('useSnippets must be used within a SnippetProvider')
  }
  return context
}
