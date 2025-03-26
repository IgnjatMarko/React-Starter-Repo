import { Link } from '@tanstack/react-router'

export default function NonComponent() {
    return (
        <div className="hero bg-base-100 min-h-[87vh]">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Oops!</h1>
                    <p className="py-6">
                        The page you are looking for does not exist. It might
                        have been moved or deleted.
                    </p>
                    <Link to="/">
                        <button className="btn btn-primary">
                            Go Back Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
