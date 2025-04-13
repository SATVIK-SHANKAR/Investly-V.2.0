"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { PieChartIcon as ChartPie, Waves, BarChart, PieChartIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Update the COLORS array with more vibrant colors
const COLORS = ["#7c5dfa", "#38bec9", "#f4a261", "#10b981", "#e11d48", "#0ea5e9", "#8b5cf6", "#ec4899"]

const riskMetrics = {
  low: {
    volatility: 2,
    return: 3,
    liquidity: 5,
    diversification: 4,
    timeHorizon: 5,
  },
  medium: {
    volatility: 3,
    return: 4,
    liquidity: 4,
    diversification: 3,
    timeHorizon: 3,
  },
  high: {
    volatility: 5,
    return: 5,
    liquidity: 3,
    diversification: 2,
    timeHorizon: 2,
  },
}

// Generate mock historical data for each stock
const generateHistoricalData = (symbol, days = 30, trend = "up") => {
  const data = []
  let value = trend === "up" ? 100 : 150

  for (let i = 0; i < days; i++) {
    const change = (Math.random() - (trend === "up" ? 0.4 : 0.6)) * 5
    value = Math.max(50, value + change)
    data.push({
      date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      value: Number.parseFloat(value.toFixed(2)),
    })
  }

  return data
}

