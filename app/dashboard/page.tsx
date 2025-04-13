import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUp, BarChart3, DollarSign, TrendingUp, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DashboardChart from "@/components/dashboard-chart"
import MarketSummary from "@/components/market-summary"
import WatchlistTable from "@/components/watchlist-table"
import PortfolioSummary from "@/components/portfolio-summary"
import EconomicIndicators from "@/components/economic-indicators"

export default function DashboardPage() {
  return (
    <div className="container max-w-7xl mx-auto p-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your investments.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/markets">View Markets</Link>
          </Button>
          <Button asChild>
            <Link href="/portfolio">Manage Portfolio</Link>
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="border-l-4 border-l-cyan-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,685.72</div>
            <div className="flex items-center text-sm text-emerald-500 pt-1">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>8.2%</span>
              <span className="text-muted-foreground ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Return</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,452.18</div>
            <div className="flex items-center text-sm text-emerald-500 pt-1">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>16.4%</span>
              <span className="text-muted-foreground ml-1">all time</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Cash Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,324.00</div>
            <div className="flex items-center text-sm text-slate-500 pt-1">
              <span>Available to invest</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Market Trend</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Bullish</div>
            <div className="flex items-center text-sm text-emerald-500 pt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>S&P 500 +1.2% today</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Portfolio Performance */}
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Track your investment growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="1M">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="1W">1W</TabsTrigger>
                    <TabsTrigger value="1M">1M</TabsTrigger>
                    <TabsTrigger value="3M">3M</TabsTrigger>
                    <TabsTrigger value="1Y">1Y</TabsTrigger>
                    <TabsTrigger value="ALL">ALL</TabsTrigger>
                  </TabsList>
                  <div className="flex items-center text-sm font-medium">
                    <div className="flex items-center mr-4">
                      <div className="w-3 h-3 rounded-full bg-cyan-500 mr-1"></div>
                      <span>Portfolio</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600 mr-1"></div>
                      <span>Benchmark</span>
                    </div>
                  </div>
                </div>

                <TabsContent value="1W">
                  <div className="h-[350px]">
                    <DashboardChart period="1W" />
                  </div>
                </TabsContent>
                <TabsContent value="1M">
                  <div className="h-[350px]">
                    <DashboardChart period="1M" />
                  </div>
                </TabsContent>
                <TabsContent value="3M">
                  <div className="h-[350px]">
                    <DashboardChart period="3M" />
                  </div>
                </TabsContent>
                <TabsContent value="1Y">
                  <div className="h-[350px]">
                    <DashboardChart period="1Y" />
                  </div>
                </TabsContent>
                <TabsContent value="ALL">
                  <div className="h-[350px]">
                    <DashboardChart period="ALL" />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Portfolio Summary</CardTitle>
              <CardDescription>Asset allocation and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <PortfolioSummary />
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Market Data & Watchlist */}
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Market Summary</CardTitle>
              <CardDescription>Major indices and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <MarketSummary />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Watchlist</CardTitle>
                <CardDescription>Stocks you're monitoring</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/markets">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <WatchlistTable />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Economic Indicators</CardTitle>
              <CardDescription>Key economic metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <EconomicIndicators />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
