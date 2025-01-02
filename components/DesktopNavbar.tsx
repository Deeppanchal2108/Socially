
import React from 'react'
import Link from 'next/link';
import { CircleUser, Bell, Home } from 'lucide-react';
import { SignedIn, UserButton, SignInButton, SignedOut } from "@clerk/nextjs";
import { currentUser } from '@clerk/nextjs/server'
import ModeToggle from "@/components/MogeToggle";
import { Button } from './ui/button';

 async function DesktopNavbar() {
     const user = await currentUser();
  return (
      <div className='hidden md:block'>
          
          {
              user ? <div className=' flex gap-x-4'>
                  <ModeToggle />
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
                      <UserButton />
                  </SignedIn>

                  
              </div> : <div className=' flex gap-x-4'>
                      <ModeToggle />
                      <Link href={"/"}>
                          <Button variant={"ghost"}>
                              <Home />
                              Home
                          </Button>
                      </Link>
                      <SignedOut>
                          <SignInButton mode="modal"><Button variant={"outline"}>
                              Sign In</Button></SignInButton>
                      </SignedOut>
                  </div>
          }
    </div>
  )
}

export default DesktopNavbar
