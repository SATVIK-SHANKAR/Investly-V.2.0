"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for sector performance
const sectorData = {
  "1D": [
    { name: "Technology", value: 1.2 },
    { name: "Healthcare", value: 0.5 },
    { name: "Financials", value: -0.3 },
    { name: "Consumer", value: 0.8 },
    { name: "Energy", value: -1.2 },
    { name: "Utilities", value: 0.2 },
    { name: "Materials", value: -0.7 },
    { name: "Industrials", value: 0.4 },
    { name: "Real Estate", value: -0.5 },
    { name: "Communication", value: 0.9 },
  ],
  "1W": [
    { name: "Technology", value: 3.5 },
    { name: "Healthcare", value: 1.8 },
    { name: "Financials", value: -0.9 },
    { name: "Consumer", value: 2.3 },
    { name: "Energy", value: -2.7 },
    { name: "Utilities", value: 0.5 },
    { name: "Materials", value: -1.5 },
    { name: "Industrials", value: 1.2 },
    { name: "Real Estate", value: -1.8 },
    { name: "Communication", value: 2.7 },
  ],
  "1M": [
    { name: "Technology", value: 5.8 },
    { name: "Healthcare", value: 3.2 },
    { name: "Financials", value: 1.5 },
    { name: "Consumer", value: 4.1 },
    { name: "Energy", value: -4.3 },
    { name: "Utilities", value: 1.2 },
    { name: "Materials", value: -2.8 },
    { name: "Industrials", value: 2.5 },
    { name: "Real Estate", value: -3.2 },
    { name: "Communication", value: 4.5 },
  ],
  YTD: [
    { name: "Technology", value: 12.5 },
    { name: "Healthcare", value: 7.8 },
    { name: "Financials", value: 5.2 },
    { name: "Consumer", value: 9.3 },
    { name: "Energy", value: -8.7 },
    { name: "Utilities", value: 3.5 },
    { name: "Materials", value: -5.2 },
    { name: "Industrials", value: 6.8 },
    { name: "Real Estate", value: -7.5 },
    { name: "Communication", value: 10.2 },
  ],
}

export default function SectorPerformance() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("1D")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-[400px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded"></div>
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="1D">1 Day</TabsTrigger>
          <TabsTrigger value="1W">1 Week</TabsTrigger>
          <TabsTrigger value="1M">1 Month</TabsTrigger>
          <TabsTrigger value="YTD">Year to Date</TabsTrigger>
        </TabsList>

        {Object.keys(sectorData).map((period) => (
          <TabsContent key={period} value={period} className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sectorData[period].sort((a, b) => b.value - a.value)}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={["dataMin", "dataMax"]} />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip
                  formatter={(value) => [`${value > 0 ? "+" : ""}${value}%`, "Performance"]}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderRadius: "0.5rem",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  }}
                />
                <Bar dataKey="value">
                  {sectorData[period].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.value >= 0 ? "#10b981" : "#ef4444"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
