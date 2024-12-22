import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { SignUpFormValues, signUpSchema } from '@/schemas/auth'
import { useAuth } from '@/hooks/use-auth'
import { toast } from '@/hooks/use-toast'
import { asyncHandler } from '@/utils/asyncHandler'
import AuthForm from '@/components/AuthForm'

export default function SignUpPage() {
  const { signUp, signInWithProvider } = useAuth()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: undefined,
      password: undefined,
      full_name: undefined
    }
  })

  const onSubmit = asyncHandler(async (data: SignUpFormValues) => {
    await signUp(data.email, data.password, data.full_name)
    toast({
      title: 'Đăng ký thành công',
      description: 'Bạn đã đăng ký thành công. Vui lòng xác nhận email.',
      variant: 'default'
    })

    navigate('/confirmation', {
      state: {
        email: data.email,
        full_name: data.full_name
      }
    })
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
        title='Vui lòng nhập thông tin của bạn để tạo tài khoản'
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        form={form}
        type='signUp'
        handleSignInWithOAuth={handleSignInWithOAuth}
      />
    </div>
  )
}
