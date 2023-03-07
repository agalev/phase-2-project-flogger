import { parse } from 'rss-to-json'
import { NextResponse } from 'next/server'

export async function GET(
	request: Request,
	{ params }: { params: { username: string } }
) {
	const rss = await parse(`https://medium.com/feed/@${params.username}`)
	// Add user's articles to 'feed' table
	// Error handling is not implemented
	// Errors will be thrown if the item already exists in the database
	// This is a hacky way to do it, but it works for now
	rss.items.forEach((rssitem) => {
		fetch('http://localhost:3001/feed', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...rssitem,
				image: rss.image,
				id: rssitem.published
			})
		})
	})
	return NextResponse.json(rss)
}
