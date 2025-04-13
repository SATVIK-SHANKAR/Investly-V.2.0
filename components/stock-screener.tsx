"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowDown, ArrowUp, Filter, Loader2 } from "lucide-react"
import { getStockScreenerResults, type StockScreenerFilters } from "@/lib/actions"

export default function StockScreener() {
  const [peRange, setPeRange] = useState([0, 50])
  const [dividendRange, setDividendRange] = useState([0, 5])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sector, setSector] = useState("all")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleApplyFilters = async () => {
    setLoading(true)
    setError(null)

    try {
      const filters: StockScreenerFilters = {
        sector: sector,
        peRatioMin: peRange[0],
        peRatioMax: peRange[1],
        dividendMin: dividendRange[0],
        dividendMax: dividendRange[1],
        priceMin: priceRange[0],
        priceMax: priceRange[1],
      }

      const stockResults = await getStockScreenerResults(filters)
      setResults(stockResults)
    } catch (err) {
      setError("Failed to fetch stock results. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-purple-dark dark:text-purple-light">Sector</label>
          <Select value={sector} onValueChange={setSector}>
            <SelectTrigger className="border-purple-light/30 focus:border-purple-light focus:ring-purple-light">
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Financials">Financials</SelectItem>
              <SelectItem value="Consumer Staples">Consumer Staples</SelectItem>
              <SelectItem value="Consumer Cyclical">Consumer Cyclical</SelectItem>
              <SelectItem value="Energy">Energy</SelectItem>
              <SelectItem value="Communication Services">Communication Services</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-teal-dark dark:text-teal-light">
            P/E Ratio: {peRange[0]} - {peRange[1]}
          </label>
          <Slider
            value={peRange}
            min={0}
            max={100}
            step={1}
            onValueChange={setPeRange}
            className="py-4"
            defaultValue={[0, 50]}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary dark:text-primary">
            Dividend Yield: {dividendRange[0]}% - {dividendRange[1]}%
          </label>
          <Slider
            value={dividendRange}
            min={0}
            max={10}
            step={0.1}
            onValueChange={setDividendRange}
            className="py-4"
            defaultValue={[0, 5]}
          />
        </div>

        <div className="space-y-2 md:col-span-3">
          <label className="text-sm font-medium text-amber-dark dark:text-amber-light">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <Slider
            value={priceRange}
            min={0}
            max={1000}
            step={10}
            onValueChange={setPriceRange}
            className="py-4"
            defaultValue={[0, 500]}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {results.length > 0 ? `Showing ${results.length} results` : "Apply filters to see results"}
        </div>
        <Button onClick={handleApplyFilters} disabled={loading} className="btn-gradient">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Filtering...
            </>
          ) : (
            <>
              <Filter className="mr-2 h-4 w-4" />
              Apply Filters
            </>
          )}
        </Button>
      </div>

      {error && <div className="p-4 text-center text-rose-500 bg-rose-50 dark:bg-rose-900/20 rounded-md">{error}</div>}

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Symbol</TableHead>
              <TableHead className="hidden md:table-cell">Name</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-right">P/E</TableHead>
              <TableHead className="text-right hidden md:table-cell">Market Cap</TableHead>
              <TableHead className="text-right">Dividend</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.length > 0 ? (
              results.map((stock) => (
                <TableRow key={stock.symbol} className="cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800">
                  <TableCell className="font-medium">{stock.symbol}</TableCell>
                  <TableCell className="hidden md:table-cell">{stock.name}</TableCell>
                  <TableCell>{stock.sector}</TableCell>
                  <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                  <TableCell className={`text-right ${stock.change > 0 ? "text-emerald-500" : "text-rose-500"}`}>
                    <div className="flex items-center justify-end">
                      {stock.change > 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
                      {Math.abs(stock.change)}%
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{stock.peRatio}</TableCell>
                  <TableCell className="text-right hidden md:table-cell">{stock.marketCap}</TableCell>
                  <TableCell className="text-right">{stock.dividend}%</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  {loading ? (
                    <div className="flex flex-col items-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                      <span>Searching for stocks...</span>
                    </div>
                  ) : (
                    "Apply filters to see stock results"
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
