"use client"

import { useState, useEffect } from "react"
import { TrendingUp } from "lucide-react"

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading time with incremental progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 15
        return next > 100 ? 100 : next
      })
    }, 200)

    const timer = setTimeout(() => {
      clearInterval(interval)
      setLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-slate-950 transition-opacity duration-500">
      <div className="flex flex-col items-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-light via-primary to-teal-light flex items-center justify-center shadow-lg animate-pulse-ring">
            <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-gradient-to-r from-purple-light to-teal-light" />
            </div>
          </div>
        </div>

        <div className="w-64 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-gradient-to-r from-purple-light via-primary to-teal-light rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          {progress < 30
            ? "Loading market data..."
            : progress < 60
              ? "Analyzing investments..."
              : progress < 90
                ? "Preparing dashboard..."
                : "Almost ready..."}
        </p>
      </div>
    </div>
  )
}
