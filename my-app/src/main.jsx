import {
    Outlet,
    RouterProvider,
    createRootRoute,
    createRoute,
    createRouter,
} from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import AboutComponent from './pages/about.tsx'
import RoadmapComponent from './pages/roadmap.tsx'
import LoginComponent from './pages/login.tsx'
import RegisterComponent from './pages/register.tsx'
import NonComponent from './pages/404.tsx'

import './styles.css'

import App from './App.jsx'
import HeaderComponent from './components/header.tsx'
import FooterComponent from './components/footer.tsx'

import { AuthProvider } from './context/AuthContext'

const rootRoute = createRootRoute({
    component: () => (
        <>
            <HeaderComponent />
            <Outlet />
            <FooterComponent />
            <TanStackRouterDevtools />
        </>
    ),
})

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: App,
})

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: LoginComponent,
})

const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/register',
    component: RegisterComponent,
})

const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: AboutComponent,
})

const roadmapRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/roadmap',
    component: RoadmapComponent,
})

const nonRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/404',
    component: NonComponent,
})

const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    registerRoute,
    aboutRoute,
    roadmapRoute,
    nonRoute,
])

const router = createRouter({
    routeTree,
    context: {},
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
})

const queryClient = new QueryClient()

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement)
    root.render(
        <StrictMode>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                </QueryClientProvider>
            </AuthProvider>
        </StrictMode>
    )
}
