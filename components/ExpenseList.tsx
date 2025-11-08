'use client'

import { Expense } from '@/types/expense'
import { formatCurrency } from '@/lib/utils'
import { format } from 'date-fns'
import { Trash2 } from 'lucide-react'

interface ExpenseListProps {
  expenses: Expense[]
  onDelete: (id: string) => void
}

const categoryColors: Record<string, string> = {
  Food: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  Transport: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Shopping: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  Bills: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  Entertainment: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  Health: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Education: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  Other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
}

export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No expenses yet. Add your first expense!</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">Recent Expenses</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
        {expenses
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .map((expense) => (
            <div
              key={expense.id}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800 dark:text-white">
                      {expense.description}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        categoryColors[expense.category] || categoryColors.Other
                      }`}
                    >
                      {expense.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {format(new Date(expense.date), 'MMM dd, yyyy')}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-lg font-bold text-gray-800 dark:text-white">
                    {formatCurrency(expense.amount)}
                  </p>
                  <button
                    onClick={() => onDelete(expense.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    aria-label="Delete expense"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

