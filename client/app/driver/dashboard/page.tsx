'use client'

import { useEffect, useState } from 'react'
import { Layout } from '../../components/Layout'
import { useAuth } from '../../contexts/AuthContext'
import { apiRequest } from '../../lib/api'

interface Job {
  id: string
  customerName: string
  pickupAddress: string
  dropoffAddress: string
  price: number
  status: string
  createdAt: string
}

export default function DriverDashboard() {
  const { user } = useAuth()
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [updatingJobId, setUpdatingJobId] = useState<string | null>(null)

  useEffect(() => {
    loadJobs()
  }, [])

  const loadJobs = async () => {
    try {
      const data = await apiRequest('/api/jobs')
      setJobs(data)
    } catch (error) {
      console.error('Failed to load jobs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleStatusUpdate = async (jobId: string, newStatus: string) => {
    setUpdatingJobId(jobId)
    try {
      await apiRequest(`/api/jobs/${jobId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      })
      await loadJobs()
    } catch (error: any) {
      alert(error.message || 'Failed to update job status')
    } finally {
      setUpdatingJobId(null)
    }
  }

  const pendingJobs = jobs.filter(job => job.status === 'Pending')
  const inProgressJobs = jobs.filter(job => job.status === 'In Progress')

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
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
          <p className="text-gray-600 mt-1">Your assigned delivery jobs</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <strong>Demo Environment:</strong> This is a demo with fake data. Data resets when the server restarts.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">Pending Jobs</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">{pendingJobs.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600">In Progress</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{inProgressJobs.length}</p>
          </div>
        </div>

        {/* Jobs List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">My Jobs</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {jobs.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">No jobs assigned yet</div>
            ) : (
              jobs.map((job) => (
                <div key={job.id} className="px-6 py-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{job.customerName}</h3>
                      <p className="text-sm text-gray-500 mt-1">Job #{job.id}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      job.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : job.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {job.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase mb-1">Pickup</p>
                      <p className="text-sm text-gray-900">{job.pickupAddress}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500 uppercase mb-1">Dropoff</p>
                      <p className="text-sm text-gray-900">{job.dropoffAddress}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold text-gray-900">${job.price.toFixed(2)}</p>
                    {job.status === 'Pending' && (
                      <button
                        onClick={() => handleStatusUpdate(job.id, 'In Progress')}
                        disabled={updatingJobId === job.id}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updatingJobId === job.id ? 'Starting...' : 'Start Job'}
                      </button>
                    )}
                    {job.status === 'In Progress' && (
                      <button
                        onClick={() => handleStatusUpdate(job.id, 'Completed')}
                        disabled={updatingJobId === job.id}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {updatingJobId === job.id ? 'Completing...' : 'Mark as Completed'}
                      </button>
                    )}
                    {job.status === 'Completed' && (
                      <span className="text-sm text-gray-500">Job completed</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

