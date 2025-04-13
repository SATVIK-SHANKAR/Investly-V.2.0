"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, ExternalLink, Loader2 } from "lucide-react"
import Link from "next/link"
import { getMarketNews, type NewsArticle } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewsArticles({ category = "latest" }) {
  const [mounted, setMounted] = useState(false)
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [activeCategory, setActiveCategory] = useState(category)
  const articlesPerPage = 6

  useEffect(() => {
    setMounted(true)
    fetchNews(activeCategory)
  }, [activeCategory])

  const fetchNews = async (category: string) => {
    setLoading(true)
    setError(null)

    try {
      // Get tickers or topics based on category
      let tickers = undefined
      let topics = undefined

      if (category === "technology") {
        tickers = "AAPL,MSFT,GOOGL,AMZN,META,NVDA"
      } else if (category === "finance") {
        tickers = "JPM,BAC,GS,MS,C,WFC"
      } else if (category === "energy") {
        tickers = "XOM,CVX,COP,BP,SHEL"
      } else if (category === "economy") {
        topics = "economy,inflation,fed,interest_rates"
      }

      const response = await getMarketNews(tickers, topics, 20)

      if (response.error) {
        setError(response.error)
      } else {
        setArticles(response.items)
        setHasMore(response.items.length >= 20)
      }
    } catch (err) {
      setError("Failed to fetch news. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1)
  }

  if (!mounted) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((idx) => (
          <div key={idx} className="h-64 bg-slate-100 dark:bg-slate-800 animate-pulse rounded"></div>
        ))}
      </div>
    )
  }

  const displayedArticles = articles.slice(0, page * articlesPerPage)

  return (
    <div className="space-y-6">
      <Tabs value={activeCategory} onValueChange={(value) => setActiveCategory(value)} className="mb-6">
        <TabsList className="bg-slate-100 dark:bg-slate-800 w-full grid grid-cols-5">
          {["latest", "technology", "finance", "energy", "economy"].map((cat) => (
            <TabsTrigger
              key={cat}
              value={cat}
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-light data-[state=active]:to-teal-light data-[state=active]:text-white"
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {loading && articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-purple-light mb-4" />
          <p className="text-muted-foreground">Loading latest financial news...</p>
        </div>
      ) : error && articles.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-rose-500 mb-4">{error}</p>
          <Button onClick={() => fetchNews(activeCategory)} className="btn-gradient">
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedArticles.length > 0 ? (
              displayedArticles.map((article, index) => (
                <Card
                  key={index}
                  className="overflow-hidden gradient-border hover:shadow-lg transition-all duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                    <div className="md:col-span-1 h-48 md:h-full bg-slate-100 dark:bg-slate-800">
                      <img
                        src={article.banner_image || "/placeholder.svg?height=200&width=300"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4 md:col-span-2 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="badge-gradient-2 text-white border-none">
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {article.time_published}
                        </div>
                      </div>

                      <h3 className="font-medium text-lg mb-2 line-clamp-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.summary}</p>

                      <div className="mt-auto flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">Source: {article.source}</div>
                        <Link
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-purple-light dark:text-purple-light flex items-center hover:underline"
                        >
                          Read more
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-2 flex justify-center items-center py-12">
                <p className="text-muted-foreground">No articles found for this category.</p>
              </div>
            )}
          </div>

          {displayedArticles.length < articles.length && (
            <div className="flex justify-center mt-8">
              <Button onClick={loadMore} className="btn-gradient">
                Load More Articles
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
