export interface AppwriteError extends Error {
    code?: number
    type?: string
    response?: {
        message?: string
    }
}

export const isAppwriteError = (error: unknown): error is AppwriteError => {
    return error instanceof Error && 'code' in error
}

export const isAuthError = (error: unknown): boolean => {
    if (!isAppwriteError(error)) return false
    return (
        error.message?.includes('session') ||
        error.message?.includes('unauthorized') ||
        error.code === 401 ||
        error.code === 403
    )
} 