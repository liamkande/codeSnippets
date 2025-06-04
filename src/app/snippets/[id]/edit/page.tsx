'use client'
import { useEffect, useState, useMemo } from 'react'
import { notFound } from 'next/navigation'
import { useSnippets } from '@/lib/context/SnippetContext'
import SnippetEditForm from '@/components/snippet-edit-form'

interface Snippet {
  id: number
  title: string
  code: string
}

interface SnippetEditPageProps {
  params: Promise<{
    id: string
  }>
}

export default function SnippetEditPage(props: SnippetEditPageProps) {
  const [snippet, setSnippet] = useState<Snippet | null>(null)
  const [loading, setLoading] = useState(true)
  const [snippetId, setSnippetId] = useState<string>('')
  const isProduction = process.env.NODE_ENV === 'production'

  // Get context snippets in production
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

  // Get the ID from params
  useEffect(() => {
    props.params.then((params) => {
      setSnippetId(params.id)
    })
  }, [props.params])

  // Load snippet data
  useEffect(() => {
    if (!snippetId) return

    const loadSnippet = async () => {
      if (isProduction) {
        // Production: use context
        const foundSnippet = contextSnippets.find(
          (s) => s.id === parseInt(snippetId)
        )
        setSnippet(foundSnippet || null)
      } else {
        // Development: fetch from API
        try {
          const response = await fetch(`/api/snippets/${snippetId}`)
          if (response.ok) {
            const data = await response.json()
            setSnippet(data)
          } else {
            setSnippet(null)
          }
        } catch (error) {
          console.error('Fetch error:', error)
          setSnippet(null)
        }
      }
      setLoading(false)
    }

    loadSnippet()
  }, [snippetId, isProduction, contextSnippets])

  if (loading) {
    return <div className="p-4">Loading snippet...</div>
  }

  if (!snippet) {
    return notFound()
  }

  return (
    <div>
      <SnippetEditForm snippet={snippet} />
    </div>
  )
}
