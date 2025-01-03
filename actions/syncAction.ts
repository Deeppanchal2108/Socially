"use server"
import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { currentUser } from "@clerk/nextjs/server"
export async function syncAction() {
    try {
        const { userId} = await auth()
        const user = await currentUser()
        // console.log("User id : ", userId)
        // console.log("-----------------------------------------------------------------------------------------")
        // console.log("User : ", user)
        if (!userId || !user) {
            return {success:false,message:"User not found"}
        }
        const alreadyUser = await prisma.user.findUnique({
            where: {
                clerkId:userId
            }
        })
        if (alreadyUser) {
            return {success: false, message: "User already exists " }
        } 
        
        const newUser = await prisma.user.create({
            data: {
                clerkId: userId,
                email: user.emailAddresses[0].emailAddress,
                name: `${user.firstName || ""} ${user.lastName || ""}`,
                username:user.username?? user.emailAddresses[0].emailAddress.split("@")[0],
                image:user.imageUrl
            }
        })
        console.log("Done creating user")
        return { success: true, message: "Done",user:newUser }
    } catch (e) {
        return { success: false, message:"Error caught" }
    }
} 