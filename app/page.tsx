import Post from "./components/Post";
import prisma from "@/lib/prisma";

async function fetchFeed() {
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: {name: true},
      }
    },
  })
  return feed
}

export default async function Home() {
  const feed = await fetchFeed();
  return <div className="page">
    {feed.map((post) => (
      <div key={post.id}>
        <Post post={post} />
      </div>
    ))}
  </div>
}
