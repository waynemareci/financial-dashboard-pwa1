'use client'

import { useState } from 'react'
import { Screen } from './Dashboard'

interface DashboardOverviewProps {
  onNavigate: (screen: Screen) => void
}

// Sample data - in real app this would come from API/database
const sampleData = {
  receivables: 4200,
  payables: 1850,
  netCash: 2350
}

export default function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const [data] = useState(sampleData)
  
  // Calculate net cash position (receivables - payables)
  const netCash = data.receivables - data.payables
  const isPositive = netCash >= 0

  // Handle swipe gesture for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    
    if (isLeftSwipe) {
      onNavigate('transactions') // Navigate to combined detail view
    }
  }

  return (
    <div 
      className="bg-gray-50 min-h-screen flex flex-col justify-center px-6"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Circular Net Cash Position */}
      <div className="flex justify-center mb-12">
        <div className="relative">
          {/* Circular Background */}
          <div 
            className={`w-64 h-64 rounded-full flex items-center justify-center transition-colors duration-300 ${
              isPositive 
                ? 'bg-gradient-to-br from-green-400 to-green-600' 
                : 'bg-gradient-to-br from-red-400 to-red-600'
            }`}
          >
            <div className="text-center">
              <p className="text-white text-xs font-medium uppercase tracking-wider mb-2 opacity-90">
                NET CASH POSITION
              </p>
              <p className={`text-5xl font-bold text-white mb-1`}>
                {isPositive ? '+' : ''}${Math.abs(netCash).toLocaleString()}
              </p>
              <p className="text-white text-sm opacity-75">
                30-day rolling
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Receivables and Payables - Stacked Vertically */}
      <div className="space-y-6 mb-8">
        {/* Receivables */}
        <button
          onClick={() => onNavigate('transactions')}
          className="w-full bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
        >
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wider mb-2">
              RECEIVABLES
            </p>
            <p className="text-3xl font-bold text-green-600">
              +${data.receivables.toLocaleString()}
            </p>
          </div>
        </button>

        {/* Payables */}
        <button
          onClick={() => onNavigate('transactions')}
          className="w-full bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
        >
          <div className="text-center">
            <p className="text-gray-600 text-sm font-medium uppercase tracking-wider mb-2">
              PAYABLES
            </p>
            <p className="text-3xl font-bold text-red-600">
              -${data.payables.toLocaleString()}
            </p>
          </div>
        </button>
      </div>

      {/* Subtle hint for interaction */}
      <div className="text-center">
        <p className="text-gray-400 text-sm">
          Swipe left for details →
        </p>
      </div>
    </div>
  )
}