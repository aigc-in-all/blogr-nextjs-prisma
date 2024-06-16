'use client'

import prisma from "@/lib/prisma"
import { Post } from "@prisma/client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
    const { id } = useParams<{ id: string }>()
    const [data, setData] = useState<Post | null>(null);

    useEffect(() => {
        if (id) {
            fetchData(id)
        }
    }, [id])

    const fetchData = async (postId: string) => {
        const post = await prisma.post.findUnique({
            where: { id: postId },
        })
        setData(post)
    }
    return <div>
        <h1>Post: {data?.title}</h1>
        <p>{data?.content}</p>
    </div>
}