"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, AlertTriangle, Smartphone, Key } from "lucide-react"

export default function SecuritySettings() {
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
    <div className="space-y-6">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Security Recommendation</AlertTitle>
        <AlertDescription>
          We recommend enabling two-factor authentication to better protect your account.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Key className="h-5 w-5 mr-2 text-cyan-600" />
              Password Settings
            </CardTitle>
            <CardDescription>Update your password and security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input id="currentPassword" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="space-y-0.5">
                <Label htmlFor="passwordExpiry">Password Expiry</Label>
                <p className="text-sm text-muted-foreground">Require password change every 90 days</p>
              </div>
              <Switch id="passwordExpiry" />
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Smartphone className="h-5 w-5 mr-2 text-cyan-600" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>Add an extra layer of security to your account</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="twoFactorAuth">Enable Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Require a verification code when logging in</p>
              </div>
              <Switch id="twoFactorAuth" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="authApp">Authentication App</Label>
                <p className="text-sm text-muted-foreground">Use an authentication app like Google Authenticator</p>
              </div>
              <Switch id="authApp" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="smsAuth">SMS Authentication</Label>
                <p className="text-sm text-muted-foreground">Receive verification codes via SMS</p>
              </div>
              <Switch id="smsAuth" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-cyan-600" />
              Login Security
            </CardTitle>
            <CardDescription>Manage your login and session preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="loginAlerts">Login Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive notifications for new login attempts</p>
              </div>
              <Switch id="loginAlerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="sessionTimeout">Session Timeout</Label>
                <p className="text-sm text-muted-foreground">Automatically log out after 30 minutes of inactivity</p>
              </div>
              <Switch id="sessionTimeout" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="trustedDevices">Trusted Devices</Label>
                <p className="text-sm text-muted-foreground">Manage devices that don't require 2FA</p>
              </div>
              <Button variant="outline" size="sm">
                Manage Devices
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-6">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Security Settings"}
          </Button>
        </div>
      </form>
    </div>
  )
}
