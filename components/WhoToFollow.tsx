import React from 'react'
import { getRandomUser } from '@/actions/userAction'
import { currentUser } from '@clerk/nextjs/server'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
 async function WhoToFollow() {
    const user = await currentUser();
     const randomUser = await getRandomUser(user?.id||"");

  return (
      <Card>
          
    </Card>
  )
}

export default WhoToFollow
