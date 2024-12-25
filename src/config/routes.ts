import { UserRole } from '@/types/auth'
import { lazy } from 'react'

// Lazy Load Components
const SignInPage = lazy(() => import('@/pages/SignIn'))
const SignUpPage = lazy(() => import('@/pages/SignUp'))
const ForgotPasswordPage = lazy(() => import('@/pages/ForgotPassword'))
const ResetPasswordPage = lazy(() => import('@/pages/ResetPassword'))

const HomePage = lazy(() => import('@/pages/Home'))

export interface RouteConfig {
  path: string
  label: string
  component: React.LazyExoticComponent<() => JSX.Element>
  icon?: string
  requiredRole?: UserRole
  children?: RouteConfig[]
}

export interface Routes {
  public: RouteConfig[]
  protected: RouteConfig[]
}

export const ROUTES: Routes = {
  public: [
    {
      path: '/sign-in',
      label: 'Sign In',
      component: SignInPage
    },
    {
      path: '/sign-up',
      label: 'Sign Up',
      component: SignUpPage
    },
    {
      path: '/forgot-password',
      label: 'Forgot Password',
      component: ForgotPasswordPage
    },
    {
      path: '/reset-password',
      label: 'Reset Password',
      component: ResetPasswordPage
    }
  ],
  protected: [
    {
      path: '/',
      label: 'Dashboard',
      component: HomePage,
      icon: 'dashboard',
      requiredRole: 'user'
    },
    {
      path: '/admin',
      label: 'Dashboard',
      component: HomePage,
      icon: 'dashboard',
      requiredRole: 'admin'
    }
  ]
}

export const getAllPaths = (routes: RouteConfig[]): string[] => {
  return routes.reduce((paths: string[], route) => {
    const routePaths = [route.path]
    if (route.children) {
      routePaths.push(...getAllPaths(route.children))
    }

    return [...paths, ...routePaths]
  }, [])
}
export const findRouteByPath = (
  path: string,
  routes: RouteConfig[]
): RouteConfig | undefined => {
  for (const route of routes) {
    if (route.path === path) return route
    if (route.children) {
      const childRoute = findRouteByPath(path, route.children)
      if (childRoute) return childRoute
    }
  }
  return undefined
}