export function PortfolioResults({ data }) {
  const [activeTab, setActiveTab] = useState("table")
  const [mounted, setMounted] = useState(false)
  const [selectedStock, setSelectedStock] = useState(null)

  useEffect(() => {
    setMounted(true)
    if (data?.breakdown?.length > 0) {
      setSelectedStock(data.breakdown[0].symbol)
    }
  }, [data])

  if (!mounted || !data || !data.breakdown) {
    return <div>No portfolio data available</div>
  }

  const { total, currency, risk, breakdown } = data

  const pieData = breakdown.map((item) => ({
    name: item.symbol,
    value: item.allocated,
  }))

  const totalAllocated = breakdown.reduce((sum, item) => sum + item.allocated, 0)
  const remaining = Number.parseFloat((total - totalAllocated).toFixed(2))

  const radarData = [
    { subject: "Volatility", A: riskMetrics[risk].volatility, fullMark: 5 },
    { subject: "Return Potential", A: riskMetrics[risk].return, fullMark: 5 },
    { subject: "Liquidity", A: riskMetrics[risk].liquidity, fullMark: 5 },
    { subject: "Diversification", A: riskMetrics[risk].diversification, fullMark: 5 },
    { subject: "Time Horizon", A: riskMetrics[risk].timeHorizon, fullMark: 5 },
  ]

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  // Generate historical data for the selected stock
  const stockHistoricalData = selectedStock
    ? generateHistoricalData(selectedStock, 30, Math.random() > 0.5 ? "up" : "down")
    : []

  // Enhanced return statement with more colorful elements
  return (
    <div id="portfolio-results" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 relative col-span-1">
          <div className="absolute inset-0 opacity-10 card-gradient-2"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-light to-primary"></div>
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <ChartPie className="h-4 w-4 text-purple-light" />
              Total Investment
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-light to-primary">
              {formatCurrency(total)}
            </div>
            <div className="flex items-center mt-1">
              <Badge className="bg-gradient-to-r from-purple-light to-primary border-none text-white">
                {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
              </Badge>
              <span className="text-xs text-muted-foreground ml-2">Portfolio</span>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 relative col-span-1">
          <div className="absolute inset-0 opacity-10 card-gradient-4"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-light to-emerald-light"></div>
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Waves className="h-4 w-4 text-teal-light" />
              Remaining Funds
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-light to-emerald-light">
              {formatCurrency(remaining)}
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-light to-emerald-light rounded-full"
                style={{ width: `${((remaining / total) * 100).toFixed(2)}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {((remaining / total) * 100).toFixed(2)}% of total available
            </p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 relative col-span-1">
          <div className="absolute inset-0 opacity-10 card-gradient-3"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-light to-amber-dark"></div>
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart className="h-4 w-4 text-amber-light" />
              Allocation Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-light to-amber-dark">
                {breakdown.length}
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">Assets</div>
                <div className="text-xs text-muted-foreground">Diversified Portfolio</div>
              </div>
            </div>
            <div className="flex mt-2 space-x-1">
              {COLORS.slice(0, breakdown.length).map((color, i) => (
                <div key={i} className="h-2 rounded-full flex-1" style={{ backgroundColor: color }}></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1 gradient-border">
        <CardHeader className="pb-2">
          <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-purple-light via-primary to-teal-light flex items-center">
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3M21 7L15.5657 12.4343C15.3677 12.6323 15.2687 12.7313 15.1545 12.7684C15.0541 12.8011 14.9459 12.8011 14.8455 12.7684C14.7313 12.7313 14.6323 12.6323 14.4343 12.4343L12.5657 10.5657C12.3677 10.3677 12.2687 10.2687 12.1545 10.2316C12.0541 10.1989 11.9459 10.1989 11.8455 10.2316C11.7313 10.2687 11.6323 10.3677 11.4343 10.5657L7 15"
                stroke="url(#gradient-stroke)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="gradient-stroke" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7c5dfa" />
                  <stop offset="0.5" stopColor="#0ea5e9" />
                  <stop offset="1" stopColor="#38bec9" />
                </linearGradient>
              </defs>
            </svg>
            Portfolio Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-slate-100 dark:bg-slate-800">
              {["table", "pie", "radar", "chart"].map((tab, index) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-light data-[state=active]:to-teal-light data-[state=active]:text-white"
                >
                  {tab === "table" && <BarChart className="h-4 w-4" />}
                  {tab === "pie" && <PieChartIcon className="h-4 w-4" />}
                  {tab === "radar" && (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 2V12L19 19" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M12 12L5 5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                  {tab === "chart" && <Waves className="h-4 w-4" />}
                  <span className="hidden sm:inline">
                    {tab === "table"
                      ? "Table"
                      : tab === "pie"
                        ? "Allocation"
                        : tab === "radar"
                          ? "Risk Profile"
                          : "Stock Chart"}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="table" className="mt-0 pt-2">
              <div className="animate-fade-in">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50 dark:bg-slate-800/50">
                      <TableHead>Symbol</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Shares</TableHead>
                      <TableHead className="text-right">Allocated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {breakdown.map((item, index) => (
                      <TableRow
                        key={item.symbol}
                        className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        onClick={() => setSelectedStock(item.symbol)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            {item.symbol}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                        <TableCell className="text-right">{item.shares.toFixed(4)}</TableCell>
                        <TableCell className="text-right">{formatCurrency(item.allocated)}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-slate-50 dark:bg-slate-800/50 font-medium">
                      <TableCell>Total</TableCell>
                      <TableCell className="text-right"></TableCell>
                      <TableCell className="text-right"></TableCell>
                      <TableCell className="text-right">{formatCurrency(totalAllocated)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="pie" className="mt-0 pt-2">
              <div className="animate-fade-in h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      animationBegin={0}
                      animationDuration={1200}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(value)}
                      labelFormatter={(name) => `Symbol: ${name}`}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="radar" className="mt-0 pt-2">
              <div className="animate-fade-in h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} />
                    <Radar
                      name={`${risk.charAt(0).toUpperCase() + risk.slice(1)} Risk Profile`}
                      dataKey="A"
                      stroke="#7c5dfa"
                      fill="#7c5dfa"
                      fillOpacity={0.6}
                      animationBegin={0}
                      animationDuration={1200}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>

            <TabsContent value="chart" className="mt-0 pt-2">
              <div className="animate-fade-in">
                <div className="mb-4">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Select Stock:</label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {breakdown.map((item, index) => (
                      <button
                        key={item.symbol}
                        onClick={() => setSelectedStock(item.symbol)}
                        className={`px-3 py-1 text-sm rounded-full transition-all duration-300 ${
                          selectedStock === item.symbol
                            ? "bg-gradient-to-r from-purple-light to-teal-light text-white shadow-md"
                            : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
                        }`}
                      >
                        {item.symbol}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stockHistoricalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7c5dfa" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#38bec9" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="value"
                        name={selectedStock}
                        stroke="#7c5dfa"
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        animationBegin={0}
                        animationDuration={1200}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
