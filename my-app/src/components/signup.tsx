import { useState } from 'react'
import { STARTER_DB_ID, SUBSCRIBERS_ID, database, ID } from '../lib/appwrite'

export const Signup = () => {
    const [email, setEmail] = useState<string>('')
    const [toast, setToast] = useState<{
        type: 'info' | 'success' | 'error'
        message: string
    } | null>(null)

    const validateEmail = (email: string) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        return regex.test(email)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateEmail(email)) {
            setToast({
                type: 'error',
                message: 'Please enter a valid email address',
            })
            setTimeout(() => setToast(null), 3000)
            return
        }

        try {
            setToast({ type: 'info', message: 'Subscribing...' })
            await database.createDocument(
                STARTER_DB_ID,
                SUBSCRIBERS_ID,
                ID.unique(),
                { email }
            )
            setToast({ type: 'success', message: 'Successfully subscribed!' })
            setEmail('')
        } catch (error) {
            console.error('Error subscribing:', error)
            setToast({
                type: 'error',
                message: 'Failed to subscribe. Please try again.',
            })
        }
        setTimeout(() => setToast(null), 3000)
    }

    return (
        <>
            <div className="join">
                <div>
                    <label className="input join-item">
                        <svg
                            className="h-[1em] opacity-50"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <rect
                                    width="20"
                                    height="16"
                                    x="2"
                                    y="4"
                                    rx="2"
                                ></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Newsletter subscription"
                            className="w-full"
                            required
                        />
                    </label>
                </div>
                <button
                    className="btn btn-primary join-item"
                    onClick={handleSubmit}
                    disabled={!email.trim()}
                >
                    Join
                </button>
            </div>

            {toast && (
                <div className="toast toast-bottom toast-middle">
                    <div
                        className={`alert ${
                            toast.type === 'error'
                                ? 'alert-error'
                                : toast.type === 'success'
                                  ? 'alert-success'
                                  : 'alert-info'
                        }`}
                    >
                        <span>{toast.message}</span>
                    </div>
                </div>
            )}
        </>
    )
}
