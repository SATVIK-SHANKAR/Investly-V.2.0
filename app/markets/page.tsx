import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, TrendingUp, Globe, Briefcase } from "lucide-react"
import Link from "next/link"
import MarketOverview from "@/components/market-overview"
import StockScreener from "@/components/stock-screener"
import GlobalMarkets from "@/components/global-markets"
import SectorPerformance from "@/components/sector-performance"

export default function MarketsPage() {
  return (
    <div className="container max-w-7xl mx-auto p-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Markets</h1>
          <p className="text-muted-foreground">Explore global markets, trends, and investment opportunities</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard">
              <Briefcase className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button asChild>
            <Link href="/portfolio">
              <TrendingUp className="mr-2 h-4 w-4" />
              Portfolio
            </Link>
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search for stocks, ETFs, indices..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Market Overview */}
      <div className="mb-8">
        <MarketOverview />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="screener" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="screener">Stock Screener</TabsTrigger>
          <TabsTrigger value="global">Global Markets</TabsTrigger>
          <TabsTrigger value="sectors">Sector Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="screener">
          <Card>
            <CardHeader>
              <CardTitle>Stock Screener</CardTitle>
              <CardDescription>Find stocks that match your investment criteria</CardDescription>
            </CardHeader>
            <CardContent>
              <StockScreener />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="global">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Globe className="mr-2 h-5 w-5 text-cyan-600" />
                <CardTitle>Global Markets</CardTitle>
              </div>
              <CardDescription>Performance of major global indices</CardDescription>
            </CardHeader>
            <CardContent>
              <GlobalMarkets />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sectors">
          <Card>
            <CardHeader>
              <CardTitle>Sector Performance</CardTitle>
              <CardDescription>Performance by market sector</CardDescription>
            </CardHeader>
            <CardContent>
              <SectorPerformance />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
