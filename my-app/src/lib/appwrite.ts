import { Client, Account, Databases } from 'appwrite'
import { isAuthError } from '../types/errors'

const client = new Client()

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Use environment variables
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

// Create account instance with proper configuration
export const account = new Account(client)

// Create databases instance
export const database = new Databases(client)

// Function to check if user is authenticated
export const isAuthenticated = async () => {
    try {
        await account.get()
        return true
    } catch (error) {
        if (isAuthError(error)) {
            return false
        }
        // Log non-authentication errors
        console.error('Authentication check failed:', error)
        return false
    }
}

// Function to get current user
export const getCurrentUser = async () => {
    try {
        return await account.get()
    } catch (error) {
        if (isAuthError(error)) {
            return null
        }
        // Log non-authentication errors
        console.error('Failed to get current user:', error)
        return null
    }
}

// Function to get user preferences safely
export const getUserPrefs = async () => {
    try {
        return await account.getPrefs()
    } catch (error) {
        if (isAuthError(error)) {
            return null
        }
        // Log non-authentication errors
        console.error('Failed to get user preferences:', error)
        return null
    }
}

export const STARTER_DB_ID = import.meta.env.VITE_STARTER_DB_ID // Use environment variables
export const ROADMAP_ID = import.meta.env.VITE_ROADMAP_ID
export const BLOGSPOT_ID = import.meta.env.VITE_BLOGSPOT_ID
export const SUBSCRIBERS_ID = import.meta.env.VITE_SUBSCRIBERS_ID

export { ID } from 'appwrite'
