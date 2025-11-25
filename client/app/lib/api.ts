function getApiUrl(): string {
  // Runtime detection only - no build-time env var dependency
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    const protocol = window.location.protocol
    
    // If we're on Railway (production), try to construct backend URL
    if (hostname.includes('railway.app') || hostname.includes('up.railway.app')) {
      // Try multiple replacement patterns to find the backend
      // Railway URLs have format: service-name-production-hash.up.railway.app
      let backendHostname = hostname
        .replace(/frontend-production-[a-z0-9]+/, 'backend-production-4819') // Use known backend hash
        .replace('frontend', 'backend')
        .replace('dallas-courier-frontend', 'dallas-courier-backend')
        .replace('client', 'server')
      
      // If the replacement didn't change anything, try the known backend URL
      if (backendHostname === hostname && hostname.includes('dallas-courier-frontend')) {
        backendHostname = 'dallas-courier-backend-production-4819.up.railway.app'
      }
      
      const backendUrl = `${protocol}//${backendHostname}`
      console.log('Detected Railway environment. Using backend URL:', backendUrl)
      return backendUrl
    }
    
    // If on localhost, use localhost backend
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:4000'
    }
  }

  // Server-side fallback
  return 'http://localhost:4000'
}

export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const API_URL = getApiUrl()
  const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }))
      throw new Error(error.error || `Request failed: ${response.status} ${response.statusText}`)
    }

    return response.json()
  } catch (error: any) {
    // Provide more helpful error messages
    if (error.message?.includes('Failed to fetch') || error.message?.includes('NetworkError')) {
      console.error('API Request failed:', {
        url: `${API_URL}${endpoint}`,
        apiUrl: API_URL,
        hostname: typeof window !== 'undefined' ? window.location.hostname : 'server'
      })
      throw new Error(`Cannot connect to backend at ${API_URL}. Please check your backend service is running.`)
    }
    throw error
  }
}






