"use client"
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
// import React from 'react'
import Link from 'next/link'

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



const Navbar = () => {
  const { theme,setTheme } = useTheme()

  const toggelTheme=()=>{
    if (theme=='light'){
      setTheme('dark')
    }
    else if(theme=='dark'){
      setTheme('light')
    }
  }
  return (
    <nav className='flex justify-between items-center px-4 bg-chart-3   h-16'>
      <Link href={"/"}> <span className='text-white'>Password Manager</span> </Link>
      <ul className='flex gap-5 justify-start items-center text-white'>
        <li>Home</li>
        <li>About</li>
        <li>Services</li>
        <li>Contact</li>
      </ul>
      <div className='flex justify-center items-center p-2'>

        <div>
          {/* <DropdownMenu> */}
            {/* <DropdownMenuTrigger asChild> */}
              <Button variant="outline" size="icon" onClick={toggelTheme}>
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            {/* </DropdownMenuTrigger> */}
            {/* <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent> */}
          {/* </DropdownMenu> */}
        </div>


        <div className='mx-2 text-white'>

          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
