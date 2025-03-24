import { useEffect } from 'react'
import { APP_INFO } from '../assets/constants'
import { useAuth } from '../context/AuthContext'
import { Link } from '@tanstack/react-router'
import { account } from '../lib/appwrite'
import LightComponent, { CyberpunkComponent } from '../utils/themes'

export default function HeaderComponent() {
    const { isLoggedIn, setIsLoggedIn } = useAuth()

    const handleLogout = async () => {
        try {
            await account.deleteSession('current') // Log out the user
            setIsLoggedIn(false) // Update global login state
        } catch (err) {
            console.error('Failed to log out:', err)
        }
    }

    const checkLoginStatus = async () => {
        try {
            const user = await account.get() // Check if the user is logged in
            setIsLoggedIn(!!user) // Update state based on login status
        } catch {
            setIsLoggedIn(false) // If no user is logged in, set to false
        }
    }

    // Check login status when the component mounts
    useEffect(() => {
        checkLoginStatus()
    }, [])

    return (
        <div className="flex items-center justify-between bg-base-100 p-2 space-x-4">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    {APP_INFO.short_name}
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <Link to="/roadmap">Roadmap</Link>
                    </li>
                    <li>
                        <Link to="/about">About</Link>
                    </li>
                    <li>
                        <Link to="/404">404</Link>
                    </li>
                    <li>
                        <div className="dropdown dropdown-bottom dropdown-end">
                            <div tabIndex={0} role="button">
                                Settings ⬇️
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                            >
                                {isLoggedIn ? (
                                    <li>
                                        <a onClick={handleLogout}>Log Out</a>
                                    </li>
                                ) : (
                                    <>
                                        <li>
                                            <Link to="/login">Sign in</Link>
                                        </li>
                                        <li>
                                            <Link to="/register">Register</Link>
                                        </li>
                                    </>
                                )}
                                <li>
                                    <LightComponent />
                                </li>
                                <li>
                                    <a onClick={CyberpunkComponent}>
                                        Cyberpunk Theme
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
