
"use client"

import * as React from "react"
import { Line, LineChart, CartesianGrid, XAxis, Tooltip, YAxis } from "recharts"
import { Wallet } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Separator } from "./ui/separator"

const chartData = [
  { month: "January", cash: 18600, deposits: 15000, funds: 15250, crypto: 8300 },
  { month: "February", cash: 18550, deposits: 15000, funds: 15400, crypto: 8500 },
  { month: "March", cash: 18700, deposits: 15000, funds: 15600, crypto: 8800 },
  { month: "April", cash: 18800, deposits: 15000, funds: 15800, crypto: 9000 },
  { month: "May", cash: 19000, deposits: 15000, funds: 16000, crypto: 9200 },
  { month: "June", cash: 18550, deposits: 15000, funds: 15250, crypto: 8300 },
]

const chartConfig = {
  value: {
    label: "Value",
  },
  cash: {
    label: "Cash",
    color: "hsl(var(--chart-1))",
  },
  deposits: {
    label: "Deposits",
    color: "hsl(var(--chart-2))",
  },
  funds: {
    label: "Funds",
    color: "hsl(var(--chart-3))",
  },
  crypto: {
    label: "Crypto",
    color: "hsl(var(--chart-4))",
  },
}

export default function PortfolioSummaryCard() {
  const totalAssets = 57100;
  const totalLiabilities = 25000;
  const netWorth = totalAssets - totalLiabilities;

  return (
    <Card>
      <CardHeader>
        <CardDescription>Overview of Finincial well-being</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div>
                <p className="text-sm text-muted-foreground">Assets</p>
                <p className="font-bold text-lg">${totalAssets.toLocaleString()}</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Liabilities</p>
                <p className="font-bold text-lg">${totalLiabilities.toLocaleString()}</p>
            </div>
            <div>
                <p className="text-sm text-muted-foreground">Net Worth</p>
                <p className="font-bold text-lg text-primary">${netWorth.toLocaleString()}</p>
            </div>
        </div>
        <Separator />
        <div className="mt-4">
          <ChartContainer config={chartConfig} className="w-full h-[250px]">
            <LineChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickFormatter={(value) => `$${value / 1000}k`}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                width={35}
              />
              <Tooltip cursor={false} content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line dataKey="cash" type="monotone" stroke="var(--color-cash)" strokeWidth={2} dot={false} />
              <Line dataKey="deposits" type="monotone" stroke="var(--color-deposits)" strokeWidth={2} dot={false} />
              <Line dataKey="funds" type="monotone" stroke="var(--color-funds)" strokeWidth={2} dot={false} />
              <Line dataKey="crypto" type="monotone" stroke="var(--color-crypto)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
