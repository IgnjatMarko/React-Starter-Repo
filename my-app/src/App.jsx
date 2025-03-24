import { Link } from '@tanstack/react-router'

function App() {
    return (
        <div className="hero bg-base-100 min-h-[87vh]">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut
                        assumenda excepturi exercitationem quasi. In deleniti
                        eaque aut repudiandae et a id nisi.
                    </p>
                    <Link to="/roadmap">
                        <button className="btn btn-primary">Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default App
