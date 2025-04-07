import { Github } from 'lucide-react'
import { Signup } from './components/signup'

function App() {
    return (
        <main className="flex flex-col min-h-layout">
            <section className="flex-1 flex items-center justify-center mt-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-bold text-center">
                        Hello there
                    </h1>
                    <p className="py-6 text-center">
                        <span className="font-bold">React Starter Repo</span>{' '}
                        comes with an interactive roadmap page, Appwrite
                        backend, and typesafe TanStack Router.
                    </p>
                </div>
            </section>
            <section className="flex-1 flex items-center my-6">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-2xl font-bold mb-3">
                                REACT-STARTER-REPO
                            </h2>
                            <p className="max-w-xs mb-3">
                                Quickly bootstrap a new web app project.
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
                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-2xl font-bold mb-3">
                                VALIDATE YOUR IDEA
                            </h2>
                            <p className="max-w-xs mb-3">
                                And, measure users interest effectively...
                            </p>
                            {/* <div className="join">
                                <div>
                                    <label className="input join-item">
                                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></g></svg>
                                        <input type="email" placeholder="With a sign up form" required />
                                    </label>
                                </div>
                                <button className="btn btn-primary join-item">Join</button>
                            </div> */}
                            <Signup />
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex-1 flex items-center mb-6">
                <div className="container mx-auto px-4 text-center">
                    <p className="py-6">
                        Build Apps with{' '}
                        <span className="font-bold">Tanstack Router</span>,{' '}
                        <span className="font-bold">DaisyUI, Appwrite</span>{' '}
                        Auth and Databases.{' '}
                        <span className="font-bold">Oxlint</span> for Linting
                        and <span className="font-bold">Prettier</span> for
                        Formatting. And,{' '}
                        <span className="font-bold">Lucide</span> Icons for SVGs
                        and Icons.{' '}
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center max-w-5xl mx-auto">
                        <div className="h-8">
                            <img
                                alt="Tanstack Router"
                                title="Tanstack Router"
                                src="https://cdn.brandfetch.io/idWcj3JjN7/w/100/h/100/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B"
                                width={158}
                                height={48}
                                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            />
                        </div>
                        <div className="h-8">
                            <img
                                alt="Appwrite"
                                title="Appwrite"
                                src="https://appwrite.io/assets/logomark/logo.svg"
                                width={158}
                                height={48}
                                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            />
                        </div>
                        <div className="h-8">
                            <img
                                alt="DaisyUI"
                                title="DaisyUI"
                                src="https://img.daisyui.com/images/daisyui-logo/daisyui-logomark.svg"
                                width={158}
                                height={48}
                                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            />
                        </div>
                        <div className="h-8">
                            <img
                                alt="Oxlint"
                                title="Oxlint"
                                src="https://cdn.jsdelivr.net/gh/oxc-project/oxc-assets/square.svg"
                                width={158}
                                height={48}
                                className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                            />
                        </div>
                        <div className="h-8">
                            <img
                                alt="Prettier"
                                title="Prettier"
                                src="https://cdn.brandfetch.io/idiUHgw-fJ/w/256/h/256/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B"
                                width={158}
                                height={48}
                                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                            />
                        </div>
                        <div className="h-8">
                            <img
                                alt="Lucide"
                                title="Lucide"
                                src="https://images.opencollective.com/lucide-icons/9fe79a6/logo/256.png?height=256"
                                width={158}
                                height={48}
                                className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default App
