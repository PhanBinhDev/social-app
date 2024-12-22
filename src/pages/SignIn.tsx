import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpFormValues, signInSchema } from '@/schemas/auth'
import { useAuth } from '@/hooks/use-auth'
import { toast } from '@/hooks/use-toast'
import { asyncHandler } from '@/utils/asyncHandler'
import AuthForm from '@/components/AuthForm'
import { useNavigate } from 'react-router-dom'

export default function SignInPage() {
  const { signIn, signInWithProvider } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: undefined,
      password: undefined
    }
  })

  const onSubmit = asyncHandler(async (data: SignUpFormValues) => {
    await signIn(data.email, data.password)
    toast({
      title: 'Đăng nhập thành công',
      description: 'Bạn đã đăng nhập thành công.',
      variant: 'default'
    })

    navigate('/')
  }, setLoading)

  const handleSignInWithOAuth = asyncHandler(
    async (provider: 'facebook' | 'google') => {
      await signInWithProvider(provider)
    },
    setLoading
  )

  return (
    <div className='w-full lg:w-[45%] p-2 sm:p-4 md:p-8 flex flex-col justify-center items-center'>
      <div className='mb-8'>
        <img src='/vite.svg' alt='Logo' className='h-10' />
      </div>
      <AuthForm
        onSubmit={onSubmit}
        loading={loading}
        title='Chào mừng trở lại! Vui lòng nhập thông tin của bạn'
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        form={form}
        type='signIn'
        handleSignInWithOAuth={handleSignInWithOAuth}
      />
    </div>
  )
}
