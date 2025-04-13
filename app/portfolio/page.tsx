import InvestmentForm from "@/components/investment-form"
import { Toaster } from "@/components/ui/toaster"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Briefcase, History } from "lucide-react"
import Link from "next/link"
import ExistingPortfolios from "@/components/existing-portfolios"

export default function PortfolioPage() {
  return (
    <div className="container max-w-6xl mx-auto p-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portfolio Management</h1>
          <p className="text-muted-foreground">Create and manage your investment portfolios</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard">
              <Briefcase className="mr-2 h-4 w-4" />
              Dashboard
            </Link>
          </Button>
          <Button asChild>
            <Link href="/portfolio/history">
              <History className="mr-2 h-4 w-4" />
              Transaction History
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="existing" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="existing">Existing Portfolios</TabsTrigger>
          <TabsTrigger value="create">Create New Portfolio</TabsTrigger>
        </TabsList>

        <TabsContent value="existing" className="space-y-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Your Portfolios</CardTitle>
                  <CardDescription>Manage your existing investment portfolios</CardDescription>
                </div>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  New Portfolio
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ExistingPortfolios />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Create New Portfolio</CardTitle>
              <CardDescription>Generate a personalized investment portfolio based on your preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <InvestmentForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}
