import api from '../plugins/axios'

export default class AuthService {
  async login(email, password) {
    try {
      const response = await api.post('/token/', { email, password })
      return response.data
    } catch (err) {
      console.error('Login error:', err)
      throw new Error('Login failed')
    }
  }

  async register(userData) {
    try {
      const response = await api.post('/usuario', userData)
      return response.data
    } catch (err) {
      console.error('Registration error:', err)
      throw new Error('Registration failed')
    }
  }

  async me(token){
    try {
      const response = await api.get('/usuario/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
      return response.data
    } catch (err) {
      console.error('Fetch user error:', err)
      throw new Error('Failed to fetch user data')
    }
  }
}
