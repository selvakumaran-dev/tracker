'use client'

import { formatCurrency } from '@/lib/utils'
import { TrendingUp, Calendar, DollarSign, BarChart3 } from 'lucide-react'

interface StatsCardProps {
  title: string
  amount: number
  icon: 'total' | 'today' | 'week' | 'month'
}

const icons = {
  total: DollarSign,
  today: Calendar,
  week: TrendingUp,
  month: BarChart3,
}

export default function StatsCard({ title, amount, icon: iconType }: StatsCardProps) {
  const Icon = icons[iconType]

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {formatCurrency(amount)}
          </p>
        </div>
        <div className="bg-primary-100 dark:bg-primary-900 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
      </div>
    </div>
  )
}

