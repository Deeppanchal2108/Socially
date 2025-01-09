"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function syncAction() {
    try {
        const { userId } = await auth();
        const user = await currentUser();
        if (!userId || !user) {
            console.error("Missing userId or user data:", { userId, user });
            return { success: false, message: "User not found" };
        }
        // console.log("Data for new user creation:", {
        //     clerkId: userId,
        //     email: user.emailAddresses[0]?.emailAddress,
        //     name: `${user.firstName || ""} ${user.lastName || ""}`,
        //     username: user.username ?? user.emailAddresses[0]?.emailAddress.split("@")[0],
        //     image: user.imageUrl,
        // });

        const alreadyUser = await prisma.user.findUnique({
            where: { clerkId: userId }
        });
        // console.log("Already user:", alreadyUser);
        if (alreadyUser) {
            return { success: false, message: "User already exists" };
        }

        console.log("Creating user");
        const newUser = await prisma.user.create({
            data: {
                clerkId: userId,
                email: user.emailAddresses[0].emailAddress,
                name: `${user.firstName || ""} ${user.lastName || ""}`,
                username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                image: user.imageUrl,
            },
        });
        console.log("Done creating user");
        return { success: true, message: "Done", user: newUser };
    } catch (e) {
        console.error("Error caught in syncAction:", e);
        return { success: false, message: "Error caught" };
    }
}

export async function getUserData(clerkId: string) {


    return await prisma.user.findUnique({
        where: { clerkId },
        include: {
            _count: {
                select: {
                    followers: true,
                    following: true,
                    posts: true,
                }
            }
        }
    });


}


export async function getUserId(clerkId: string) {
    const user = await prisma.user.findUnique({
        where: { clerkId }
    })
    if (!user?.id) {
        throw new Error("Something went wrong")
    }
    return user?.id;
}

export async function getRandomUser(clerkId: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { clerkId }
        })
        const id = user?.id;
        const users = await prisma.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: id
                        }
                    },
                    {
                        NOT: {
                            followers: {
                                some: {
                                    followerId: id
                                }
                            }
                        }
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                username: true,
                image: true,
                _count: {
                    select: {
                        followers:true
                    }
                }
            }
            ,take:3
        })
        // console.log("Fetched random users : ",users)
        return users;

    } catch (error) {
        console.log("Error in getting random user : ", error)
        return [];

    }

}

export async function getDbUserId() {
    const { userId: clerkId } = await auth();
    if (!clerkId) return null;

    const user = await getUserData(clerkId);

    if (!user) throw new Error("User not found");

    return user.id;
}

export async function toggleFollow(targetUserId: string) {
    try {
        const userId = await getDbUserId();

        if (!userId) return;

        if (userId === targetUserId) throw new Error("You cannot follow yourself");

        const existingFollow = await prisma.follows.findUnique({
            where: {
                followerId_followingId: {
                    followerId: userId,
                    followingId: targetUserId,
                },
            },
        });

        if (existingFollow) {
            // unfollow
            await prisma.follows.delete({
                where: {
                    followerId_followingId: {
                        followerId: userId,
                        followingId: targetUserId,
                    },
                },
            });
        } else {
            // follow
            await prisma.$transaction([
                prisma.follows.create({
                    data: {
                        followerId: userId,
                        followingId: targetUserId,
                    },
                }),

                prisma.notification.create({
                    data: {
                        type: "FOLLOW",
                        userId: targetUserId, // user being followed
                        creatorId: userId, // user following
                    },
                }),
            ]);
        }

        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.log("Error in toggleFollow", error);
        return { success: false, error: "Error toggling follow" };
    }
}