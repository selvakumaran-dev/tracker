export interface Expense {
  id: string
  amount: number
  description: string
  category: string
  date: string
  createdAt: number
}

export interface ExpenseStats {
  total: number
  today: number
  thisWeek: number
  thisMonth: number
  byCategory: Record<string, number>
}

