import { NextResponse } from 'next/server'
import { db } from '@/db'

export async function GET() {
  const snippets = await db.snippet.findMany()
  return NextResponse.json(snippets)
}
