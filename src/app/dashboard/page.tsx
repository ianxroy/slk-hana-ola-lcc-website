
"use client"

import * as React from "react"
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const chartData = [
  { name: 'Personal Care', value: 400, fill: 'hsl(var(--chart-1))' },
  { name: 'Homemaker', value: 300, fill: 'hsl(var(--chart-2))' },
  { name: 'Companionship', value: 200, fill: 'hsl(var(--chart-3))' },
  { name: 'Daily Living Asst.', value: 278, fill: 'hsl(var(--chart-4))' },
  { name: 'Other', value: 189, fill: 'hsl(var(--chart-5))' },
]

const chartConfig = {
  value: {
    label: "Services",
  },
  'Personal Care': {
    label: "Personal Care",
    color: "hsl(var(--chart-1))",
  },
  'Homemaker': {
    label: "Homemaker",
    color: "hsl(var(--chart-2))",
  },
  'Companionship': {
    label: "Companionship",
    color: "hsl(var(--chart-3))",
  },
  'Daily Living Asst.': {
    label: "Daily Living Asst.",
    color: "hsl(var(--chart-4))",
  },
  'Other': {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
}

export default function DashboardPage() {
  return (
     <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24">
         <div className="container mx-auto px-4 md:px-6">
            <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Service Distribution
            </h1>
           <Card className="max-w-4xl mx-auto">
             <CardHeader>
               <CardTitle>Overview</CardTitle>
               <CardDescription>
                 A breakdown of our most popular services provided to clients.
               </CardDescription>
             </CardHeader>
             <CardContent>
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square h-[400px]"
                    >
                    <PieChart>
                        <Tooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        strokeWidth={5}
                        >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                        </Pie>
                         <Legend content={({ payload }) => {
                            return (
                            <ul className="flex flex-wrap gap-x-4 justify-center">
                                {payload?.map((entry, index) => (
                                <li key={`item-${index}`} className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                    <span>{entry.value}</span>
                                </li>
                                ))}
                            </ul>
                            )
                        }} />
                    </PieChart>
                </ChartContainer>
            </CardContent>
           </Card>
         </div>
      </main>
      <Footer />
    </div>
  )
}
