import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { account } from '../lib/appwrite'
import { useAuth } from '../context/AuthContext'

export default function LoginComponent() {
    const { setIsLoggedIn } = useAuth() // Use global authentication state
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate() // TanStack Router navigation

    const login = async (email: string, password: string) => {
        try {
            await account.createEmailPasswordSession(email, password) // Create session
            setIsLoggedIn(true) // Update global login state
            setError(null) // Clear any previous errors
            navigate({ to: '/' }) // Redirect to homepage
        } catch (err: any) {
            setError(err.message || 'Failed to log in') // Handle errors
        }
    }

    return (
        <div className="hero bg-base-100 min-h-layout">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-96 shrink-0 card-border shadow-2xl">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold mb-4">Login</h2>
                        {error && (
                            <div role="alert" className="alert alert-error">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 shrink-0 stroke-current"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}
                        <fieldset className="fieldset">
                            <label className="fieldset-label">Email</label>
                            <input
                                type="email"
                                className="input input-bordered w-full mb-4"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="fieldset-label">Password</label>
                            <input
                                type="password"
                                className="input input-bordered w-full mb-4"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                className="btn btn-primary w-full mt-4"
                                onClick={() => login(email, password)}
                            >
                                Login
                            </button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}
