import { lazy, Suspense } from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

import { AuthProvider } from '@/providers/AuthProvider'

// Components
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { RouteConfig, ROUTES } from '@/config/routes'
import { Loading } from '@/components/loading'
import AuthLayout from '@/layouts/AuthLayout'
import Unauthorized from './pages/Unauthorized'

const SignUpConfirmPage = lazy(() => import('@/pages/SignUpConfirmation'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const renderRoutes = (routes: RouteConfig[]) => {
  return routes.map((route) => {
    const Component = route.component
    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.requiredRole ? (
            <ProtectedRoute requiredRole={route.requiredRole}>
              <Suspense fallback={<Loading />}>
                <Component />
              </Suspense>
            </ProtectedRoute>
          ) : (
            <Suspense fallback={<Loading />}>
              <Component />
            </Suspense>
          )
        }>
        {route.children && renderRoutes(route.children)}
      </Route>
    )
  })
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth routes */}
          <Route element={<AuthLayout />}>{renderRoutes(ROUTES.public)}</Route>
          {/* Protected routes with MainLayout*/}
          <Route element={<Outlet />}>{renderRoutes(ROUTES.protected)}</Route>
          {/* Default error route */}
          <Route path='/confirmation' element={<SignUpConfirmPage />} />
          <Route path='/unauthorized' element={<Unauthorized />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
