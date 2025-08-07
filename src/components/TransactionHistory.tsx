'use client'

import { useState } from 'react'
import { Screen } from './Dashboard'

interface TransactionHistoryProps {
  onNavigate: (screen: Screen) => void
}

// Define the drill-down levels
type DrillDownLevel = 'summary' | 'categories' | 'items' | 'details'

// Sample data structure
const cashFlowData = {
  receivables: {
    total: 4200,
    categories: {
      salary: { total: 3500, items: [
        { id: 'sal1', name: 'Monthly Salary', amount: 3500, date: 'Feb 1', description: 'Regular payroll', account: 'Direct Deposit', status: 'Confirmed' }
      ]},
      refunds: { total: 450, items: [
        { id: 'ref1', name: 'Tax Refund', amount: 350, date: 'Feb 15', description: 'Federal tax refund', account: 'IRS', status: 'Pending' },
        { id: 'ref2', name: 'Amazon Return', amount: 100, date: 'Feb 10', description: 'Product return refund', account: 'Amazon', status: 'Confirmed' }
      ]},
      investment: { total: 250, items: [
        { id: 'inv1', name: 'Dividend Payment', amount: 150, date: 'Feb 5', description: 'AAPL quarterly dividend', account: 'Brokerage', status: 'Confirmed' },
        { id: 'inv2', name: 'Interest Income', amount: 100, date: 'Feb 1', description: 'High-yield savings interest', account: 'Marcus', status: 'Confirmed' }
      ]}
    }
  },
  payables: {
    total: 1850,
    categories: {
      overdue: { total: 127, items: [
        { id: 'over1', name: 'Electric Bill', amount: 127, date: 'Jan 29', description: 'Monthly electricity', account: 'PG&E', status: 'OVERDUE' }
      ]},
      dueSoon: { total: 923, items: [
        { id: 'due1', name: 'Rent Payment', amount: 800, date: 'Feb 1', description: 'Monthly rent', account: 'Property Mgmt', status: 'DUE SOON' },
        { id: 'due2', name: 'Phone Bill', amount: 123, date: 'Feb 3', description: 'Monthly phone service', account: 'Verizon', status: 'DUE SOON' }
      ]},
      future: { total: 800, items: [
        { id: 'fut1', name: 'Car Payment', amount: 425, date: 'Feb 15', description: 'Monthly auto loan', account: 'Honda Finance', status: 'Future' },
        { id: 'fut2', name: 'Insurance', amount: 375, date: 'Feb 20', description: 'Auto insurance premium', account: 'State Farm', status: 'Future' }
      ]}
    }
  }
}

