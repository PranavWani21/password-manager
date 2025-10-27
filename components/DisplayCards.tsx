import { Card, CardContent } from "@/components/ui/card"
import { Span } from "next/dist/trace"


interface CardProps{
  cardNo:string,
  expiry:string,
  cvv:number
}

export default async function DisplayCards({cards}:{cards : CardProps[]}) {
  

  return (
    <div className="space-y-4 w-80">
      {cards.length === 0 && <span className="text-muted-foreground"> No cards added </span> }
      {cards.map((card:CardProps) => (
        <Card key={card.cardNo}>
          <CardContent className="p-4">
            <p className="font-bold">{card.cardNo}</p>
            <p>{card.cvv}</p>
            <p>Expires: {card.expiry}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

