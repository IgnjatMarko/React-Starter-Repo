export default function LogoCloud() {
    return (
        <div className="bg-base-100 py-14 sm:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center text-lg/8 font-semibold ">
                    Build Apps with Tanstack Router, DaisyUI, Appwrite Auth and
                    Databases. Oxlint for Linting and Prettier for Formatting.
                </h2>
                <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <img
                        alt="Tanstack Router"
                        title="Tanstack Router"
                        src="/tanstacklogo.png"
                        width={158}
                        height={48}
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                    />
                    <img
                        alt="Appwrite"
                        title="Appwrite"
                        src="https://appwrite.io/assets/logomark/logo.svg"
                        width={158}
                        height={48}
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                    />
                    <img
                        alt="DaisyUI"
                        title="DaisyUI"
                        src="/daisyuilogo.png"
                        width={158}
                        height={48}
                        className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
                    />
                    <img
                        alt="Oxlint"
                        title="Oxlint"
                        src="https://cdn.jsdelivr.net/gh/oxc-project/oxc-assets/square.svg"
                        width={158}
                        height={48}
                        className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
                    />
                    <img
                        alt="Prettier"
                        title="Prettier"
                        src="https://prettier.io/icon.png"
                        width={158}
                        height={48}
                        className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
                    />
                </div>
            </div>
        </div>
    )
}
