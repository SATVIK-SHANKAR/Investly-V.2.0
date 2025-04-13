"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowDown, ArrowUp, Star } from "lucide-react"

// Mock data for watchlist
const watchlistData = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 182.63,
    change: 1.24,
    volume: "32.5M",
    starred: true,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    price: 417.88,
    change: 0.78,
    volume: "28.1M",
    starred: true,
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 152.19,
    change: -0.32,
    volume: "18.7M",
    starred: false,
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    price: 178.75,
    change: 2.15,
    volume: "25.3M",
    starred: true,
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    price: 175.34,
    change: -1.87,
    volume: "42.9M",
    starred: false,
  },
]

export default function WatchlistTable() {
  const [mounted, setMounted] = useState(false)
  const [watchlist, setWatchlist] = useState(watchlistData)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleStar = (symbol: string) => {
    setWatchlist(watchlist.map((item) => (item.symbol === symbol ? { ...item, starred: !item.starred } : item)))
  }

  if (!mounted) {
    return <div className="w-full h-[200px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded"></div>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30px]"></TableHead>
            <TableHead>Symbol</TableHead>
            <TableHead className="hidden md:table-cell">Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Change</TableHead>
            <TableHead className="text-right hidden md:table-cell">Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {watchlist.map((stock) => (
            <TableRow key={stock.symbol} className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800">
              <TableCell className="p-2">
                <button onClick={() => toggleStar(stock.symbol)}>
                  <Star
                    className={`h-4 w-4 ${stock.starred ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-600"}`}
                  />
                </button>
              </TableCell>
              <TableCell className="font-medium">{stock.symbol}</TableCell>
              <TableCell className="hidden md:table-cell">{stock.name}</TableCell>
              <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
              <TableCell className={`text-right ${stock.change > 0 ? "text-emerald-500" : "text-rose-500"}`}>
                <div className="flex items-center justify-end">
                  {stock.change > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                  {Math.abs(stock.change)}%
                </div>
              </TableCell>
              <TableCell className="text-right hidden md:table-cell">{stock.volume}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
