"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock, ThumbsUp, MessageSquare, Share2 } from "lucide-react"
import Link from "next/link"

// Mock data for market insights
const insightArticles = [
  {
    id: "1",
    title: "Why Tech Stocks Could Continue to Outperform in 2024",
    summary:
      "Despite high valuations, technology companies are positioned for continued growth due to AI advancements, cloud expansion, and digital transformation trends across industries.",
    author: {
      name: "Sarah Johnson",
      role: "Senior Market Analyst",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Sector Analysis",
    time: "Yesterday",
    likes: 245,
    comments: 32,
    url: "#",
  },
  {
    id: "2",
    title: "The Impact of Potential Rate Cuts on Bond Markets",
    summary:
      "As central banks signal a shift toward monetary easing, bond markets are likely to experience significant repricing. This analysis explores potential scenarios and investment strategies.",
    author: {
      name: "Michael Chen",
      role: "Fixed Income Strategist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Bonds",
    time: "2 days ago",
    likes: 187,
    comments: 24,
    url: "#",
  },
  {
    id: "3",
    title: "Emerging Markets Outlook: Opportunities Amid Volatility",
    summary:
      "Emerging markets present compelling valuations, but investors should be selective. This analysis highlights regions and sectors with the strongest fundamentals and growth potential.",
    author: {
      name: "Priya Patel",
      role: "Global Markets Strategist",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Global Markets",
    time: "3 days ago",
    likes: 156,
    comments: 18,
    url: "#",
  },
  {
    id: "4",
    title: "ESG Investing: Beyond the Hype",
    summary:
      "Environmental, Social, and Governance (ESG) investing continues to gain momentum. This deep dive examines performance trends, regulatory developments, and future outlook for sustainable investing.",
    author: {
      name: "Thomas Wilson",
      role: "ESG Research Director",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    category: "Investment Strategy",
    time: "5 days ago",
    likes: 203,
    comments: 41,
    url: "#",
  },
]

export default function MarketInsights() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map((idx) => (
          <div key={idx} className="h-48 bg-slate-100 dark:bg-slate-800 animate-pulse rounded"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {insightArticles.map((article) => (
        <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <Badge
                variant="outline"
                className="bg-cyan-50 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800"
              >
                {article.category}
              </Badge>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {article.time}
              </div>
            </div>

            <Link href={article.url}>
              <h3 className="font-medium text-xl mb-3 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                {article.title}
              </h3>
            </Link>

            <p className="text-sm text-muted-foreground mb-4">{article.summary}</p>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={article.author.avatar || "/placeholder.svg"} alt={article.author.name} />
                  <AvatarFallback>
                    {article.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{article.author.name}</div>
                  <div className="text-xs text-muted-foreground">{article.author.role}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button className="flex items-center text-xs text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400">
                  <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                  {article.likes}
                </button>
                <button className="flex items-center text-xs text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400">
                  <MessageSquare className="h-3.5 w-3.5 mr-1" />
                  {article.comments}
                </button>
                <button className="flex items-center text-xs text-muted-foreground hover:text-cyan-600 dark:hover:text-cyan-400">
                  <Share2 className="h-3.5 w-3.5 mr-1" />
                  Share
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
