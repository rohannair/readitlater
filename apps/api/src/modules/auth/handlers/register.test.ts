import { beforeEach, describe, expect, it, mock } from 'bun:test'
import { register } from './register'

describe('Register Endpoint', () => {
  beforeEach(() => {
    // Reset mocks before each test by re-mocking the modules
    mock.module('src/lib/db/repositories/users.repository', () => ({
      userRepository: {
        getUserByEmail: () => {},
        createUser: () => {},
      },
    }))

    mock.module('src/lib/crypto', () => ({
      hash: () => {},
    }))
  })

  it('should register a new user and set a cookie', async () => {
    const mockUser = { id: '1', email: 'test@example.com' }
    const mockCookie = {
      name: 'session',
      value: 'mockSessionId',
      attributes: {},
    }

    mock.module('src/lib/db/repositories/users.repository', () => ({
      userRepository: {
        getUserByEmail: () => null,
        createUser: () => ({ user: mockUser, cookie: mockCookie }),
      },
    }))

    mock.module('src/lib/crypto', () => ({
      hash: () => 'hashedPassword',
    }))

    const requestBody = {
      email: 'test@example.com',
      password: 'password123',
    }

    const res = await register.request('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    expect(res.status).toBe(201)

    const responseBody = await res.json()
    expect(responseBody).toEqual({
      message: 'User registered successfully',
      user: mockUser,
    })

    // Check if the cookie is set
    const setCookieHeader = res.headers.get('Set-Cookie')
    expect(setCookieHeader).toBeDefined()
    expect(setCookieHeader).toContain(`${mockCookie.name}=${mockCookie.value}`)
  })

  it('should return an error if the user already exists', async () => {
    mock.module('src/lib/db/repositories/users.repository', () => ({
      userRepository: {
        getUserByEmail: () => ({ id: '1', email: 'existing@example.com' }),
      },
    }))

    const requestBody = {
      email: 'existing@example.com',
      password: 'password123',
    }

    const res = await register.request('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })

    expect(res.status).toBe(400)

    const responseBody = await res.json()
    expect(responseBody).toEqual({ error: 'User already exists' })
  })
})
