'use client'
import { useActionState, startTransition } from 'react'
import { useRouter } from 'next/navigation'
import * as actions from '@/actions'
import { useSnippets } from '@/lib/context/SnippetContext'

type SnippetHookResult = {
  addSnippet: ((title: string, code: string) => void) | null
}

const useSnippetManagement = (): SnippetHookResult => {
  const isProduction = process.env.NODE_ENV === 'production'

  try {
    // Only try to use context in production
    if (isProduction) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const snippetContext = useSnippets()
      return { addSnippet: snippetContext.addSnippet }
    }
  } catch (error) {
    // Handle any context errors silently
    console.log('Development mode - not using context', error)
  }

  return { addSnippet: null }
}

export default function SnippetCreatePage() {
  const router = useRouter()
  const [formState, action] = useActionState(actions.createSnippet, {
    message: '',
  })
  const { addSnippet } = useSnippetManagement()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const title = formData.get('title') as string
    const code = formData.get('code') as string

    if (addSnippet) {
      // Use Context in production for demo purposes
      addSnippet(title, code)
      event.currentTarget.reset()
      console.log('addSnippet', title, code)
      setTimeout(() => {
        router.push('/')
      }, 500) // 500ms delay before redirect
    } else {
      // Use Server Action in development
      startTransition(() => {
        action(formData)
      })
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label className="w-12" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="border rounded p-2 w-full"
            id="title"
          />
        </div>

        <div className="flex gap-4">
          <label className="w-12" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="border rounded p-2 w-full"
            id="code"
          />
        </div>

        {formState.message ? (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
            {formState.message}
          </div>
        ) : null}

        <button type="submit" className="rounded p-2 bg-blue-200">
          Create
        </button>
      </div>
    </form>
  )
}
