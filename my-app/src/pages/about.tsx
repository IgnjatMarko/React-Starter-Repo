import { Link } from '@tanstack/react-router'
import { APP_INFO } from '../assets/constants'

export default function AboutComponent() {
    return (
        <div className="hero bg-base-100 min-h-[87vh]">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold">{APP_INFO.title}</h1>
                    <p className="py-6">{APP_INFO.description}</p>
                    <Link to="/">
                        <button className="btn btn-primary">Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
