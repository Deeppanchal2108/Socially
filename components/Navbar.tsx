
import React from 'react'
import DesktopNavbar from './DesktopNavbar'
import MobileNavbar from './MobileNavbar'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { syncAction } from '@/actions/syncAction'
 async function Navbar() {
   const user = await currentUser()
   if(user) await syncAction()
  return (
      <div className='sticky top-0 border-b  '>
      <div className='flex justify-around h-16 items-center '>
        
              <div className='flex items-center'>
                  <Link href={"/"} className=' text-xl lg:text-2xl font-mono tracking-tighter text-primary font-bold '>Socially</Link>
              </div>
        <div className='flex items-center'>
          <DesktopNavbar/>
          <MobileNavbar />
              </div>
          </div>
          
          
    </div>
  )
}

export default Navbar
