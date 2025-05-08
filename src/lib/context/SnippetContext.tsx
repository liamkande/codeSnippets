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

  return (
    <SnippetContext.Provider value={{ snippets, addSnippet }}>
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
