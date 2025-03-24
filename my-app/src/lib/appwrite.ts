import { Client, Account, Databases } from 'appwrite'
// Import type models for Appwrite
//import { type Models } from 'appwrite';

const client = new Client()

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Use environment variable
    .setProject('67dfe00f0037c42a6d34') // Replace with your project ID

export const account: Account = new Account(client)

export const database: Databases = new Databases(client)

export const TODOLIST_DB_ID = '67e02c70001b381faf43' // Replace with your Appwrite database ID
export const ROADMAP_ID = '67e02c9f0030a084b8aa' // Replace with your Appwrite collection ID

export { ID } from 'appwrite'
