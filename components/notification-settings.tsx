"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NotificationSettings() {
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="email" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="push">Push Notifications</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
        </TabsList>

        <TabsContent value="email" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Email Notifications</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailMarketUpdates">Market Updates</Label>
                  <p className="text-sm text-muted-foreground">Daily and weekly market summaries</p>
                </div>
                <Switch id="emailMarketUpdates" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailPortfolioAlerts">Portfolio Alerts</Label>
                  <p className="text-sm text-muted-foreground">Significant changes in your portfolio value</p>
                </div>
                <Switch id="emailPortfolioAlerts" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailPriceAlerts">Price Alerts</Label>
                  <p className="text-sm text-muted-foreground">Notifications when stocks hit your target prices</p>
                </div>
                <Switch id="emailPriceAlerts" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNewsletters">Newsletters</Label>
                  <p className="text-sm text-muted-foreground">Weekly investment insights and recommendations</p>
                </div>
                <Switch id="emailNewsletters" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailFrequency">Email Frequency</Label>
                  <p className="text-sm text-muted-foreground">How often you want to receive emails</p>
                </div>
                <Select defaultValue="daily">
                  <SelectTrigger className="w-[180px]" id="emailFrequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Summary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="push" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Push Notifications</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pushMarketUpdates">Market Updates</Label>
                  <p className="text-sm text-muted-foreground">Real-time market movements and news</p>
                </div>
                <Switch id="pushMarketUpdates" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pushPortfolioAlerts">Portfolio Alerts</Label>
                  <p className="text-sm text-muted-foreground">Significant changes in your portfolio value</p>
                </div>
                <Switch id="pushPortfolioAlerts" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pushPriceAlerts">Price Alerts</Label>
                  <p className="text-sm text-muted-foreground">Notifications when stocks hit your target prices</p>
                </div>
                <Switch id="pushPriceAlerts" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pushEarnings">Earnings Announcements</Label>
                  <p className="text-sm text-muted-foreground">Alerts for upcoming and released earnings reports</p>
                </div>
                <Switch id="pushEarnings" defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sms" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">SMS Notifications</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smsPortfolioAlerts">Portfolio Alerts</Label>
                  <p className="text-sm text-muted-foreground">Significant changes in your portfolio value</p>
                </div>
                <Switch id="smsPortfolioAlerts" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smsPriceAlerts">Price Alerts</Label>
                  <p className="text-sm text-muted-foreground">Notifications when stocks hit your target prices</p>
                </div>
                <Switch id="smsPriceAlerts" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smsSecurityAlerts">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">Login attempts and security-related notifications</p>
                </div>
                <Switch id="smsSecurityAlerts" defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end mt-6">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Preferences"}
        </Button>
      </div>
    </form>
  )
}
