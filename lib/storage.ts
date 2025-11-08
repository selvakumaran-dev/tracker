import { Expense } from '@/types/expense'

const STORAGE_KEY = 'daily_expenses'

export const getExpenses = (): Expense[] => {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Error reading expenses:', error)
    return []
  }
}

export const saveExpense = (expense: Expense): void => {
  if (typeof window === 'undefined') return
  
  try {
    const expenses = getExpenses()
    expenses.push(expense)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  } catch (error) {
    console.error('Error saving expense:', error)
  }
}

export const deleteExpense = (id: string): void => {
  if (typeof window === 'undefined') return
  
  try {
    const expenses = getExpenses()
    const filtered = expenses.filter((e) => e.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error('Error deleting expense:', error)
  }
}

export const clearAllExpenses = (): void => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing expenses:', error)
  }
}

