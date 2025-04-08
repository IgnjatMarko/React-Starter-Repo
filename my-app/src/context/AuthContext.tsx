import { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react'
import { isAuthenticated, getCurrentUser } from '../lib/appwrite'
import { checkAdminRole } from '../utils/admin'

interface UserInfo {
    name: string
    email: string
}

interface AuthContextType {
    isLoggedIn: boolean
    setIsLoggedIn: (value: boolean) => void
    isAdmin: boolean
    setIsAdmin: (value: boolean) => void
    userInfo: UserInfo | null
    setUserInfo: (value: UserInfo | null) => void
    checkUserRole: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [isAdmin, setIsAdmin] = useState<boolean>(false)
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [lastCheck, setLastCheck] = useState<number>(0)

    const checkUserRole = useCallback(async () => {
        // Prevent checking too frequently (at least 5 seconds between checks)
        const now = Date.now()
        if (now - lastCheck < 5000) {
            return
        }
        setLastCheck(now)

        try {
            // First check if user is authenticated
            const authenticated = await isAuthenticated()
            if (!authenticated) {
                setIsLoggedIn(false)
                setIsAdmin(false)
                setUserInfo(null)
                return
            }

            // Get current user
            const user = await getCurrentUser()
            if (!user) {
                setIsLoggedIn(false)
                setIsAdmin(false)
                setUserInfo(null)
                return
            }

            setIsLoggedIn(true)
            setUserInfo({
                name: user.name,
                email: user.email
            })
            
            // Check admin role using labels
            const hasAdminRole = await checkAdminRole()
            setIsAdmin(hasAdminRole)
        } catch (error: any) {
            // Only log errors that aren't related to authentication
            if (!error?.message?.includes('session') && !error?.message?.includes('unauthorized')) {
                console.error('Error checking user role:', error)
            }
            setIsLoggedIn(false)
            setIsAdmin(false)
            setUserInfo(null)
        }
    }, [lastCheck])

    // Check authentication status on mount and periodically
    useEffect(() => {
        checkUserRole()
        
        // Set up periodic check (every 15 minutes)
        const interval = setInterval(checkUserRole, 15 * 60 * 1000)
        
        return () => clearInterval(interval)
    }, [checkUserRole])

    return (
        <AuthContext.Provider value={{ 
            isLoggedIn, 
            setIsLoggedIn, 
            isAdmin, 
            setIsAdmin, 
            userInfo,
            setUserInfo,
            checkUserRole 
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
