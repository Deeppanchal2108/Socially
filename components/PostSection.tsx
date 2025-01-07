"use client"
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import toast from 'react-hot-toast'
import { Separator } from "@/components/ui/separator"
import { Send, Image } from 'lucide-react'
import { PostContent } from '@/actions/postAction'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Button } from './ui/button'
import { getUserId } from '@/actions/userAction'
import { addPost } from '@/actions/postAction'
function PostSection() {
    const user = useUser()
    const [caption, setCaption] = useState("");
    const [imageUrl, setImageUrl] = useState("")
    const [showPhotoUpload, setShowPhotoUpload] = useState(false);
    const [isPosting, setIsPosting] = useState(false);
    const handle = async (e: any) => {
        try {
            console.log("inside thee fucntion call ")
            e.preventDefault();
            setIsPosting(true)
            const userId = user.user?.id;
            if (!userId) {
                throw new Error("User ID is required");
            }

            const result1 = await getUserId(userId);
            const detail: PostContent = {
                userId: result1,
                caption: caption
            }
            console.log("got userid ")
            const result = await addPost(detail);
            // console.log("Result : ", result)
            if (result.success) {
                console.log("Post added successfully ")
                toast.success('Posted successfully')
            } else {
                toast.error('Something went wrong')
                throw new Error("result not got")

            }

        } catch (error) {
            console.log("Error : ", error)
        } finally {
            setIsPosting(false)
            setCaption("")
            setImageUrl("")
        }
    }
    return (
        <Card className='p-4'>
            <CardContent className='flex gap-x-2 mt-3'>
                <Avatar >
                    <AvatarImage src={user.user?.imageUrl} />
                    <AvatarFallback>User pfp</AvatarFallback>
                </Avatar>
                <Textarea placeholder="What's on your mind?"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="border-0  focus:border-0 active:border-0 focus:ring-0 focus:ring-offset-0 focus:outline-none resize-none bg-transparent hover:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
            </CardContent>
            <Separator />
            <CardFooter className=' mt-4 -mb-4 flex items-center justify-between'>

                <Button className='' variant={"ghost"}>
                    <Image />
                    Photo
                </Button>

                <Button className='' variant={"default"}
                    disabled={caption === ""}
                    onClick={(e) => handle(e)}
                >
                    <Send />
                    Post
                </Button>

            </CardFooter>
        </Card>
    )
}

export default PostSection
