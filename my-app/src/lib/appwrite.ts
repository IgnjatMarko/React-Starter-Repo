import { Client, Account, Databases } from 'appwrite'

const client = new Client()

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // Use environment variable
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID) // Replace with your project ID

export const account: Account = new Account(client)

export const database: Databases = new Databases(client)

export const TODOLIST_DB_ID = import.meta.env.VITE_TODOLIST_DB_ID // Replace with your Appwrite database ID
export const ROADMAP_ID = import.meta.env.VITE_ROADMAP_ID // Replace with your Appwrite collection ID

export { ID } from 'appwrite'
