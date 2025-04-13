"use server"

import axios from "axios"

const API_KEY = "demo" // Replace with your Alpha Vantage API key in production

const SYMBOLS = {
  low: ["VOO", "BND", "JNJ", "PG", "KO"],
  medium: ["AAPL", "MSFT", "VTI", "GOOGL", "AMZN"],
  high: ["TSLA", "NVDA", "COIN", "AMD", "PLTR"],
}

type PortfolioRequest = {
  amount: number
  risk: "low" | "medium" | "high"
  currency: string
}

type PortfolioItem = {
  symbol: string
  price: number
  shares: number
  allocated: number
}

type PortfolioResponse = {
  total: number
  currency: string
  risk: string
  breakdown: PortfolioItem[]
  error?: string
}

async function fetchPrice(symbol: string, currency: string): Promise<number | null> {
  try {
    // For simplicity, we're using GLOBAL_QUOTE for stocks
    // In a production app, you might want to use different endpoints for crypto
    const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`

    const { data } = await axios.get(url)

    if (data["Global Quote"] && data["Global Quote"]["05. price"]) {
      let price = Number.parseFloat(data["Global Quote"]["05. price"])

      // If currency is not USD, convert the price
      if (currency !== "USD") {
        const exchangeRateUrl = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=${currency}&apikey=${API_KEY}`
        const exchangeRateResponse = await axios.get(exchangeRateUrl)

        if (
          exchangeRateResponse.data["Realtime Currency Exchange Rate"] &&
          exchangeRateResponse.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        ) {
          const exchangeRate = Number.parseFloat(
            exchangeRateResponse.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"],
          )
          price = price * exchangeRate
        }
      }

      return price
    }

    return null
  } catch (error) {
    console.error("Error fetching price:", error)
    return null
  }
}

export async function getPortfolio(request: PortfolioRequest): Promise<PortfolioResponse> {
  const { amount, risk, currency } = request

  if (!amount || !risk || !currency || !SYMBOLS[risk]) {
    return {
      total: 0,
      currency,
      risk,
      breakdown: [],
      error: "Invalid input parameters",
    }
  }

  const selected = SYMBOLS[risk]
  const perAsset = amount / selected.length
  const breakdown: PortfolioItem[] = []

  try {
    for (const symbol of selected) {
      const price = await fetchPrice(symbol, currency)

      if (!price) continue

      const shares = Number.parseFloat((perAsset / price).toFixed(4))
      breakdown.push({
        symbol,
        price,
        shares,
        allocated: Number.parseFloat((shares * price).toFixed(2)),
      })
    }

    if (breakdown.length === 0) {
      return {
        total: amount,
        currency,
        risk,
        breakdown: [],
        error: "Could not fetch prices for any assets. API rate limit may have been reached.",
      }
    }

    return { total: amount, currency, risk, breakdown }
  } catch (error) {
    console.error("Error generating portfolio:", error)
    return {
      total: amount,
      currency,
      risk,
      breakdown: [],
      error: "Failed to generate portfolio. Please try again.",
    }
  }
}

// News API
export type NewsArticle = {
  title: string
  summary: string
  url: string
  banner_image?: string
  source: string
  category: string
  time_published: string
  authors?: string[]
  overall_sentiment_score?: number
  ticker_sentiment?: {
    ticker: string
    relevance_score: number
    ticker_sentiment_score: number
  }[]
}

export type NewsResponse = {
  items: NewsArticle[]
  error?: string
}

