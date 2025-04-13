"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, DollarSign, TrendingUp, BarChart3, Shield } from "lucide-react"
import { currencies } from "@/lib/currencies"
import { getPortfolio } from "@/lib/actions"
import { PortfolioResults } from "@/components/portfolio-results"
import { useToast } from "@/components/ui/use-toast"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  amount: z
    .string()
    .min(1, "Investment amount is required")
    .refine((val) => !isNaN(Number.parseFloat(val)) && Number.parseFloat(val) > 0, "Amount must be a positive number"),
  risk: z.enum(["low", "medium", "high"], {
    required_error: "Please select a risk level",
  }),
  currency: z.string({
    required_error: "Please select a currency",
  }),
})

export default function InvestmentForm() {
  const [loading, setLoading] = useState(false)
  const [portfolioData, setPortfolioData] = useState(null)
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("form")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      risk: "medium",
      currency: "USD",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      const result = await getPortfolio({
        amount: Number.parseFloat(values.amount),
        risk: values.risk,
        currency: values.currency,
      })

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        setPortfolioData(result)
        setActiveTab("results")

        // Scroll to results with smooth animation
        setTimeout(() => {
          document.getElementById("portfolio-results")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }, 100)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate portfolio. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-10">
      <div className="relative">
        <div className="absolute -z-10 inset-0 bg-gradient-to-r from-purple-light/10 via-teal-light/10 to-amber-light/10 rounded-3xl blur-3xl"></div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-light via-primary to-teal-light inline-flex items-center">
          <TrendingUp className="mr-3 h-8 w-8 text-purple-light" />
          Create Your Dream Portfolio
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-3xl">
          Customize your investment strategy based on your risk tolerance, budget, and goals. Our advanced algorithm
          will generate a personalized portfolio recommendation for you.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-2">
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 bg-slate-100 dark:bg-slate-800 p-1 mb-6">
              <TabsTrigger
                value="form"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-light data-[state=active]:to-teal-light data-[state=active]:text-white"
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Create Portfolio
              </TabsTrigger>
              <TabsTrigger
                value="results"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-light data-[state=active]:to-amber-light data-[state=active]:text-white"
                disabled={!portfolioData}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                View Results
              </TabsTrigger>
            </TabsList>

            <TabsContent value="form">
              <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg border-none relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-light via-primary to-teal-light"></div>
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-light/20 to-teal-light/20 rounded-full -mr-8 -mt-8 blur-2xl"></div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                          <FormItem className="transition-all duration-300 hover:translate-y-[-2px]">
                            <FormLabel className="text-lg flex items-center text-purple-dark dark:text-purple-light">
                              <DollarSign className="h-5 w-5 mr-1 text-purple-light" />
                              Investment Amount
                            </FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input
                                  placeholder="10000"
                                  {...field}
                                  className="pl-8 transition-all duration-300 focus:ring-2 focus:ring-purple-light focus:border-purple-light text-lg h-12"
                                />
                              </FormControl>
                              <DollarSign className="h-4 w-4 absolute left-2.5 top-4 text-muted-foreground" />
                            </div>
                            <FormDescription>Enter the amount you want to invest</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="currency"
                        render={({ field }) => (
                          <FormItem className="transition-all duration-300 hover:translate-y-[-2px]">
                            <FormLabel className="text-lg flex items-center text-teal-dark dark:text-teal-light">
                              <svg
                                className="h-5 w-5 mr-1 text-teal-light"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M15 9.5C14.0717 8.57174 12.5716 8 10.9998 8C7.99935 8 6.5 9.5 6.5 11C6.5 13.5 10 12.5 10 15C10 16.5 8.5 18 6 18"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M13.5 6.5L11.5 18"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              Currency
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="transition-all duration-300 focus:ring-2 focus:ring-teal-light focus:border-teal-light h-12">
                                  <SelectValue placeholder="Select currency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-[200px] overflow-y-auto">
                                {currencies.map((currency) => (
                                  <SelectItem key={currency.code} value={currency.code}>
                                    {currency.code} - {currency.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>Select your preferred currency</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="risk"
                      render={({ field }) => (
                        <FormItem className="transition-all duration-300 hover:translate-y-[-2px]">
                          <FormLabel className="text-lg flex items-center text-amber-dark dark:text-amber-light">
                            <Shield className="h-5 w-5 mr-1 text-amber-light" />
                            Risk Tolerance
                          </FormLabel>

                          <div className="grid grid-cols-3 gap-4 pt-2">
                            <div
                              className={`relative cursor-pointer rounded-lg p-4 border-2 transition-all ${
                                field.value === "low"
                                  ? "border-emerald-light bg-emerald-light/10 dark:bg-emerald-dark/20"
                                  : "border-slate-200 dark:border-slate-700 hover:border-emerald-light/50"
                              }`}
                              onClick={() => field.onChange("low")}
                            >
                              {field.value === "low" && (
                                <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-light rounded-full"></div>
                              )}
                              <div className="text-center">
                                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-emerald-light to-emerald-dark flex items-center justify-center mb-2">
                                  <Shield className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="font-medium">Low Risk</h3>
                                <p className="text-xs text-muted-foreground mt-1">Conservative growth</p>
                              </div>
                            </div>

                            <div
                              className={`relative cursor-pointer rounded-lg p-4 border-2 transition-all ${
                                field.value === "medium"
                                  ? "border-amber-light bg-amber-light/10 dark:bg-amber-dark/20"
                                  : "border-slate-200 dark:border-slate-700 hover:border-amber-light/50"
                              }`}
                              onClick={() => field.onChange("medium")}
                            >
                              {field.value === "medium" && (
                                <div className="absolute top-2 right-2 w-3 h-3 bg-amber-light rounded-full"></div>
                              )}
                              <div className="text-center">
                                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-amber-light to-amber-dark flex items-center justify-center mb-2">
                                  <BarChart3 className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="font-medium">Medium Risk</h3>
                                <p className="text-xs text-muted-foreground mt-1">Balanced approach</p>
                              </div>
                            </div>

                            <div
                              className={`relative cursor-pointer rounded-lg p-4 border-2 transition-all ${
                                field.value === "high"
                                  ? "border-rose-light bg-rose-light/10 dark:bg-rose-dark/20"
                                  : "border-slate-200 dark:border-slate-700 hover:border-rose-light/50"
                              }`}
                              onClick={() => field.onChange("high")}
                            >
                              {field.value === "high" && (
                                <div className="absolute top-2 right-2 w-3 h-3 bg-rose-light rounded-full"></div>
                              )}
                              <div className="text-center">
                                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-br from-rose-light to-rose-dark flex items-center justify-center mb-2">
                                  <TrendingUp className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="font-medium">High Risk</h3>
                                <p className="text-xs text-muted-foreground mt-1">Aggressive growth</p>
                              </div>
                            </div>
                          </div>

                          <FormDescription className="mt-2">Choose your preferred risk level</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full btn-gradient hover:scale-[1.02] hover:shadow-lg h-12 text-lg font-medium"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Generating Portfolio...
                        </>
                      ) : (
                        "Generate Your Portfolio"
                      )}
                    </Button>
                  </form>
                </Form>
              </Card>
            </TabsContent>

            <TabsContent value="results" id="portfolio-results">
              {portfolioData && <PortfolioResults data={portfolioData} />}
            </TabsContent>
          </Tabs>

          {/* Investment Tips */}
          <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-md border-none relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-light via-amber-light to-emerald-light"></div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <svg
                className="h-5 w-5 mr-2 text-teal-light"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Investment Tips
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-purple-light/20 dark:bg-purple-light/10 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-purple-light font-bold">1</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-medium text-purple-dark dark:text-purple-light">
                    Diversify your investments
                  </span>{" "}
                  across different asset classes to reduce risk.
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-teal-light/20 dark:bg-teal-light/10 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-teal-light font-bold">2</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-medium text-teal-dark dark:text-teal-light">Start early</span> to take advantage
                  of compound interest and long-term market growth.
                </p>
              </div>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-amber-light/20 dark:bg-amber-light/10 flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-amber-light font-bold">3</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  <span className="font-medium text-amber-dark dark:text-amber-light">Regularly review</span> your
                  portfolio and rebalance as needed to maintain your desired asset allocation.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column - Portfolio Visualization or Results */}
        <div className="relative">
          {portfolioData ? (
            <div className="animate-fade-in">
              <PortfolioResults data={portfolioData} />
            </div>
          ) : (
            <Card className="p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg border-none h-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-light via-teal-light to-amber-light"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-light/10 to-teal-light/10 rounded-full blur-3xl"></div>

              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-r from-purple-light/20 to-teal-light/20 flex items-center justify-center animate-pulse">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-light to-teal-light flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-light to-teal-light mb-3">
                  Your Portfolio Awaits
                </h3>

                <p className="text-slate-600 dark:text-slate-400 max-w-md mb-6">
                  Fill out the form to generate a personalized investment portfolio based on your preferences and risk
                  tolerance.
                </p>

                <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                  <div className="flex flex-col items-center p-4 rounded-lg bg-purple-light/10 dark:bg-purple-light/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-light to-purple-dark flex items-center justify-center mb-2">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-purple-dark dark:text-purple-light">Stocks</span>
                  </div>

                  <div className="flex flex-col items-center p-4 rounded-lg bg-teal-light/10 dark:bg-teal-light/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-light to-teal-dark flex items-center justify-center mb-2">
                      <svg
                        className="h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 8.5H7.5M22 8.5H16.5M7.5 8.5V5C7.5 3.89543 8.39543 3 9.5 3H14.5C15.6046 3 16.5 3.89543 16.5 5V8.5M7.5 8.5H16.5M6 21H18C19.1046 21 20 20.1046 20 19V12C20 10.8954 19.1046 10 18 10H6C4.89543 10 4 10.8954 4 12V19C4 20.1046 4.89543 21 6 21Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-teal-dark dark:text-teal-light">Bonds</span>
                  </div>

                  <div className="flex flex-col items-center p-4 rounded-lg bg-amber-light/10 dark:bg-amber-light/5">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-light to-amber-dark flex items-center justify-center mb-2">
                      <svg
                        className="h-5 w-5 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 3V21M17 6H9.5C8.11929 6 7 7.11929 7 8.5C7 9.88071 8.11929 11 9.5 11H14.5C15.8807 11 17 12.1193 17 13.5C17 14.8807 15.8807 16 14.5 16H7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-sm font-medium text-amber-dark dark:text-amber-light">ETFs</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
