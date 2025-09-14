
"use client"

import * as React from "react"
import { PieChart, Pie, Cell, Tooltip } from "recharts"

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
} from "@/components/ui/chart"
import { Separator } from "./ui/separator"

const chartData = [
  { asset: "Cash", value: 18550, fill: "var(--color-cash)" },
  { asset: "Deposits", value: 15000, fill: "var(--color-deposits)" },
  { asset: "Funds", value: 15250, fill: "var(--color-funds)" },
  { asset: "Crypto", value: 8300, fill: "var(--color-crypto)" },
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
  const totalValue = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0)
  }, [])

  const totalAssets = 57100;
  const totalLiabilities = 25000;
  const netWorth = totalAssets - totalLiabilities;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Portfolio Summary</CardTitle>
        <CardDescription>An overview of your financial health.</CardDescription>
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
        <div className="flex items-center justify-center mt-4">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-[200px]"
          >
            <PieChart>
                <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="asset"
                    innerRadius={60}
                    strokeWidth={5}
                >
                    {chartData.map((entry) => (
                        <Cell key={entry.asset} fill={entry.fill} />
                    ))}
                </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}
