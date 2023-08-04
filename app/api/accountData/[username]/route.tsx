import { parse } from 'rss-to-json'
import { NextResponse } from 'next/server'

export async function GET(
	request: Request,
	{ params }: { params: { username: string } }
) {
	const rss = await parse(`https://medium.com/feed/@${params.username}`)
	// Add user's articles to 'feed' table
	rss.items.forEach((rssitem) => {
		try {
			fetch('http://localhost:3001/feed', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...rssitem,
					image: rss.image,
					id: rssitem.published,
					likedBy: [],
					addedBy: params.username
				})
			})
		} catch (err) {
			console.log(err)
		}
	})
	return NextResponse.json(rss)
}
