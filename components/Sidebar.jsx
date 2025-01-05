import React from 'react'
import { currentUser } from '@clerk/nextjs/server'
import Unauthcard from './Unauthcard'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { MapPin } from 'lucide-react'
import { SquareArrowOutUpRight } from 'lucide-react'
import { Separator } from "@/components/ui/separator"
import { getUserData } from '@/actions/syncAction'
import Link from 'next/link'
async function Sidebar() {
    const user = await currentUser()
    if (!user) {
        return <Unauthcard/>
    }
    const userData = await getUserData(user.id);

console.log(userData)
  return (
      <Card className='px-2 sticky top-20'>
          <CardHeader >
              <Link href={`/profile/${userData.username}`} passHref>
              <div className='flex gap-y-3 justify-center flex-col items-center'>
              <Avatar className='w-24 h-24'>
                  <AvatarImage   src={userData.image} />
                  <AvatarFallback>User pfp</AvatarFallback>
              </Avatar>

                      <CardTitle className='text-2xl'>{userData.name }</CardTitle>
                      <CardDescription>{userData.username}</CardDescription>
                  </div>
              </Link>
          </CardHeader>
          <Separator />
          <CardContent>
              <div className=' flex items-center justify-between mt-4'>
                  <p>{userData._count.followers } Followers</p>
                  <p>{ userData._count.following} Following</p>

              </div>
          </CardContent>
            <Separator />
          <CardFooter>
              <div  className='flex flex-col pt-4 px-2'>
                  
              
                  <p className='font-sans text-base font-normal flex items-center gap-x-2'>
                      <MapPin size={20} />{userData.location ? userData.location : "No location"}</p>
                  <p className='font-sans text-base font-normal flex items-center gap-x-2'>
                      <SquareArrowOutUpRight size={18} />{userData.website ? userData.website : "No Website"}</p>
              </div>

          </CardFooter>
      </Card>

  )
}

export default Sidebar
