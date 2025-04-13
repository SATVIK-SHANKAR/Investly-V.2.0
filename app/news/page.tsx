import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Newspaper, TrendingUp, Briefcase, Calendar } from "lucide-react"
import Link from "next/link"
import NewsArticles from "@/components/news-articles"
import MarketInsights from "@/components/market-insights"
import EconomicCalendar from "@/components/economic-calendar"

export default function NewsPage() {
  return (
    <div className="container max-w-7xl mx-auto p-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financial News</h1>
          <p className="text-muted-foreground">Stay updated with the latest market news and insights</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard">
              <Briefcase className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button asChild>
            <Link href="/markets">
              <TrendingUp className="mr-2 h-4 w-4" />
              Markets
            </Link>
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search news articles..." className="pl-10" />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="latest" className="space-y-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="latest">Latest News</TabsTrigger>
          <TabsTrigger value="insights">Market Insights</TabsTrigger>
          <TabsTrigger value="calendar">Economic Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="latest">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Newspaper className="mr-2 h-5 w-5 text-cyan-600" />
                <CardTitle>Latest Financial News</CardTitle>
              </div>
              <CardDescription>Breaking news and updates from the financial world</CardDescription>
            </CardHeader>
            <CardContent>
              <NewsArticles category="latest" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>Market Insights & Analysis</CardTitle>
              <CardDescription>Expert analysis and in-depth market perspectives</CardDescription>
            </CardHeader>
            <CardContent>
              <MarketInsights />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-cyan-600" />
                <CardTitle>Economic Calendar</CardTitle>
              </div>
              <CardDescription>Upcoming economic events and releases</CardDescription>
            </CardHeader>
            <CardContent>
              <EconomicCalendar />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
