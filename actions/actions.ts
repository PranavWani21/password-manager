"use server"



import { NextRequest } from 'next/server'
import { clerkClient } from '@clerk/nextjs/server'

interface Card{
    cardNo:string,
    expiry:string,
    cvv:number
}

interface Passwords{
  website:string,
  username:string,
  pass:string
}

export async function addCardServer(cardNo:string, expiry:string, cvv:number, userId:string) {
  const client = await clerkClient()

  const user = await client.users.getUser(userId)

  let cards: Card [] = []

  if(Array.isArray(user.privateMetadata.cards)){

       cards=user.privateMetadata.cards || []
      cards.push({cardNo,expiry,cvv})

      await client.users.updateUserMetadata(userId, {
        privateMetadata: {
         cards:cards,
        },
      })
  }

  else{
    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
       cards:[{cardNo,expiry,cvv}],
      },
    })
  }

  

}



export async function addPasswordServer(website:string, username:string, pass:string, userId:string) {
  const client = await clerkClient()

  const user = await client.users.getUser(userId)

  let passwords: Passwords [] = []

  if(Array.isArray(user.privateMetadata.passwords)){

       passwords=user.privateMetadata.passwords || []
      passwords.push({website,username,pass})

      await client.users.updateUserMetadata(userId, {
        privateMetadata: {
         passwords:passwords,
        },
      })
  }
  else{
    await client.users.updateUserMetadata(userId, {
      privateMetadata: {
       passwords:[{website,username,pass}],
      },
    })
  }
  

}