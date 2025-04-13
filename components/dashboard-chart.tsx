"use client"

import { useState, useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

// Generate mock data for portfolio performance
const generateChartData = (days = 30, trend = "up", volatility = 0.5) => {
  const data = []
  let portfolioValue = 10000
  let benchmarkValue = 10000

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  for (let i = 0; i <= days; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    // Portfolio change with some randomness
    const portfolioChange = (Math.random() - (trend === "up" ? 0.4 : 0.6)) * volatility * 2
    portfolioValue = portfolioValue * (1 + portfolioChange / 100)

    // Benchmark change with less volatility
    const benchmarkChange = (Math.random() - (trend === "up" ? 0.45 : 0.55)) * volatility
    benchmarkValue = benchmarkValue * (1 + benchmarkChange / 100)

    data.push({
      date: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      portfolio: Number.parseFloat(portfolioValue.toFixed(2)),
      benchmark: Number.parseFloat(benchmarkValue.toFixed(2)),
    })
  }

  return data
}

// Generate data for different time periods
const chartData = {
  "1W": generateChartData(7, "up", 0.3),
  "1M": generateChartData(30, "up", 0.5),
  "3M": generateChartData(90, "up", 0.7),
  "1Y": generateChartData(365, "up", 1),
  ALL: generateChartData(730, "up", 1.2),
}

export default function DashboardChart({ period }: { period: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-full h-full bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg"></div>
  }

  const data = chartData[period] || chartData["1M"]

  // Calculate performance metrics
  const firstPortfolioValue = data[0].portfolio
  const lastPortfolioValue = data[data.length - 1].portfolio
  const portfolioPerformance = ((lastPortfolioValue - firstPortfolioValue) / firstPortfolioValue) * 100

  const firstBenchmarkValue = data[0].benchmark
  const lastBenchmarkValue = data[data.length - 1].benchmark
  const benchmarkPerformance = ((lastBenchmarkValue - firstBenchmarkValue) / firstBenchmarkValue) * 100

  return (
    <div className="h-full">
      <div className="flex justify-between mb-4">
        <div>
          <div className="text-sm text-muted-foreground">Portfolio Performance</div>
          <div className="text-2xl font-bold text-cyan-600">{portfolioPerformance.toFixed(2)}%</div>
        </div>
        <div>
          <div className="text-sm text-muted-foreground">Benchmark (S&P 500)</div>
          <div className="text-2xl font-bold text-slate-600 dark:text-slate-400">
            {benchmarkPerformance.toFixed(2)}%
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: "#374151", opacity: 0.2 }}
            axisLine={{ stroke: "#374151", opacity: 0.2 }}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickLine={{ stroke: "#374151", opacity: 0.2 }}
            axisLine={{ stroke: "#374151", opacity: 0.2 }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            formatter={(value) => [`$${Number(value).toLocaleString()}`, undefined]}
            contentStyle={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "0.5rem",
              border: "none",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
            labelStyle={{ fontWeight: "bold" }}
          />
          <Legend />
          <Line
            name="Portfolio"
            type="monotone"
            dataKey="portfolio"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#0ea5e9", stroke: "#fff", strokeWidth: 2 }}
            animationDuration={1000}
          />
          <Line
            name="Benchmark"
            type="monotone"
            dataKey="benchmark"
            stroke="#94a3b8"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 6, fill: "#94a3b8", stroke: "#fff", strokeWidth: 2 }}
            animationDuration={1000}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
