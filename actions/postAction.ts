"use server"

import { prisma } from "@/lib/prisma";
export interface PostContent{
    userId: string ,
    caption:string
}
export async function addPost(content: PostContent) {
    try {
        const { userId, caption } = content;
        console.log("here is the content : ", content)
        console.log("User id: ", userId)
        console.log("caption: ",caption)
       const  post = await prisma.post.create({
            data: {
                authorId: userId,
                content:caption
            }
       })
        console.log("Post : ",post)
        return {success:true, message: "Post added successfully" };
        
    } catch (error) {
        console.log(error)
        return { success: false, message: "Something went wrong" };

    }
    
}
