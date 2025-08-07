'use client'

import { useState } from 'react'
import BottomNavigation from './BottomNavigation'
import DashboardOverview from './DashboardOverview'
import AccountDetails from './AccountDetails'
import BillsManagement from './BillsManagement'
import TransactionHistory from './TransactionHistory'

export type Screen = 'dashboard' | 'accounts' | 'bills' | 'transactions' | 'settings'

export default function Dashboard() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard')

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardOverview onNavigate={setCurrentScreen} />
      case 'accounts':
        return <AccountDetails onNavigate={setCurrentScreen} />
      case 'bills':
        return <BillsManagement onNavigate={setCurrentScreen} />
      case 'transactions':
        return <TransactionHistory onNavigate={setCurrentScreen} />
      case 'settings':
        return <div className="p-4">Settings Coming Soon</div>
      default:
        return <DashboardOverview onNavigate={setCurrentScreen} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">
      <main className="flex-1 pb-20">
        {renderScreen()}
      </main>
      <BottomNavigation currentScreen={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  )
}