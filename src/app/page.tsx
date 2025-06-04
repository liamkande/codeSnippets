'use client'
import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { useSnippets } from '@/lib/context/SnippetContext'

interface Snippet {
  id: number
  title: string
  code: string
}

export default function Home() {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [loading, setLoading] = useState(true)
  const isProduction = process.env.NODE_ENV === 'production'

  // Memoize context snippets to prevent unnecessary re-renders
  const contextSnippets = useMemo(() => {
    if (isProduction) {
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const context = useSnippets()
        return context.snippets
      } catch (error) {
        console.log('Context not available', error)
        return []
      }
    }
    return []
  }, [isProduction])

  useEffect(() => {
    const loadSnippets = async () => {
      if (isProduction) {
        // Production: use context data
        setSnippets(contextSnippets)
      } else {
        // Development: fetch from API
        try {
          const response = await fetch('/api/snippets')
          const data = await response.json()
          setSnippets(data)
        } catch (error) {
          console.error('Fetch error:', error)
          setSnippets([])
        }
      }
      setLoading(false)
    }

    loadSnippets()
  }, [isProduction, contextSnippets])

  if (loading) {
    return <div className="p-4">Loading snippets...</div>
  }

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="flex justify-between items-center p-2 border rounded"
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    )
  })

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="border p-2 rounded">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {renderedSnippets.length > 0 ? (
          renderedSnippets
        ) : (
          <div className="p-4 text-gray-500">
            No snippets found. Create your first snippet!
          </div>
        )}
      </div>
    </div>
  )
}
