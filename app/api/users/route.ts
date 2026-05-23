import { NextRequest, NextResponse } from 'next/server'
import { getUsers, createUser } from '@/lib/user-management'

export async function GET(request: NextRequest) {
  try {
    const users = await getUsers()
    return NextResponse.json({ success: true, data: users })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const user = await createUser(body)
    return NextResponse.json({ success: true, data: user }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create user' },
      { status: 400 }
    )
  }
}
