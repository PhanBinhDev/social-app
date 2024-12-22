import { User } from '@supabase/supabase-js'

export type UserRole = 'user' | 'admin'
export interface IUser extends User {
  role: UserRole
}
