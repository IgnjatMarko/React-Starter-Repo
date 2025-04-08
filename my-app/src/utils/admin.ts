import { account, isAuthenticated } from '../lib/appwrite'
import { isAuthError } from '../types/errors'

export const setAdminRole = async () => {
    try {
        // Check if user is authenticated first
        const authenticated = await isAuthenticated()
        if (!authenticated) {
            throw new Error('User is not authenticated')
        }

        // Update user preferences to set admin role
        await account.updatePrefs({
            role: 'admin'
        })
        console.log('Admin role set successfully')
        return true
    } catch (error) {
        console.log('Error setting admin role:', error)
        return false
    }
}

export const checkAdminRole = async () => {
    try {
        // Check if user is authenticated first
        const authenticated = await isAuthenticated()
        if (!authenticated) {
            return false
        }

        // Get current user
        const user = await account.get()
        // Check if user has admin role
        return user.labels?.includes('admin') || false
    } catch (error) {
        if (isAuthError(error)) {
            return false
        }
        // Log non-authentication errors
        console.error('Error checking admin role:', error)
        return false
    }
}

// This function should be called from the Appwrite console or server-side
export const addAdminLabel = async () => {
    try {
        // This would typically be done server-side or through the Appwrite console
        // For client-side testing, you can use the Appwrite console to add the 'admin' label to a user
        console.log('To add admin role, use the Appwrite console:')
        console.log('1. Go to your Appwrite project')
        console.log('2. Navigate to Users')
        console.log('3. Find your user')
        console.log('4. Add the label "admin"')
        return false
    } catch (error) {
        if (isAuthError(error)) {
            console.error('Authentication error while adding admin label:', error)
        } else {
            console.error('Error adding admin label:', error)
        }
        return false
    }
} 