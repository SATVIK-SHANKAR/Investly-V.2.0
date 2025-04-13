"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for global markets
const globalMarkets = [
  {
    name: "S&P 500",
    region: "United States",
    value: 4892.37,
    change: 0.87,
    yearToDate: 12.5,
  },
  {
    name: "NASDAQ",
    region: "United States",
    value: 15628.95,
    change: 1.24,
    yearToDate: 15.8,
  },
  {
    name: "FTSE 100",
    region: "United Kingdom",
    value: 7687.45,
    change: 0.32,
    yearToDate: 8.2,
  },
  {
    name: "DAX",
    region: "Germany",
    value: 17842.35,
    change: -0.45,
    yearToDate: 10.3,
  },
  {
    name: "Nikkei 225",
    region: "Japan",
    value: 38487.24,
    change: 1.78,
    yearToDate: 14.2,
  },
  {
    name: "Shanghai Composite",
    region: "China",
    value: 3089.76,
    change: -0.92,
    yearToDate: -5.8,
  },
  {
    name: "Hang Seng",
    region: "Hong Kong",
    value: 16589.32,
    change: -1.24,
    yearToDate: -3.2,
  },
  {
    name: "ASX 200",
    region: "Australia",
    value: 7642.18,
    change: 0.56,
    yearToDate: 9.7,
  },
]

export default function GlobalMarkets() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className="h-32 bg-slate-100 dark:bg-slate-800 animate-pulse rounded"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {globalMarkets.map((market) => (
        <Card
          key={market.name}
          className={`overflow-hidden border-l-4 ${market.change > 0 ? "border-l-emerald-500" : "border-l-rose-500"}`}
        >
          <CardContent className="p-4">
            <div className="font-medium">{market.name}</div>
            <div className="text-sm text-muted-foreground mb-2">{market.region}</div>

            <div className="flex justify-between items-center mb-2">
              <div className="text-xl font-bold">{market.value.toLocaleString()}</div>
              <div className={`flex items-center text-sm ${market.change > 0 ? "text-emerald-500" : "text-rose-500"}`}>
                {market.change > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                {Math.abs(market.change)}%
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>YTD Performance</span>
                <span className={market.yearToDate > 0 ? "text-emerald-500" : "text-rose-500"}>
                  {market.yearToDate > 0 ? "+" : ""}
                  {market.yearToDate}%
                </span>
              </div>
              <Progress
                value={50 + market.yearToDate}
                className={`h-1.5 ${
                  market.yearToDate > 0 ? "bg-emerald-100 dark:bg-emerald-900" : "bg-rose-100 dark:bg-rose-900"
                }`}
                indicatorClassName={`${market.yearToDate > 0 ? "bg-emerald-500" : "bg-rose-500"}`}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
