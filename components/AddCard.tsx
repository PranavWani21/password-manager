"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
// import { toast } from "@/components/ui/use-toast"
import toast, { Toaster } from 'react-hot-toast';
import { addCardServer } from "@/actions/actions"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits" }),
  cardHolder: z.string().min(2, { message: "Card holder name is required" }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Expiry date must be in MM/YY format" }),
  cvv:z.coerce.number().min(100,{message:"CVV must be at least 3 digits"}).max(9999,{message:"CVV cannot exceed 4 digits"}),

  // z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits" })s

  
})

export default function AddCard() {

  const router=useRouter()
  const user = useUser()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: 0,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) { 
    // Here you would typically send this data to a server
    console.log(values)
    // toast({
    //   title: "Card Added",
    //   description: "Your card has been successfully added.",
    // })
    if (user.user){
      console.log(user?.user?.id)
      addCardServer(values.cardNumber,values.expiryDate,values.cvv,user?.user?.id)
      toast.success("Card Added!")
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
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234567890123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardHolder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Holder</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Expiry Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>CVV</FormLabel>
                    <FormControl>
                      <Input placeholder="123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-chart-3">
              Add Card
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}

