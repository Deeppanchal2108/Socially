"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { toggleFollow } from '@/actions/userAction'
import toast from 'react-hot-toast'
function FollowButton({ userId }: { userId: string }) {
    const [isLoading,setIsLoading]=useState(false)
    const handleButton = async (e:any ) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            await toggleFollow(userId)
            toast.success("User followed successfully")

        } catch (error) {
            toast.error("Error while following the user")
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <div>
            <Button variant={'secondary'} onClick={(e)=>handleButton(e)}>
             Follow
            </Button>
        </div>
    )
}

export default FollowButton
