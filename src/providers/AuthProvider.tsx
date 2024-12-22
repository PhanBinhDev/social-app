import { useState, useEffect } from 'react'
import { IUser } from '@/types/auth'
import { supabase } from '@/lib/supabase'
import { AuthContext } from '@/contexts/auth-context'
import { asyncHandler } from '@/utils/asyncHandler'
import { toast } from '@/hooks/use-toast'
import { useNavigate } from 'react-router-dom'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_IN':
          if (session) {
            setUser({
              ...session.user,
              role: session.user.user_metadata.role || 'user'
            })
          } else {
            setUser(null)
          }
          break
        default:
          break
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
  }

  const signOut = asyncHandler(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      return toast({
        title: 'Đăng xuất thất bại',
        description: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
        variant: 'destructive'
      })
    }
    toast({
      title: 'Đăng xuất thành công',
      description: 'Phiên làm việc của bạn đã bị vô hiệu hóa.',
      variant: 'default'
    })

    navigate('/sign-in')
  })

  const signInWithProvider = async (provider: 'google' | 'facebook') => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider
    })
    if (error) throw error
  }

  const signUp = async (email: string, password: string, full_name: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name
        }
      }
    })
    if (error) throw error
  }

  const resendEmailVerifySignUp = async (email: string) => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email
    })

    if (error) throw error
  }

  const forgotPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:5173/reset-password'
    })

    if (error) throw error
  }

  const resetPassword = async (password: string) => {
    const { error } = await supabase.auth.updateUser({
      password
    })

    if (error) throw error
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        signUp,
        signInWithProvider,
        resendEmailVerifySignUp,
        forgotPassword,
        resetPassword
      }}>
      {children}
    </AuthContext.Provider>
  )
}