export default function TransactionHistory({ onNavigate }: TransactionHistoryProps) {
  const [level, setLevel] = useState<DrillDownLevel>('summary')
  const [selectedType, setSelectedType] = useState<'receivables' | 'payables' | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedItem, setSelectedItem] = useState<{ id: string; name: string; amount: number; date: string; description: string; account: string; status: string } | null>(null)
  
  // Breadcrumb navigation
  const breadcrumbs: Array<{ label: string; onClick: () => void }> = []
  if (level !== 'summary') breadcrumbs.push({ label: 'Cash Flow Details', onClick: () => setLevel('summary') })
  if (level === 'items' || level === 'details') {
    breadcrumbs.push({ 
      label: selectedType === 'receivables' ? 'Receivables' : 'Payables', 
      onClick: () => setLevel('categories') 
    })
  }
  if (level === 'details') {
    breadcrumbs.push({ 
      label: selectedCategory || 'Category', 
      onClick: () => setLevel('items') 
    })
  }

  // Handle swipe right for mobile back navigation
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchEnd - touchStart
    const isRightSwipe = distance > 50
    
    if (isRightSwipe) {
      handleBack()
    }
  }

  const handleBack = () => {
    if (level === 'details') {
      setLevel('items')
      setSelectedItem(null)
    } else if (level === 'items') {
      setLevel('categories')
      setSelectedCategory(null)
    } else if (level === 'categories') {
      setLevel('summary')
      setSelectedType(null)
    } else {
      onNavigate('dashboard')
    }
  }

  const renderHeader = () => {
    let title = '30-Day Cash Flow Details'
    if (level === 'categories') title = selectedType === 'receivables' ? 'Receivables Categories' : 'Payables Categories'
    if (level === 'items') title = selectedCategory || 'Items'
    if (level === 'details') title = selectedItem?.name || 'Details'

    return (
      <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        </div>
      </div>
    )
  }

  const renderBreadcrumbs = () => {
    if (breadcrumbs.length === 0) return null
    
    return (
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
        <div className="flex items-center gap-2 text-sm">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-2">
              <button 
                onClick={crumb.onClick}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {crumb.label}
              </button>
              {index < breadcrumbs.length - 1 && (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderSummaryLevel = () => (
    <div className="p-6 space-y-6">
      {/* Receivables Section */}
      <button
        onClick={() => {
          setSelectedType('receivables')
          setLevel('categories')
        }}
        className="w-full bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wider mb-2">
              RECEIVABLES
            </p>
            <p className="text-3xl font-bold text-green-600">
              +${cashFlowData.receivables.total.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">By Source</p>
          </div>
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>

      {/* Payables Section */}
      <button
        onClick={() => {
          setSelectedType('payables')
          setLevel('categories')
        }}
        className="w-full bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wider mb-2">
              PAYABLES
            </p>
            <p className="text-3xl font-bold text-red-600">
              -${cashFlowData.payables.total.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500 mt-1">By Urgency</p>
          </div>
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  )

  const renderCategoriesLevel = () => {
    const data = selectedType === 'receivables' ? cashFlowData.receivables : cashFlowData.payables
    const categories = data.categories
    
    const getCategoryLabel = (key: string) => {
      const labels: { [key: string]: string } = {
        salary: 'Salary',
        refunds: 'Refunds', 
        investment: 'Investment',
        overdue: 'Overdue',
        dueSoon: 'Due Soon',
        future: 'Future'
      }
      return labels[key] || key
    }

    const getCategoryColor = (key: string) => {
      if (selectedType === 'payables') {
        if (key === 'overdue') return 'text-red-600 bg-red-50 border-red-200'
        if (key === 'dueSoon') return 'text-orange-600 bg-orange-50 border-orange-200'
        return 'text-gray-600 bg-gray-50 border-gray-200'
      }
      return 'text-green-600 bg-green-50 border-green-200'
    }

    return (
      <div className="p-4 space-y-3">
        {Object.entries(categories).map(([key, category]) => (
          <button
            key={key}
            onClick={() => {
              setSelectedCategory(key)
              setLevel('items')
            }}
            className={`w-full p-4 rounded-lg border hover:shadow-sm transition-shadow ${getCategoryColor(key)}`}
          >
            <div className="flex justify-between items-center">
              <div className="text-left">
                <p className="font-medium">{getCategoryLabel(key)}</p>
                <p className="text-sm opacity-75">{category.items.length} item{category.items.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">
                  {selectedType === 'receivables' ? '+' : '-'}${category.total.toLocaleString()}
                </p>
                <svg className="w-5 h-5 opacity-60 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    )
  }

  const renderItemsLevel = () => {
    const categoryData = selectedType === 'receivables' 
      ? cashFlowData.receivables.categories[selectedCategory as keyof typeof cashFlowData.receivables.categories]
      : cashFlowData.payables.categories[selectedCategory as keyof typeof cashFlowData.payables.categories]
    
    if (!categoryData) return null

    return (
      <div className="p-4 space-y-3">
        {categoryData.items.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setSelectedItem(item)
              setLevel('details')
            }}
            className="w-full p-4 bg-white rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div className="text-left">
                <p className="font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-500">Due: {item.date}</p>
                <p className={`text-xs font-medium ${
                  item.status === 'OVERDUE' ? 'text-red-600' : 
                  item.status === 'DUE SOON' ? 'text-orange-600' : 
                  'text-green-600'
                }`}>
                  {item.status}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-bold text-lg ${selectedType === 'receivables' ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedType === 'receivables' ? '+' : '-'}${item.amount.toLocaleString()}
                </p>
                <svg className="w-5 h-5 text-gray-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    )
  }

  const renderDetailsLevel = () => {
    if (!selectedItem) return null

    return (
      <div className="p-6 bg-white">
        <div className="space-y-6">
          <div className="text-center pb-6 border-b border-gray-100">
            <p className={`text-4xl font-bold mb-2 ${selectedType === 'receivables' ? 'text-green-600' : 'text-red-600'}`}>
              {selectedType === 'receivables' ? '+' : '-'}${selectedItem.amount.toFixed(2)}
            </p>
            <p className="text-lg font-medium text-gray-900">{selectedItem.name}</p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Amount:</span>
              <span className="font-semibold">${selectedItem.amount.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Due Date:</span>
              <span className="font-semibold">{selectedItem.date}</span>
            </div>
            
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Description:</span>
              <span className="font-semibold text-right">{selectedItem.description}</span>
            </div>
            
            <div className="flex justify-between py-3 border-b border-gray-100">
              <span className="text-gray-600 font-medium">Account:</span>
              <span className="font-semibold">{selectedItem.account}</span>
            </div>
            
            <div className="flex justify-between py-3">
              <span className="text-gray-600 font-medium">Status:</span>
              <span className={`font-bold ${
                selectedItem.status === 'OVERDUE' ? 'text-red-600' : 
                selectedItem.status === 'DUE SOON' ? 'text-orange-600' : 
                'text-green-600'
              }`}>
                {selectedItem.status}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (level) {
      case 'summary': return renderSummaryLevel()
      case 'categories': return renderCategoriesLevel()
      case 'items': return renderItemsLevel()
      case 'details': return renderDetailsLevel()
      default: return renderSummaryLevel()
    }
  }

  return (
    <div 
      className="bg-gray-50 min-h-screen"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {renderHeader()}
      {renderBreadcrumbs()}
      {renderContent()}
    </div>
  )
}