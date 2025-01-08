"use server"
import { prisma } from "@/lib/prisma"
import { getDbUserId } from "./userAction"
export async function getNotfications() {
    try {
        const userId = await getDbUserId()
        if (!userId) return []
        
        const notifications = await prisma.notification.findMany({
            where: {
                userId
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        name: true,
                        username: true,
                        image: true
                    }
                }, post: {
                    select: {
                        id: true,
                        content: true,
                        image: true
                    }
                },
                comment: {
                    select: {
                        id: true,
                        content: true,
                        createdAt: true
                    }
                }
            }
        });
        return notifications;

    } catch (error) {
        console.log("something went wrong while fetcchinng notification")
        throw new Error("Something went wrong while sending notifications")
    }
    
}

export async function markReadNotifications(notificationId: string[]) {
    try {
        await prisma.notification.updateMany({
            where: {
                id: {
                    in:notificationId
                }
            },
            data: {
                read:true
            }
        })
        return {success:true}
    } catch (error) {
        console.log("Error while marking read to the notifications ")
    }

    
}