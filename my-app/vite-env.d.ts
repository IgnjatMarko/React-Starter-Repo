/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APPWRITE_ENDPOINT: string
    readonly VITE_APPWRITE_PROJECT_ID: string
    readonly VITE_TODOLIST_DB_ID: string
    readonly VITE_ROADMAP_ID: string
    // Add other environment variables here
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
