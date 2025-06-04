import { NextResponse } from 'next/server'
import { db } from '@/db'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const snippet = await db.snippet.findFirst({
      where: { id: parseInt(id) },
    })

    if (!snippet) {
      return NextResponse.json({ error: 'Snippet not found' }, { status: 404 })
    }

    return NextResponse.json(snippet)
  } catch (error) {
    console.error('Database error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch snippet' },
      { status: 500 }
    )
  }
}
