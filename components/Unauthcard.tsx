import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button" 
import { SignInButton,SignUpButton } from '@clerk/nextjs'
function Unauthcard() {
    return (
        <Card className='sticky top-20'>
            <CardHeader>
                <CardTitle className='text-center font-extrabold'>Welcome Back!</CardTitle>
                <CardDescription className='text-center'>Login to access your profile and connect with others</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-y-4'> 
                    <SignInButton mode="modal">
                    <Button variant={"outline"}>
                        LogIn
                    </Button>
                </SignInButton>
                    <SignUpButton mode="modal">
                    <Button>
                        SignUp
                    </Button>
                    </SignUpButton>
                </div>
            </CardContent>
            
        </Card>

  )
}

export default Unauthcard
