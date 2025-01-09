import React from 'react'
import { getRandomUser } from '@/actions/userAction'
import { currentUser } from '@clerk/nextjs/server'
import {
  Card,
 
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import FollowButton from './FollowButton'

import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

async function WhoToFollow() {
  const user = await currentUser();
  const randomUser = await getRandomUser(user?.id || "");

  return (
    <Card className=' sticky top-20'>
      <CardHeader>
        <CardTitle>Who to follow</CardTitle>
      </CardHeader>
      <div className=''>
        {
          randomUser.map((user) => (
            <div key={user.id} className='p-4 flex items-center justify-between'>
              <div className='flex items-center'>
              <div>
                <Avatar >
                  <AvatarImage src={user.image||undefined} />
                  <AvatarFallback>User pfp</AvatarFallback>
                </Avatar>
              </div>
              <div className='pl-2'>
                <h3 className="m-0">{user.name}</h3> {/* Reduces the bottom margin */}
                <h5 className='font-mono font-light text-sm m-0 opacity-50 -mt-1'>@{user.username}</h5> {/* Removes the top margin */}
                </div>
              </div>
              <div>
                <FollowButton userId={user.id} />
              </div>


           
            </div>
          ))
        }
      </div>

    </Card>
  )
}

export default WhoToFollow