export async function getMarketNews(tickers?: string, topics?: string, limit = 20): Promise<NewsResponse> {
  try {
    let url = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${API_KEY}`

    if (tickers) {
      url += `&tickers=${tickers}`
    }

    if (topics) {
      url += `&topics=${topics}`
    }

    const { data } = await axios.get(url)

    if (!data || !data.feed) {
      return {
        items: [],
        error: "No news data available",
      }
    }

    const articles: NewsArticle[] = data.feed.slice(0, limit).map((item: any) => ({
      title: item.title,
      summary: item.summary,
      url: item.url,
      banner_image: item.banner_image,
      source: item.source,
      category: item.category || "General",
      time_published: formatPublishedTime(item.time_published),
      authors: item.authors,
      overall_sentiment_score: item.overall_sentiment_score,
      ticker_sentiment: item.ticker_sentiment,
    }))

    return { items: articles }
  } catch (error) {
    console.error("Error fetching market news:", error)
    return {
      items: [],
      error: "Failed to fetch market news. Please try again.",
    }
  }
}

// Format time published from API (20230424T123000 to readable format)
function formatPublishedTime(timeStr: string): string {
  if (!timeStr) return ""

  try {
    // Format: YYYYMMDDTHHMMSS
    const year = timeStr.substring(0, 4)
    const month = timeStr.substring(4, 6)
    const day = timeStr.substring(6, 8)
    const hour = timeStr.substring(9, 11)
    const minute = timeStr.substring(11, 13)

    const date = new Date(`${year}-${month}-${day}T${hour}:${minute}:00`)

    // Check if it's today
    const today = new Date()
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()

    if (isToday) {
      const hours = date.getHours()
      const minutes = date.getMinutes()
      return `Today at ${hours}:${minutes < 10 ? "0" + minutes : minutes}`
    }

    // Check if it's yesterday
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()

    if (isYesterday) {
      return "Yesterday"
    }

    // Otherwise return formatted date
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== today.getFullYear() ? "numeric" : undefined,
    })
  } catch (e) {
    return timeStr
  }
}

// Economic Calendar Data
export type EconomicEvent = {
  id: string
  date: string
  time: string
  event: string
  country: string
  impact: "high" | "medium" | "low"
  forecast?: string
  previous?: string
  actual?: string
}

export async function getEconomicCalendar(startDate?: string, endDate?: string): Promise<EconomicEvent[]> {
  // In a real implementation, you would fetch this data from an API
  // For now, we'll return enhanced mock data

  // Generate dates for the next 14 days
  const dates: string[] = []
  const today = new Date()

  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() + i)
    dates.push(date.toISOString().split("T")[0])
  }

  // Economic events for the next 14 days
  const events: EconomicEvent[] = [
    // Today
    {
      id: "1",
      date: dates[0],
      time: "08:30 AM",
      event: "Retail Sales",
      country: "United States",
      impact: "high",
      forecast: "0.4%",
      previous: "0.6%",
      actual: "0.5%",
    },
    {
      id: "2",
      date: dates[0],
      time: "10:00 AM",
      event: "Business Inventories",
      country: "United States",
      impact: "low",
      forecast: "0.2%",
      previous: "0.3%",
      actual: "0.2%",
    },
    // Tomorrow
    {
      id: "3",
      date: dates[1],
      time: "08:30 AM",
      event: "Housing Starts",
      country: "United States",
      impact: "medium",
      forecast: "1.48M",
      previous: "1.52M",
    },
    {
      id: "4",
      date: dates[1],
      time: "09:15 AM",
      event: "Industrial Production",
      country: "United States",
      impact: "medium",
      forecast: "0.3%",
      previous: "-0.1%",
    },
    // Day after tomorrow
    {
      id: "5",
      date: dates[2],
      time: "07:00 AM",
      event: "CPI",
      country: "United Kingdom",
      impact: "high",
      forecast: "3.1%",
      previous: "3.2%",
    },
    {
      id: "6",
      date: dates[2],
      time: "10:30 AM",
      event: "Crude Oil Inventories",
      country: "United States",
      impact: "medium",
      forecast: "-2.1M",
      previous: "5.8M",
    },
    // 3 days from now
    {
      id: "7",
      date: dates[3],
      time: "08:30 AM",
      event: "Initial Jobless Claims",
      country: "United States",
      impact: "medium",
      forecast: "215K",
      previous: "211K",
    },
    {
      id: "8",
      date: dates[3],
      time: "02:45 AM",
      event: "French Flash Manufacturing PMI",
      country: "France",
      impact: "low",
      forecast: "45.8",
      previous: "45.2",
    },
    // 4 days from now
    {
      id: "9",
      date: dates[4],
      time: "08:30 AM",
      event: "GDP (QoQ)",
      country: "United States",
      impact: "high",
      forecast: "2.3%",
      previous: "2.1%",
    },
    {
      id: "10",
      date: dates[4],
      time: "10:00 AM",
      event: "Michigan Consumer Sentiment",
      country: "United States",
      impact: "medium",
      forecast: "77.8",
      previous: "76.9",
    },
    // 5 days from now
    {
      id: "11",
      date: dates[5],
      time: "08:30 AM",
      event: "Core PCE Price Index",
      country: "United States",
      impact: "high",
      forecast: "0.3%",
      previous: "0.2%",
    },
    {
      id: "12",
      date: dates[5],
      time: "09:45 AM",
      event: "Chicago PMI",
      country: "United States",
      impact: "medium",
      forecast: "44.0",
      previous: "41.5",
    },
    // 6 days from now
    {
      id: "13",
      date: dates[6],
      time: "09:45 AM",
      event: "Manufacturing PMI",
      country: "United States",
      impact: "medium",
      forecast: "49.8",
      previous: "49.2",
    },
    {
      id: "14",
      date: dates[6],
      time: "10:00 AM",
      event: "ISM Manufacturing PMI",
      country: "United States",
      impact: "high",
      forecast: "48.5",
      previous: "47.8",
    },
    // 7 days from now
    {
      id: "15",
      date: dates[7],
      time: "10:00 AM",
      event: "JOLTs Job Openings",
      country: "United States",
      impact: "medium",
      forecast: "8.75M",
      previous: "8.79M",
    },
    {
      id: "16",
      date: dates[7],
      time: "02:00 PM",
      event: "FOMC Meeting Minutes",
      country: "United States",
      impact: "high",
      forecast: "",
      previous: "",
    },
    // 8 days from now
    {
      id: "17",
      date: dates[8],
      time: "08:15 AM",
      event: "ADP Employment Change",
      country: "United States",
      impact: "medium",
      forecast: "175K",
      previous: "184K",
    },
    {
      id: "18",
      date: dates[8],
      time: "10:00 AM",
      event: "ISM Services PMI",
      country: "United States",
      impact: "high",
      forecast: "52.0",
      previous: "51.4",
    },
    // 9 days from now
    {
      id: "19",
      date: dates[9],
      time: "08:30 AM",
      event: "Nonfarm Payrolls",
      country: "United States",
      impact: "high",
      forecast: "180K",
      previous: "187K",
    },
    {
      id: "20",
      date: dates[9],
      time: "08:30 AM",
      event: "Unemployment Rate",
      country: "United States",
      impact: "high",
      forecast: "3.8%",
      previous: "3.9%",
    },
  ]

  // Filter by date range if provided
  if (startDate && endDate) {
    return events.filter((event) => event.date >= startDate && event.date <= endDate)
  }

  return events
}

// Stock Screener Data
export type StockScreenerFilters = {
  sector?: string
  peRatioMin?: number
  peRatioMax?: number
  dividendMin?: number
  dividendMax?: number
  marketCapMin?: number
  marketCapMax?: number
  priceMin?: number
  priceMax?: number
}

export type StockResult = {
  symbol: string
  name: string
  sector: string
  price: number
  change: number
  peRatio: number
  marketCap: string
  dividend: number
}

export async function getStockScreenerResults(filters: StockScreenerFilters): Promise<StockResult[]> {
  // Mock data for stock screener
  const allStocks: StockResult[] = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      sector: "Technology",
      price: 182.63,
      change: 1.24,
      peRatio: 28.5,
      marketCap: "2.85T",
      dividend: 0.58,
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      sector: "Technology",
      price: 417.88,
      change: 0.78,
      peRatio: 35.2,
      marketCap: "3.12T",
      dividend: 0.82,
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      sector: "Technology",
      price: 152.19,
      change: -0.32,
      peRatio: 24.8,
      marketCap: "1.92T",
      dividend: 0,
    },
    {
      symbol: "AMZN",
      name: "Amazon.com Inc.",
      sector: "Technology",
      price: 178.75,
      change: 2.15,
      peRatio: 42.3,
      marketCap: "1.85T",
      dividend: 0,
    },
    {
      symbol: "META",
      name: "Meta Platforms Inc.",
      sector: "Technology",
      price: 485.58,
      change: 1.75,
      peRatio: 26.1,
      marketCap: "1.24T",
      dividend: 0,
    },
    {
      symbol: "TSLA",
      name: "Tesla Inc.",
      sector: "Consumer Cyclical",
      price: 175.34,
      change: -1.87,
      peRatio: 50.2,
      marketCap: "558.2B",
      dividend: 0,
    },
    {
      symbol: "JNJ",
      name: "Johnson & Johnson",
      sector: "Healthcare",
      price: 152.19,
      change: -0.32,
      peRatio: 17.8,
      marketCap: "368.5B",
      dividend: 3.21,
    },
    {
      symbol: "PG",
      name: "Procter & Gamble",
      sector: "Consumer Staples",
      price: 162.75,
      change: 0.45,
      peRatio: 26.3,
      marketCap: "384.2B",
      dividend: 2.45,
    },
    {
      symbol: "V",
      name: "Visa Inc.",
      sector: "Financials",
      price: 275.34,
      change: 1.12,
      peRatio: 30.7,
      marketCap: "562.8B",
      dividend: 0.78,
    },
    {
      symbol: "XOM",
      name: "Exxon Mobil Corp.",
      sector: "Energy",
      price: 113.25,
      change: -0.87,
      peRatio: 13.2,
      marketCap: "452.1B",
      dividend: 3.64,
    },
    {
      symbol: "JPM",
      name: "JPMorgan Chase & Co.",
      sector: "Financials",
      price: 198.47,
      change: 0.92,
      peRatio: 12.1,
      marketCap: "572.3B",
      dividend: 2.85,
    },
    {
      symbol: "BAC",
      name: "Bank of America Corp.",
      sector: "Financials",
      price: 38.75,
      change: 0.45,
      peRatio: 11.8,
      marketCap: "305.2B",
      dividend: 2.72,
    },
    {
      symbol: "WMT",
      name: "Walmart Inc.",
      sector: "Consumer Staples",
      price: 62.45,
      change: 0.28,
      peRatio: 27.5,
      marketCap: "503.8B",
      dividend: 1.42,
    },
    {
      symbol: "CVX",
      name: "Chevron Corporation",
      sector: "Energy",
      price: 155.82,
      change: -1.24,
      peRatio: 15.3,
      marketCap: "289.7B",
      dividend: 4.12,
    },
    {
      symbol: "HD",
      name: "Home Depot Inc.",
      sector: "Consumer Cyclical",
      price: 342.78,
      change: 0.65,
      peRatio: 22.9,
      marketCap: "342.1B",
      dividend: 2.42,
    },
    {
      symbol: "PFE",
      name: "Pfizer Inc.",
      sector: "Healthcare",
      price: 27.42,
      change: -0.75,
      peRatio: 9.8,
      marketCap: "155.3B",
      dividend: 5.84,
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      sector: "Technology",
      price: 875.28,
      change: 2.45,
      peRatio: 72.5,
      marketCap: "2.16T",
      dividend: 0.04,
    },
    {
      symbol: "DIS",
      name: "Walt Disney Co.",
      sector: "Communication Services",
      price: 114.52,
      change: 0.32,
      peRatio: 25.7,
      marketCap: "209.8B",
      dividend: 0,
    },
    {
      symbol: "KO",
      name: "Coca-Cola Co.",
      sector: "Consumer Staples",
      price: 62.18,
      change: 0.15,
      peRatio: 26.2,
      marketCap: "268.5B",
      dividend: 3.12,
    },
    {
      symbol: "MRK",
      name: "Merck & Co. Inc.",
      sector: "Healthcare",
      price: 125.45,
      change: 0.87,
      peRatio: 22.1,
      marketCap: "317.8B",
      dividend: 2.68,
    },
  ]

  // Apply filters
  return allStocks.filter((stock) => {
    // Filter by sector
    if (filters.sector && filters.sector !== "all" && stock.sector.toLowerCase() !== filters.sector.toLowerCase()) {
      return false
    }

    // Filter by P/E ratio
    if (filters.peRatioMin !== undefined && stock.peRatio < filters.peRatioMin) {
      return false
    }
    if (filters.peRatioMax !== undefined && stock.peRatio > filters.peRatioMax) {
      return false
    }

    // Filter by dividend yield
    if (filters.dividendMin !== undefined && stock.dividend < filters.dividendMin) {
      return false
    }
    if (filters.dividendMax !== undefined && stock.dividend > filters.dividendMax) {
      return false
    }

    // Filter by price
    if (filters.priceMin !== undefined && stock.price < filters.priceMin) {
      return false
    }
    if (filters.priceMax !== undefined && stock.price > filters.priceMax) {
      return false
    }

    return true
  })
}
