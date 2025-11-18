'use client'

import { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { apiRequest } from '../../lib/api'

interface Driver {
  id: string
  name: string
  status: string
}

interface Job {
  id: string
  assignedDriverId: string | null
  status: string
}

export default function AdminDrivers() {
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newDriverName, setNewDriverName] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [driversData, jobsData] = await Promise.all([
        apiRequest('/api/drivers'),
        apiRequest('/api/jobs'),
      ])
      setDrivers(driversData)
      setJobs(jobsData)
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddDriver = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDriverName.trim()) return

    setIsSubmitting(true)
    try {
      await apiRequest('/api/drivers', {
        method: 'POST',
        body: JSON.stringify({ name: newDriverName }),
      })
      setNewDriverName('')
      await loadData()
    } catch (error: any) {
      alert(error.message || 'Failed to add driver')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getJobCount = (driverId: string) => {
    return jobs.filter(job => job.assignedDriverId === driverId).length
  }

  const getActiveJobCount = (driverId: string) => {
    return jobs.filter(job => 
      job.assignedDriverId === driverId && 
      (job.status === 'Pending' || job.status === 'In Progress')
    ).length
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-12">Loading...</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Drivers Management</h1>
          <p className="text-gray-600 mt-1">Manage your delivery drivers</p>
        </div>

        {/* Add Driver Form */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Driver</h2>
          <form onSubmit={handleAddDriver} className="flex space-x-3">
            <input
              type="text"
              value={newDriverName}
              onChange={(e) => setNewDriverName(e.target.value)}
              placeholder="Driver name"
              required
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Adding...' : 'Add Driver'}
            </button>
          </form>
        </div>

        {/* Drivers List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Drivers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Jobs</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Jobs</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{driver.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        driver.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {driver.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getJobCount(driver.id)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getActiveJobCount(driver.id)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  )
}

