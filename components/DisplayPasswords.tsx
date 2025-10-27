import { Card, CardContent } from "@/components/ui/card"
import PasswordVisibility from "./PasswordVisibility"
import Link from "next/link"
import { Span } from "next/dist/trace"


interface PasswordProps {
  website:string,
  username:string,
  pass:string
}

export default async function DisplayPasswords({passwords}:{passwords : PasswordProps[]}) {
  

  return (
    <div className="space-y-4 w-72">
      {passwords.length === 0 && <span className="text-muted-foreground">No Passwords added</span>}
      {passwords.map((passwords:PasswordProps) => (
        <Card key={passwords.username}>
          <CardContent className="p-4">
            <Link href={passwords.website} target="_blank"> <p className="font-bold text-blue-600 underline">{passwords.website}</p> </Link> 
            <p>{passwords.username}</p>
            <PasswordVisibility password={passwords.pass} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

