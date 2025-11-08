import { Expense, ExpenseStats } from '@/types/expense'
import { format, startOfDay, startOfWeek, startOfMonth, isSameDay, isSameWeek, isSameMonth } from 'date-fns'

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

export const calculateStats = (expenses: Expense[]): ExpenseStats => {
  const now = new Date()
  const today = startOfDay(now)
  const weekStart = startOfWeek(now)
  const monthStart = startOfMonth(now)

  const stats: ExpenseStats = {
    total: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
    byCategory: {},
  }

  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date)
    const amount = expense.amount

    stats.total += amount

    if (isSameDay(expenseDate, today)) {
      stats.today += amount
    }

    if (isSameWeek(expenseDate, weekStart)) {
      stats.thisWeek += amount
    }

    if (isSameMonth(expenseDate, monthStart)) {
      stats.thisMonth += amount
    }

    stats.byCategory[expense.category] = (stats.byCategory[expense.category] || 0) + amount
  })

  return stats
}

export const getExpensesByDateRange = (expenses: Expense[], days: number = 7): Expense[] => {
  const now = new Date()
  const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)

  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    return expenseDate >= cutoffDate
  })
}

