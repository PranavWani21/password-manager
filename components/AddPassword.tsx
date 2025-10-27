"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useUser } from "@clerk/nextjs"
import { addPasswordServer } from "@/actions/actions"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
// import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  website: z.string().url({ message: "Please enter a valid URL" }),
  username: z.string().min(2, { message: "Username must be at least 2 characters" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
})

export default function AddPassword() {
  const user = useUser()
  const router=useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: "",
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Here you would typically send this data to a server
    console.log(values)
    // toast({
    //   title: "Password Added",
    //   description: "Your password has been successfully added.",
    // })
    if (user.user){
      console.log(user?.user?.id)
      addPasswordServer(values.website,values.username,values.password,user?.user?.id)
      toast.success("Password Added!")
    }
    form.reset()
    router.refresh()
  }

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-chart-3">
              Add Password
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

