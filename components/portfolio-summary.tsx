"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDown, ArrowUp } from "lucide-react"

// Mock data for portfolio allocation
const portfolioData = [
  { name: "Stocks", value: 15250, change: 2.3, allocation: 62 },
  { name: "Bonds", value: 5125, change: 0.5, allocation: 21 },
  { name: "Cash", value: 2450, change: 0, allocation: 10 },
  { name: "Crypto", value: 1860, change: -3.2, allocation: 7 },
]

const COLORS = ["#0ea5e9", "#0284c7", "#0369a1", "#0c4a6e"]

export default function PortfolioSummary() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[250px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded"></div>
        <div className="h-[250px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded"></div>
      </div>
    )
  }

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Asset Allocation</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolioData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {portfolioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`$${Number(value).toLocaleString()}`, "Value"]}
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  borderRadius: "0.5rem",
                  border: "none",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Holdings</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asset Class</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">Allocation</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolioData.map((asset) => (
              <TableRow key={asset.name}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: COLORS[portfolioData.indexOf(asset) % COLORS.length] }}
                    ></div>
                    {asset.name}
                  </div>
                </TableCell>
                <TableCell className="text-right">${asset.value.toLocaleString()}</TableCell>
                <TableCell
                  className={`text-right ${asset.change > 0 ? "text-emerald-500" : asset.change < 0 ? "text-rose-500" : "text-slate-500"}`}
                >
                  <div className="flex items-center justify-end">
                    {asset.change > 0 ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : asset.change < 0 ? (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    ) : null}
                    {Math.abs(asset.change)}%
                  </div>
                </TableCell>
                <TableCell className="text-right">{asset.allocation}%</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell className="font-bold">Total</TableCell>
              <TableCell className="text-right font-bold">${totalValue.toLocaleString()}</TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right font-bold">100%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
