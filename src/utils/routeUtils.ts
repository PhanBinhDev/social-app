import { ROUTES } from '@/config/routes'
import { hasRequiredRole } from '@/lib/auth'
import { UserRole } from '@/types/auth'

export const getNavigationItems = (userRole: UserRole) => {
  return ROUTES.protected.filter((route) => {
    if (!route.requiredRole) return true
    return hasRequiredRole(userRole, route.requiredRole)
  })
}
