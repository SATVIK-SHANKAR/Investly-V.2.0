"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"

// Mock data for market indices
const marketIndices = [
  {
    name: "S&P 500",
    value: 4892.37,
    change: 0.87,
    color: "emerald",
  },
  {
    name: "NASDAQ",
    value: 15628.95,
    change: 1.24,
    color: "emerald",
  },
  {
    name: "DOW",
    value: 38239.98,
    change: 0.56,
    color: "emerald",
  },
  {
    name: "RUSSELL",
    value: 2042.65,
    change: -0.32,
    color: "rose",
  },
  {
    name: "VIX",
    value: 14.32,
    change: -2.15,
    color: "emerald",
  },
  {
    name: "10Y TREASURY",
    value: 4.21,
    change: 0.05,
    color: "rose",
  },
]

export default function MarketSummary() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div key={idx} className="h-10 bg-slate-100 dark:bg-slate-800 animate-pulse rounded"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {marketIndices.map((index) => (
        <div
          key={index.name}
          className="flex justify-between items-center py-2 border-b border-slate-200 dark:border-slate-700 last:border-0"
        >
          <div>
            <div className="font-medium">{index.name}</div>
            <div className="text-sm text-muted-foreground">{index.name.includes("TREASURY") ? "Yield" : "Index"}</div>
          </div>
          <div className="text-right">
            <div className="font-medium">{index.value.toLocaleString()}</div>
            <div
              className={`flex items-center justify-end text-sm ${index.change > 0 ? "text-emerald-500" : "text-rose-500"}`}
            >
              {index.change > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              <span>{Math.abs(index.change)}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
