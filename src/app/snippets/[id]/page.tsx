'use client'
import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { notFound, useRouter } from 'next/navigation'
import { useSnippets } from '@/lib/context/SnippetContext'
import * as actions from '@/actions'

interface Snippet {
  id: number
  title: string
  code: string
}

interface SnippetShowPageProps {
  params: Promise<{
    id: string
  }>
}

export default function SnippetShowPage(props: SnippetShowPageProps) {
  const [snippet, setSnippet] = useState<Snippet | null>(null)
  const [loading, setLoading] = useState(true)
  const [snippetId, setSnippetId] = useState<string>('')
  const router = useRouter()
  const isProduction = process.env.NODE_ENV === 'production'

  // Get context snippets and delete function in production
  const { contextSnippets, deleteSnippetFromContext } = useMemo(() => {
    if (isProduction) {
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const context = useSnippets()
        return {
          contextSnippets: context.snippets,
          deleteSnippetFromContext: context.deleteSnippet,
        }
      } catch (error) {
        console.log('Context not available', error)
        return { contextSnippets: [], deleteSnippetFromContext: null }
      }
    }
    return { contextSnippets: [], deleteSnippetFromContext: null }
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

    // Add delay for demo purposes
    setTimeout(() => {
      loadSnippet()
    }, 2000)
  }, [snippetId, isProduction, contextSnippets])

  const handleDelete = async (event: React.FormEvent) => {
    event.preventDefault()

    if (isProduction && deleteSnippetFromContext && snippet) {
      // Production: use context
      deleteSnippetFromContext(snippet.id)
      router.push('/')
    } else if (snippet) {
      // Development: use server action
      const deleteAction = actions.deleteSnippet.bind(null, snippet.id)
      await deleteAction() // Remove the formData argument
    }
  }

  if (loading) {
    return <div className="p-4">Loading snippet...</div>
  }

  if (!snippet) {
    return notFound()
  }

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>
          <form onSubmit={handleDelete}>
            <button type="submit" className="p-2 border rounded">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  )
}
