"use client"

import { useState, useEffect } from "react"
import { Briefcase, Users, Building, Globe } from "lucide-react"

const stats = [
  {
    id: "jobs",
    label: "Active Jobs",
    value: 25000,
    icon: Briefcase,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: "users",
    label: "Professionals",
    value: 500000,
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: "companies",
    label: "Companies",
    value: 10000,
    icon: Building,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    id: "countries",
    label: "Countries",
    value: 150,
    icon: Globe,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
]

export default function StatsCounter() {
  const [counters, setCounters] = useState<{ [key: string]: number }>({
    jobs: 0,
    users: 0,
    companies: 0,
    countries: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setCounters((prev) => {
        const newCounters = { ...prev }
        let allComplete = true

        stats.forEach((stat) => {
          if (prev[stat.id] < stat.value) {
            const increment = Math.ceil(stat.value / 50)
            newCounters[stat.id] = Math.min(prev[stat.id] + increment, stat.value)
            allComplete = false
          }
        })

        if (allComplete) {
          clearInterval(interval)
        }

        return newCounters
      })
    }, 50)

    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M+"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K+"
    }
    return num.toString() + "+"
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div key={stat.id} className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`${stat.bgColor} p-4 rounded-full`}>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-1">{formatNumber(counters[stat.id])}</h3>
            <p className="text-gray-600">{stat.label}</p>
          </div>
        )
      })}
    </div>
  )
}
