"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowUp, Edit, Eye, MoreHorizontal, Trash } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for existing portfolios
const portfolios = [
  {
    id: "1",
    name: "Growth Portfolio",
    value: 15250.75,
    change: 2.3,
    allocation: [
      { name: "Stocks", value: 70 },
      { name: "Bonds", value: 20 },
      { name: "Cash", value: 5 },
      { name: "Crypto", value: 5 },
    ],
    risk: "high",
    created: "Jan 15, 2023",
  },
  {
    id: "2",
    name: "Retirement Fund",
    value: 42680.5,
    change: 0.8,
    allocation: [
      { name: "Stocks", value: 60 },
      { name: "Bonds", value: 30 },
      { name: "Cash", value: 10 },
      { name: "Crypto", value: 0 },
    ],
    risk: "medium",
    created: "Mar 22, 2022",
  },
  {
    id: "3",
    name: "Conservative Mix",
    value: 8750.25,
    change: -0.5,
    allocation: [
      { name: "Stocks", value: 30 },
      { name: "Bonds", value: 50 },
      { name: "Cash", value: 20 },
      { name: "Crypto", value: 0 },
    ],
    risk: "low",
    created: "Nov 10, 2023",
  },
]

const COLORS = ["#0ea5e9", "#0284c7", "#0369a1", "#0c4a6e"]

export default function ExistingPortfolios() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {portfolios.map((portfolio) => (
        <Card key={portfolio.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium text-lg">{portfolio.name}</h3>
                <div className="text-sm text-muted-foreground">Created {portfolio.created}</div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View Details</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit Portfolio</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-rose-500 focus:text-rose-500">
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="text-2xl font-bold">${portfolio.value.toLocaleString()}</div>
              <div
                className={`flex items-center text-sm ${portfolio.change >= 0 ? "text-emerald-500" : "text-rose-500"}`}
              >
                {portfolio.change >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                {Math.abs(portfolio.change)}%
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="text-sm">
                <div className="text-muted-foreground">Risk Level</div>
                <div className="font-medium capitalize">{portfolio.risk}</div>
              </div>
              <div className="h-20 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={portfolio.allocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={15}
                      outerRadius={30}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {portfolio.allocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <Button className="w-full">View Portfolio</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
