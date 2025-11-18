'use client'

import { useAuth } from '../contexts/AuthContext'
import Link from 'next/link'

export function Navbar() {
  const { user, logout } = useAuth()

  if (!user) return null

  const roleLabel = user.role === 'admin' ? 'Admin' : 'Driver'

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link href={user.role === 'admin' ? '/admin/dashboard' : '/driver/dashboard'} className="text-xl font-bold text-gray-900">
              Dallas Delivery Portal <span className="text-sm font-normal text-gray-500">(Demo)</span>
            </Link>
            {user.role === 'admin' && (
              <div className="hidden md:flex space-x-4">
                <Link href="/admin/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
                <Link href="/admin/jobs" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Jobs
                </Link>
                <Link href="/admin/drivers" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Drivers
                </Link>
                <Link href="/admin/activity" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium">
                  Activity
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{roleLabel}</p>
            </div>
            <button
              onClick={logout}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}


