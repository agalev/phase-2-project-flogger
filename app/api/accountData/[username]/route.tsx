import { parse } from 'rss-to-json'
import { NextResponse } from 'next/server'

export async function GET(
	request: Request,
	{ params }: { params: { username: string } }
) {
	const rss = await parse(`https://medium.com/feed/@${params.username}`)
	console.log(rss)
	return NextResponse.json(rss)
}
