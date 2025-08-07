'use client'

import { Screen } from './Dashboard'

interface AccountDetailsProps {
  onNavigate: (screen: Screen) => void
}

export default function AccountDetails({ onNavigate }: AccountDetailsProps) {
  const transactions = [
    { id: 1, merchant: "McDonald's", amount: -12.45, date: "Today, 2:30 PM", icon: "🍔", category: "Food & Dining" },
    { id: 2, merchant: "Shell Gas", amount: -45.20, date: "Yesterday, 8:15 AM", icon: "⛽", category: "Transportation" },
    { id: 3, merchant: "Direct Deposit", amount: 2500, date: "Jan 15, 9:00 AM", icon: "💰", category: "Income" },
    { id: 4, merchant: "Walmart", amount: -87.23, date: "Jan 14, 6:45 PM", icon: "🛒", category: "Groceries" },
    { id: 5, merchant: "Netflix", amount: -15.99, date: "Jan 12, 12:00 AM", icon: "📺", category: "Entertainment" },
  ]

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Chase Checking</h1>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>

      {/* Current Balance */}
      <div className="p-6 text-center bg-gradient-to-br from-green-50 to-emerald-50">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-2">
          CURRENT BALANCE
        </p>
        <p className="text-4xl font-bold text-gray-900 mb-1">$3,247.52</p>
        <p className="text-sm text-gray-600">Available: $3,197.52</p>
      </div>

      {/* Account Summary */}
      <div className="p-4">
        <p className="text-sm font-medium text-gray-600 uppercase tracking-wider mb-3">
          ACCOUNT SUMMARY
        </p>
        
        {/* 30-Day Cash Flow */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-4">
          <p className="text-sm font-medium text-gray-900 mb-3">30-Day Cash Flow</p>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">In:</span>
              <span className="text-sm font-medium text-green-600">+$4,200</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Out:</span>
              <span className="text-sm font-medium text-red-600">-$3,850</span>
            </div>
            <div className="flex justify-between border-t border-gray-100 pt-2">
              <span className="text-sm font-medium text-gray-900">Net:</span>
              <span className="text-sm font-bold text-green-600">+$350</span>
            </div>
          </div>
        </div>

        {/* Spending Categories */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-medium text-gray-900">Spending Categories</p>
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              View All
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Food & Dining</span>
              <span className="text-sm font-medium text-gray-900">$520</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Transportation</span>
              <span className="text-sm font-medium text-gray-900">$280</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Utilities</span>
              <span className="text-sm font-medium text-gray-900">$185</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-4 pb-6">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm font-medium text-gray-600 uppercase tracking-wider">
            RECENT TRANSACTIONS
          </p>
          <button 
            className="text-blue-600 text-sm font-medium hover:text-blue-700"
            onClick={() => onNavigate('transactions')}
          >
            Load More
          </button>
        </div>
        
        <div className="space-y-2">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">{transaction.icon}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{transaction.merchant}</p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                  <p className="text-xs text-gray-400">{transaction.category}</p>
                </div>
              </div>
              <p className={`text-sm font-medium ${
                transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}