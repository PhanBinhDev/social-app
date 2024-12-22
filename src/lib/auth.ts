import { UserRole } from '@/types/auth'

export const ROLES: Record<UserRole, number> = {
  user: 1,
  admin: 2
}

export const hasRequiredRole = (
  userRole: UserRole,
  requiredRole: UserRole
): boolean => ROLES[userRole] >= ROLES[requiredRole]
