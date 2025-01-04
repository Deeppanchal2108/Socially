"use server"
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";

export async function syncAction() {
    try {
        const { userId } = await auth();
        const user = await currentUser();
        if (!userId || !user) {
            console.error("Missing userId or user data:", { userId, user });
            return { success: false, message: "User not found" };
        }
        console.log("Data for new user creation:", {
            clerkId: userId,
            email: user.emailAddresses[0]?.emailAddress,
            name: `${user.firstName || ""} ${user.lastName || ""}`,
            username: user.username ?? user.emailAddresses[0]?.emailAddress.split("@")[0],
            image: user.imageUrl,
        });
        
        const alreadyUser = await prisma.user.findUnique({
            where: { clerkId: userId }
        });
console.log("Already user:", alreadyUser);
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
