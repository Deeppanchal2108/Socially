import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { LogIn } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { SignedIn, SignInButton, SignedOut, SignOutButton } from "@clerk/nextjs";
import { CircleUser, Bell, Home } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { Menu } from 'lucide-react';
import ModeToggle from "@/components/MogeToggle";
import { currentUser } from '@clerk/nextjs/server';
async function MobileNavbar() {
    const user = await currentUser();
    return (
        <div className=' md:hidden flex  gap-x-2 '>
              <ModeToggle />
         
            <Sheet>
                <SheetTrigger><Menu /></SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Menu</SheetTitle>
                        <SheetDescription>
                            {user ? <div className='flex flex-col items-start px- gap-y-2'>
                                <Link href={"/"}>
                                    <Button variant={"ghost"}>
                                        <Home />
                                        Home
                                    </Button>
                                </Link>
                                <Link href={"/"}>
                                    <Button variant={"ghost"}>
                                        <Bell />
                                        Notifications
                                    </Button>
                                </Link>
                                <Link href={"/"}>
                                    <Button variant={"ghost"}>
                                        <CircleUser />
                                        Profile
                                    </Button>
                                </Link>
                                <SignedIn>
                                    <SignOutButton >
                                        <Button>
                                            <LogOut />
                                            Sign Out
                                        </Button>
                                    </SignOutButton>
                                </SignedIn>
                            </div> : <div className='flex flex-col items-start px- gap-y-2'>
                                <Link href={"/"}>
                                    <Button variant={"ghost"}>
                                        <Home />
                                        Home
                                    </Button>
                                </Link>
                                    <SignInButton mode="modal"><Button variant={"default"}>
                                        <LogIn />
                                    Sign In</Button></SignInButton>
                            </div>}
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default MobileNavbar
