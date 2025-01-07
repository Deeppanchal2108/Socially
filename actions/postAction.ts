"use server"

import { prisma } from "@/lib/prisma";
export interface PostContent{
    userId: string ,
    caption:string
}
export async function addPost(content: PostContent) {
    try {
        const { userId, caption } = content;
        // console.log("here is the content : ", content)
        // console.log("User id: ", userId)
        // console.log("caption: ",caption)
       const  post = await prisma.post.create({
            data: {
                authorId: userId,
                content:caption
            }
       })
        // console.log("Post : ",post)
        return {success:true, message: "Post added successfully" };
        
    } catch (error) {
        // console.log(error)
        return { success: false, message: "Something went wrong" };

    }
    
}

export async function getPosts() {
    try {
        const posts = await prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        image: true,
                        username: true,
                    },
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                username: true,
                                image: true,
                                name: true,
                            },
                        },
                    },
                    orderBy: {
                        createdAt: "asc",
                    },
                },
                likes: {
                    select: {
                        userId: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
        });

        return posts;
    } catch (error) {
        console.log("Error in getPosts", error);
        throw new Error("Failed to fetch posts");
    }
}