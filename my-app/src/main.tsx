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
import AboutComponent from './pages/about'
import BlogComponent from './pages/blog'
import PostComponent from './pages/post'
import RoadmapComponent from './pages/roadmap'
import LoginComponent from './pages/login'
import RegisterComponent from './pages/register'
import NotFoundComponent from './pages/404'

import './styles.css'

import App from './App.js'
import HeaderComponent from './components/header'
import FooterComponent from './components/footer'

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

const blogRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/blog',
    component: BlogComponent,
})

const postRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/blog/$slug', // Dynamic route for posts using slug
    component: PostComponent,
})

const roadmapRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/roadmap',
    component: RoadmapComponent,
})

const nonRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/404',
    component: NotFoundComponent,
})

const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    registerRoute,
    aboutRoute,
    blogRoute,
    postRoute,
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
    defaultNotFoundComponent: NotFoundComponent,
})

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
            retry: 2, // Retry failed requests 2 times
        },
    },
})

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
