import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import NotFoundComponent from './404'
import SubscribersList from '../components/subs-list'

export default function AdminComponent() {
    const { isLoggedIn, isAdmin, checkUserRole, userInfo } = useAuth()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const verifyAccess = async () => {
            await checkUserRole()
            setIsLoading(false)
        }
        verifyAccess()
    }, [checkUserRole])

    if (isLoading) {
        return (
            <div className="min-h-layout bg-base-100 py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex justify-center items-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                </div>
            </div>
        )
    }

    if (!isLoggedIn || !isAdmin) {
        return <NotFoundComponent />
    }

    return (
        <div className="min-h-layout bg-base-100 py-12">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-5xl font-bold text-center mb-16 text-accent">
                    Admin Dashboard
                </h1>
                <div className="card bg-base-200 shadow-xl p-6">
                    <h2 className="text-2xl mb-4">Welcome, {userInfo?.name || 'Admin'}</h2>
                    <p>This is a protected admin area.</p>
                    <div className="mt-8">
                        <SubscribersList />
                    </div>
                    <div className="mt-4 text-sm text-base-content/60">
                        <p>Email: {userInfo?.email}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}
