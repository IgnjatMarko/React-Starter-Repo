import LogoCloud from './utils/logo-cloud.tsx'
import { Github } from 'lucide-react'

function App() {
    return (
        <div className="hero bg-base-100 min-h-[87vh]">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">
                        <span className="font-bold">React Starter Repo</span>{' '}
                        comes with an interactive roadmap page, Appwrite
                        backend, and typesafe TanStack Router.
                    </p>

                    <a
                        href="https://github.com/ignjatmarko/react-starter-repo"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <button className="btn btn-primary">
                            <Github />
                            Get Started
                        </button>
                    </a>
                    <LogoCloud />
                </div>
            </div>
        </div>
    )
}

export default App
