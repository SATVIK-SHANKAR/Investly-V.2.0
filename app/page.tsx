"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, LineChart, TrendingUp, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Toaster } from "@/components/ui/toaster"
import { useEffect, useRef, useState } from "react"
import Typed from "typed.js"

export default function Home() {
  const typedRef = useRef(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Wait for the next tick to ensure DOM is ready
    const timer = setTimeout(() => {
      // Only initialize Typed.js if the element exists
      if (typedRef.current) {
        const typed = new Typed(typedRef.current, {
          strings: ["everyone", "beginners", "professionals", "long-term investors", "day traders", "your future"],
          typeSpeed: 80,
          backSpeed: 50,
          backDelay: 1500,
          loop: true,
          showCursor: true,
          cursorChar: "|",
        })

        // Cleanup on unmount
        return () => {
          typed.destroy()
        }
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [mounted])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-sky-50 dark:from-black dark:via-slate-900 dark:to-slate-900/80 transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                Smart investing for{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-light via-primary to-teal-light">
                  {!mounted ? "everyone" : <span ref={typedRef}></span>}
                </span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Investly helps you make better investment decisions with data-driven insights, real-time market
                analysis, and personalized portfolio recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="btn-gradient">
                  <Link href="/dashboard">
                    Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-purple-light/30 hover:bg-purple-light/10">
                  <Link href="/portfolio">Create Portfolio</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -z-10 inset-0 bg-gradient-to-tr from-purple-light/20 via-primary/20 to-teal-light/20 rounded-3xl blur-2xl animate-pulse"></div>
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 border border-slate-200 dark:border-slate-700 gradient-border">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="Dashboard preview"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white dark:bg-black">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-light via-primary to-teal-light">
              Why choose Investly?
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Our platform combines powerful analytics with an intuitive interface to help you make informed investment
              decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none transition-all duration-300 hover:shadow-lg hover:scale-[1.02] gradient-border">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-light to-primary flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Advanced Analytics</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Powerful data visualization and analysis tools to help you understand market trends.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none transition-all duration-300 hover:shadow-lg hover:scale-[1.02] gradient-border">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-teal-light to-primary flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Real-time Data</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Stay updated with real-time market data and performance metrics for informed decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none transition-all duration-300 hover:shadow-lg hover:scale-[1.02] gradient-border">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-amber-light to-amber-dark flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Portfolio Optimization</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Personalized portfolio recommendations based on your risk tolerance and goals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none transition-all duration-300 hover:shadow-lg hover:scale-[1.02] gradient-border">
              <CardContent className="pt-6">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-emerald-light to-emerald-dark flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Risk Management</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Advanced risk assessment tools to help you balance your portfolio effectively.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-light via-primary to-teal-light text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start your investment journey?</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Join thousands of investors who are already using Investly to grow their wealth and achieve their financial
            goals.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-white text-primary hover:bg-slate-100 hover:scale-105 transition-transform"
          >
            <Link href="/dashboard">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
      <Toaster />
    </div>
  )
}
