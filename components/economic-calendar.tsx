"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, CalendarIcon, Loader2 } from "lucide-react"
import { getEconomicCalendar, type EconomicEvent } from "@/lib/actions"

export default function EconomicCalendar() {
  const [mounted, setMounted] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const [events, setEvents] = useState<EconomicEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    fetchEvents()
  }, [])

  useEffect(() => {
    if (mounted && date) {
      fetchEvents()
    }
  }, [date, mounted])

  const fetchEvents = async () => {
    if (!date) return

    setLoading(true)
    setError(null)

    try {
      // Get events for the selected date
      const formattedDate = date.toISOString().split("T")[0]
      const events = await getEconomicCalendar(formattedDate, formattedDate)
      setEvents(events)
    } catch (err) {
      setError("Failed to fetch economic events. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handlePrevDay = () => {
    if (date) {
      const newDate = new Date(date)
      newDate.setDate(newDate.getDate() - 1)
      setDate(newDate)
    }
  }

  const handleNextDay = () => {
    if (date) {
      const newDate = new Date(date)
      newDate.setDate(newDate.getDate() + 1)
      setDate(newDate)
    }
  }

  if (!mounted) {
    return <div className="h-[400px] bg-slate-100 dark:bg-slate-800 animate-pulse rounded"></div>
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevDay}
            className="border-purple-light/30 hover:bg-purple-light/10"
          >
            <ChevronLeft className="h-4 w-4 text-purple-light" />
          </Button>
          <Button
            variant="outline"
            className="flex items-center border-teal-light/30 hover:bg-teal-light/10"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <CalendarIcon className="h-4 w-4 mr-2 text-teal-light" />
            {date
              ? date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric" })
              : "Select date"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextDay}
            className="border-purple-light/30 hover:bg-purple-light/10"
          >
            <ChevronRight className="h-4 w-4 text-purple-light" />
          </Button>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <div className="flex items-center">
            <Badge variant="outline" className="badge-gradient-5 text-white border-none mr-1">
              High
            </Badge>
            <span className="text-muted-foreground">Impact</span>
          </div>
          <div className="flex items-center">
            <Badge variant="outline" className="badge-gradient-3 text-white border-none mr-1">
              Medium
            </Badge>
          </div>
          <div className="flex items-center">
            <Badge variant="outline" className="badge-gradient-1 text-white border-none mr-1">
              Low
            </Badge>
          </div>
        </div>
      </div>

      {showCalendar && (
        <div className="flex justify-center border rounded-md p-4 bg-white dark:bg-slate-800 gradient-border">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              setDate(newDate)
              setShowCalendar(false)
            }}
            className="rounded-md border"
          />
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-purple-light mb-4" />
          <p className="text-muted-foreground">Loading economic events...</p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-rose-500 mb-4">{error}</p>
          <Button onClick={fetchEvents} className="btn-gradient">
            Try Again
          </Button>
        </div>
      ) : events.length > 0 ? (
        <div className="overflow-x-auto gradient-border p-0.5 rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 dark:bg-slate-800">
                <TableHead>Time</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead className="text-right">Forecast</TableHead>
                <TableHead className="text-right">Previous</TableHead>
                <TableHead className="text-right">Actual</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((event) => (
                <TableRow key={event.id} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
                  <TableCell className="font-medium">{event.time}</TableCell>
                  <TableCell>{event.event}</TableCell>
                  <TableCell>{event.country}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`border-none text-white ${
                        event.impact === "high"
                          ? "badge-gradient-5"
                          : event.impact === "medium"
                            ? "badge-gradient-3"
                            : "badge-gradient-1"
                      }`}
                    >
                      {event.impact.charAt(0).toUpperCase() + event.impact.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">{event.forecast || "-"}</TableCell>
                  <TableCell className="text-right">{event.previous || "-"}</TableCell>
                  <TableCell className="text-right">
                    {event.actual ? (
                      <span
                        className={
                          event.actual > (event.previous || "")
                            ? "text-emerald-500"
                            : event.actual < (event.previous || "")
                              ? "text-rose-500"
                              : ""
                        }
                      >
                        {event.actual}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Pending</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex justify-center items-center h-40 border rounded-md bg-slate-50 dark:bg-slate-800 gradient-border">
          <p className="text-muted-foreground">No economic events scheduled for this date</p>
        </div>
      )}
    </div>
  )
}
