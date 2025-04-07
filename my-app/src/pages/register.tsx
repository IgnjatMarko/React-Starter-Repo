import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { account, ID } from '../lib/appwrite'

export default function RegisterComponent() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate({ from: '/register' })

    const register = async () => {
        try {
            await account.create(ID.unique(), email, password, name)
            navigate({ to: '/login' }) // Redirect to login page after successful registration
        } catch (err: any) {
            setError(err.message || 'Failed to register')
        }
    }

    return (
        <div className="hero bg-base-100 min-h-layout">
            {error && <p className="text-red-500">{error}</p>}
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card bg-base-100 w-96 shrink-0 card-border shadow-2xl">
                    <div className="card-body">
                        <h2 className="text-2xl font-bold mb-4">Register</h2>
                        <fieldset className="fieldset">
                            <label className="fieldset-label">Name</label>
                            <input
                                type="text"
                                className="input"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label className="fieldset-label">Email</label>
                            <input
                                type="email"
                                className="input"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className="fieldset-label">Password</label>
                            <input
                                type="password"
                                className="input"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                className="btn btn-primary mt-4"
                                onClick={register}
                            >
                                Register
                            </button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}
