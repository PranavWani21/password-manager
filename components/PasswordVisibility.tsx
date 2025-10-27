"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

export default function PasswordVisibility({ password }: { password: string }) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="flex items-center justify-between">
      <p>{isVisible ? password : "••••••••"}</p>
      <Button variant="ghost" size="icon" onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? <EyeOff size={16} /> : <Eye size={16} />}
      </Button>
    </div>
  )
}

