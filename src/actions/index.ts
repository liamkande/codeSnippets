'use server'

import { redirect } from 'next/navigation'

export async function editSnippet(id: number, code: string) {
  console.log(`Editing snippet with ID: ${id}, with: ${code}`)

  redirect(`/snippets/${id}`)
}
