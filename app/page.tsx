'use client'

import { useState, useEffect } from 'react'
import { Expense } from '@/types/expense'
import { getExpenses, saveExpense, deleteExpense } from '@/lib/storage'
import { calculateStats, getExpensesByDateRange } from '@/lib/utils'
import { scheduleDailyReminder, showNotification } from '@/lib/notifications'
import ExpenseForm from '@/components/ExpenseForm'
import ExpenseList from '@/components/ExpenseList'
import ExpenseChart from '@/components/ExpenseChart'
import StatsCard from '@/components/StatsCard'
import NotificationButton from '@/components/NotificationButton'

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [stats, setStats] = useState(calculateStats([]))

  useEffect(() => {
    // Load expenses from localStorage
    const loadedExpenses = getExpenses()
    setExpenses(loadedExpenses)
    setStats(calculateStats(loadedExpenses))

    // Set up daily reminder notification
    const cleanup = scheduleDailyReminder(() => {
      showNotification('Daily Expense Reminder', {
        body: "Don't forget to track your expenses today! Click to add an expense.",
        tag: 'daily-reminder',
      })
    })

    return cleanup
  }, [])

  const handleAddExpense = (expense: Expense) => {
    saveExpense(expense)
    const updatedExpenses = [...expenses, expense]
    setExpenses(updatedExpenses)
    setStats(calculateStats(updatedExpenses))
  }

  const handleDeleteExpense = (id: string) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      deleteExpense(id)
      const updatedExpenses = expenses.filter((e) => e.id !== id)
      setExpenses(updatedExpenses)
      setStats(calculateStats(updatedExpenses))
    }
  }

  const recentExpenses = getExpensesByDateRange(expenses, 30)

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">
                Daily Money Tracker
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Track your expenses and manage your budget effortlessly
              </p>
            </div>
            <NotificationButton />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard title="Total Expenses" amount={stats.total} icon="total" />
          <StatsCard title="Today" amount={stats.today} icon="today" />
          <StatsCard title="This Week" amount={stats.thisWeek} icon="week" />
          <StatsCard title="This Month" amount={stats.thisMonth} icon="month" />
        </div>

        {/* Charts */}
        <div className="mb-8">
          <ExpenseChart expenses={expenses} />
        </div>

        {/* Expense List */}
        <div className="mb-8">
          <ExpenseList expenses={recentExpenses} onDelete={handleDeleteExpense} />
        </div>
      </div>

      {/* Floating Add Button */}
      <ExpenseForm onAdd={handleAddExpense} />
    </main>
  )
}

