'use client'

import { Screen } from './Dashboard'

interface BottomNavigationProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
}

export default function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  const navItems = [
    { 
      id: 'dashboard' as Screen, 
      label: 'Dashboard', 
      icon: '💰',
      activeColor: 'text-blue-600 bg-blue-50' 
    },
    { 
      id: 'transactions' as Screen, 
      label: 'Analytics', 
      icon: '📊',
      activeColor: 'text-green-600 bg-green-50' 
    },
    { 
      id: 'accounts' as Screen, 
      label: 'Accounts', 
      icon: '💳',
      activeColor: 'text-purple-600 bg-purple-50' 
    },
    { 
      id: 'bills' as Screen, 
      label: 'Bills', 
      icon: '⚙️',
      activeColor: 'text-orange-600 bg-orange-50' 
    },
    { 
      id: 'settings' as Screen, 
      label: 'Profile', 
      icon: '👤',
      activeColor: 'text-gray-600 bg-gray-50' 
    },
  ]

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 min-w-0 flex-1 mx-1 ${
                isActive 
                  ? `${item.activeColor} shadow-sm` 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-lg mb-1" role="img" aria-label={item.label}>
                {item.icon}
              </span>
              <span className={`text-xs font-medium truncate ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}