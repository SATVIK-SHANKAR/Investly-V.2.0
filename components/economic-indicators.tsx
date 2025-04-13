"use client"

import { useState, useEffect } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Progress } from "@/components/ui/progress"

// Mock data for economic indicators
const economicData = [
  {
    name: "Inflation Rate",
    value: "3.2%",
    previous: "3.4%",
    trend: "down",
    status: "neutral",
  },
  {
    name: "Unemployment",
    value: "3.8%",
    previous: "3.7%",
    trend: "up",
    status: "negative",
  },
  {
    name: "GDP Growth",
    value: "2.1%",
    previous: "1.8%",
    trend: "up",
    status: "positive",
  },
  {
    name: "Fed Rate",
    value: "5.5%",
    previous: "5.5%",
    trend: "stable",
    status: "neutral",
  },
]

export default function EconomicIndicators() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((idx) => (
          <div key={idx} className="h-12 bg-slate-100 dark:bg-slate-800 animate-pulse rounded"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {economicData.map((indicator) => (
        <div key={indicator.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="font-medium">{indicator.name}</div>
            <div className="flex items-center">
              <span className="font-bold mr-2">{indicator.value}</span>
              <div
                className={`flex items-center text-xs ${
                  indicator.trend === "up" && indicator.status === "positive"
                    ? "text-emerald-500"
                    : indicator.trend === "up" && indicator.status === "negative"
                      ? "text-rose-500"
                      : indicator.trend === "down" && indicator.status === "positive"
                        ? "text-emerald-500"
                        : indicator.trend === "down" && indicator.status === "negative"
                          ? "text-rose-500"
                          : "text-slate-500"
                }`}
              >
                {indicator.trend === "up" ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : indicator.trend === "down" ? (
                  <ArrowDown className="h-3 w-3 mr-1" />
                ) : null}
                <span>from {indicator.previous}</span>
              </div>
            </div>
          </div>
          <Progress
            value={Number.parseFloat(indicator.value) * 10}
            className={`h-2 ${
              indicator.status === "positive"
                ? "bg-emerald-100 dark:bg-emerald-900"
                : indicator.status === "negative"
                  ? "bg-rose-100 dark:bg-rose-900"
                  : "bg-slate-100 dark:bg-slate-700"
            }`}
            indicatorClassName={`${
              indicator.status === "positive"
                ? "bg-emerald-500"
                : indicator.status === "negative"
                  ? "bg-rose-500"
                  : "bg-cyan-500"
            }`}
          />
        </div>
      ))}
    </div>
  )
}
