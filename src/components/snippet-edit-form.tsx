'use client'

import type { Snippet } from '@prisma/client'
import Editor from '@monaco-editor/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSnippets } from '@/lib/context/SnippetContext'
import * as actions from '@/actions'

interface SnippetEditFormProps {
  snippet: Snippet
}

const useSnippetManagement = () => {
  const isProduction = process.env.NODE_ENV === 'production'

  try {
    if (isProduction) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const snippetContext = useSnippets()
      return { updateSnippet: snippetContext.updateSnippet }
    }
  } catch (error) {
    console.log('Development mode - not using context', error)
  }

  return { updateSnippet: null }
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code)
  const [title, setTitle] = useState(snippet.title)
  const router = useRouter()
  const { updateSnippet } = useSnippetManagement()

  const handleEditorChange = (value: string = '') => {
    setCode(value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (updateSnippet) {
      // Production: use context
      updateSnippet(snippet.id, title, code)
      router.push(`/snippets/${snippet.id}`)
    } else {
      // Development: use server action
      const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code)
      await editSnippetAction()
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-4 mb-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />

      <form onSubmit={handleSubmit}>
        <button type="submit" className="p-2 border rounded mt-4">
          Save
        </button>
      </form>
    </div>
  )
}
