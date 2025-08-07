'use client'

import { useState } from 'react'
import { Screen } from './Dashboard'

interface BillsManagementProps {
  onNavigate: (screen: Screen) => void
}

export default function BillsManagement({ onNavigate }: BillsManagementProps) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'overdue' | 'all'>('upcoming')

  const urgentBills = [
    { id: 1, name: "Electric Bill", amount: 127, dueDate: "Tomorrow", icon: "⚡", status: "urgent" },
    { id: 2, name: "Verizon", amount: 89, dueDate: "Jan 25 (3 days)", icon: "📱", status: "urgent" },
  ]

  const scheduledBills = [
    { id: 3, name: "Mortgage", amount: 1850, dueDate: "Feb 1", icon: "🏠", status: "scheduled" },
    { id: 4, name: "Car Payment", amount: 425, dueDate: "Feb 5", icon: "🚗", status: "scheduled" },
  ]

  const subscriptions = [
    { id: 5, name: "Netflix", amount: 15.99, dueDate: "Feb 8", icon: "📺", frequency: "Monthly" },
    { id: 6, name: "Dropbox", amount: 9.99, dueDate: "Feb 12", icon: "☁️", frequency: "Monthly" },
    { id: 7, name: "Spotify", amount: 9.99, dueDate: "Feb 15", icon: "🎵", frequency: "Monthly" },
    { id: 8, name: "Adobe Creative", amount: 52.99, dueDate: "Feb 20", icon: "🎨", frequency: "Monthly" },
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
          <h1 className="text-lg font-semibold text-gray-900">Bills & Subscriptions</h1>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'overdue', label: 'Overdue' },
          { key: 'all', label: 'All' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {/* Urgent Bills */}
        <div className="mb-6">
          <p className="text-sm font-medium text-red-600 uppercase tracking-wider mb-3">
            URGENT - DUE SOON
          </p>
          <div className="space-y-3">
            {urgentBills.map((bill) => (
              <div key={bill.id} className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{bill.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{bill.name}</p>
                      <p className="text-sm text-red-600">Due: {bill.dueDate}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-900">${bill.amount}</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                    Pay Now
                  </button>
                  <button className="flex-1 bg-white border border-red-200 text-red-600 text-sm font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition-colors">
                    Schedule
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* This Month's Bills */}
        <div className="mb-6">
          <p className="text-sm font-medium text-orange-600 uppercase tracking-wider mb-3">
            THIS MONTH&apos;S BILLS
          </p>
          <div className="space-y-3">
            {scheduledBills.map((bill) => (
              <div key={bill.id} className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{bill.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{bill.name}</p>
                      <p className="text-sm text-orange-600">Auto-pay: {bill.dueDate}</p>
                      <p className="text-xs text-green-600 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Scheduled
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-900">${bill.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscriptions */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-medium text-blue-600 uppercase tracking-wider">
              SUBSCRIPTIONS
            </p>
            <p className="text-sm text-gray-500">View All ({subscriptions.length + 4})</p>
          </div>
          <div className="space-y-3">
            {subscriptions.slice(0, 2).map((subscription) => (
              <div key={subscription.id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-lg">{subscription.icon}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{subscription.name}</p>
                      <p className="text-sm text-blue-600">{subscription.frequency} • Next: {subscription.dueDate}</p>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-gray-900">${subscription.amount}</p>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 bg-white border border-blue-200 text-blue-600 text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                    Pause
                  </button>
                  <button className="flex-1 bg-white border border-red-200 text-red-600 text-sm font-medium py-2 px-4 rounded-lg hover:bg-red-50 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
            <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-sm font-medium">Add New Bill or Subscription</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}