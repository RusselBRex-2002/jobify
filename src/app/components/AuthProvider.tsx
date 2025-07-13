'use client'

import { createContext, useState, useEffect, useContext, ReactNode } from 'react'
import { onUserStateChange } from '../../../lib/firebaseClient'
import type { User } from 'firebase/auth'

type AuthContextType = { user: User | null }
const AuthContext = createContext<AuthContextType>({ user: null })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onUserStateChange(firebaseUser => {
      setUser(firebaseUser)
    })
    return unsubscribe
  }, [])

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
