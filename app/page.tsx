import AddCard from "@/components/AddCard";
import AddPassword from "@/components/AddPassword";
import DisplayCards from "@/components/DisplayCards";
import DisplayPasswords from "@/components/DisplayPasswords";
import Image from "next/image";
import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";

export const metadata:Metadata ={
  title:"Password Manager - Home",
  description:"Password manager homepage"
}


export default async function Home() {
  const user = await currentUser()
  console.log(user?.privateMetadata.cards)
  return (
    <div className="">
      <div className="flex justify-center items-center gap-10 p-8">
        {/* these two components will look side by side  */}
        <div>
        <h2 className="text-2xl font-semibold m-2">Add a New Credit Card</h2>
          <AddCard/>
        </div>
        <div>
        <h2 className="text-2xl font-semibold m-2">Add a Password</h2>
          <AddPassword/>
        </div>
      </div>

      <div className="flex justify-center items-center gap-10 p-8">
        {/* these two components visible side by side  */}
        <div>
          <h2 className="text-2xl font-semibold m-2">Your Cards</h2>
          <DisplayCards cards={Array.isArray( user?.privateMetadata.cards)?user?.privateMetadata.cards:[]}/>
        </div>
        <div>
          <h2 className="text-2xl font-semibold m-2">Your Passwords</h2>
          <DisplayPasswords passwords={Array.isArray(user?.privateMetadata.passwords)?user?.privateMetadata.passwords:[]}/>
        </div>
      </div>
    </div>
  );
}
