import { Github } from 'lucide-react'
import { Signup } from './components/signup'
import { LogoCloud } from './assets/logo-cloud'

function App() {
    return (
        <main className="flex flex-col min-h-layout">
            <section className="flex-1 flex items-center justify-center mt-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-center">
                        Hello there
                    </h1>
                    <p className="py-6 text-center text-pretty">
                        <span className="font-bold">React Starter Repo</span>{' '}
                        comes with an interactive roadmap page, Appwrite
                        backend, and typesafe TanStack Router.
                    </p>
                </div>
            </section>
            <section className="flex-1 flex items-center my-6">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div className="card bg-base-200 shadow-sm pb-5 flex flex-col items-center text-center">
                            <h2 className="text-2xl font-bold my-3">
                                REACT-STARTER-REPO
                            </h2>
                            <p className="max-w-xs mb-3">
                                Quickly bootstrap a new web app project...
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
                        </div>
                        <div className="card bg-base-200 shadow-sm pb-5 flex flex-col items-center text-center">
                            <h2 className="text-2xl font-bold my-3">
                                VALIDATE YOUR IDEA
                            </h2>
                            <p className="max-w-xs mb-3">
                                And, measure users interest effectively...
                            </p>
                            <Signup />
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex-1 flex items-center mb-6">
                <div className="container mx-auto px-4 text-center">
                    <p className="py-6 text-pretty">
                        Build Apps with{' '}
                        <span className="font-bold">Tanstack Router,{' '}
                        DaisyUI, Appwrite{' '}
                        Backend.{' '}
                        Oxlint and Prettier</span> for Lint and 
                        Formatting. {' '}
                        <span className="font-bold">Lucide Icons</span> for SVGs
                        and Icons.{' '}
                    </p>
                    <div className="max-w-md grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center mx-auto">
                        {LogoCloud.map((tech) => (
                            <div 
                                key={tech.name} 
                                className="h-8 transition-all duration-300 ease-out hover:scale-110"
                            >
                                <img
                                    alt={tech.name}
                                    title={tech.name}
                                    src={tech.logo}
                                    width={158}
                                    height={48}
                                    className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default App
