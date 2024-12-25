import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { UserRole } from '@/types/auth'
import { hasRequiredRole } from '@/lib/auth'
import { Loading } from './loading'

interface ProtectedRoute {
  children: React.ReactNode
  requiredRole?: UserRole
}

export function ProtectedRoute({
  children,
  requiredRole = 'user'
}: ProtectedRoute) {
  const { loading, user } = useAuth()
  const location = useLocation()

  console.log({
    user: user?.role,
    requiredRole: requiredRole
  })

  if (loading) {
    return <Loading text='Đang khởi tạo người dùng...' />
  }

  if (!user) {
    return <Navigate to='/sign-in' state={{ from: location }} replace />
  }

  if (!hasRequiredRole(user.role, requiredRole)) {
    return <Navigate to='/unauthorized' replace />
  }

  return children
}
