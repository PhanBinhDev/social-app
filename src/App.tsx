import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AuthProvider } from '@/providers/AuthProvider'

// Components
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { RouteConfig, ROUTES } from '@/config/routes'
import { Loading } from '@/components/loading'
import { MainLayout } from '@/layouts/MainLayout'
import AuthLayout from '@/layouts/AuthLayout'

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
          <Route element={<MainLayout />}>
            {renderRoutes(ROUTES.protected)}
          </Route>

          <Route path='/confirmation' element={<SignUpConfirmPage />} />

          {/* Default 404 route */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
