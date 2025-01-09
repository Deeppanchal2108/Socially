"use server"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function getProfileByUsername(username: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            },
            select: {
                id: true,
                name: true,
                username: true,
                bio: true,
                image: true,
                location: true,
                website: true,
                createdAt: true,
                _count: {
                    select: {
                        followers: true,
                        following: true,
                        posts: true
                    }
                }
            }
        })
        return user;
    } catch (error) {
        console.log("Somehting went wrong")
        throw new Error("Something went wrong while fetching data for the profile ")
    }

}


export async function getUserPosts(userId: string) {
    try {
        const posts = await prisma.post.findMany({
            where: {
                authorId: userId
            },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image:true
                    },
                }
                , comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                image: true
                            },
                        }
                    }, orderBy: {
                        createdAt:"desc"
                    }
                },
                likes: {
                    select: {
                        userId:true
                    }
                }
                ,
                _count: {
                    select: {
                        likes: true,
                        comments:true
                    }
                }
            },
            orderBy: {
                createdAt:"desc"
            }
        })
        return posts;
        

    } catch (error) {
        console.log("Somehting went wrong")
        throw new Error("Something went wrong while fetching data for the profile Posts ")
    }
}

export async function getUserLikedPosts(userId: string) {
    try {
        const likedPosts = await prisma.post.findMany({
            where: {
                likes: {
                    some: {
                        userId
                    }
                }
            },
              include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true
                    },
                }
                , comments: {
                    include: {
                        author: {
                            select: {
                                id: true,
                                name: true,
                                username: true,
                                image: true
                            },
                        }
                    }, orderBy: {
                        createdAt: "desc"
                    }
                },
                likes: {
                    select: {
                        userId: true
                    }
                }
                ,
                _count: {
                    select: {
                        likes: true,
                        comments: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return likedPosts;
    } catch (error) {
        console.log("Somehting went wrong")
        throw new Error("Something went wrong while fetching data for the User liked posts ")
    }
    
}