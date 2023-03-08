import { NextResponse } from 'next/server'

export async function GET(
	request: Request,
	{ params }: { params: { blogID: string } }
) {
  const blogData = await fetch(`http://localhost:3001/feed/${params.blogID}`)
  console.log(blogData)
	return NextResponse.json(blogData)
}
