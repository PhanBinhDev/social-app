import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useAuth } from '@/hooks/use-auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { ResetPasswordFormValues, resetPasswordSchema } from '@/schemas/auth'
import { asyncHandler } from '@/utils/asyncHandler'
import { Lock, EyeOff, Eye } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'

export default function ResetPasswordPage() {
  const { resetPassword } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: undefined,
      confirmPassword: undefined
    }
  })

  const onSubmit = asyncHandler(async (data: ResetPasswordFormValues) => {
    await resetPassword(data.password)
    toast({
      title: 'Đặt lại mật khẩu thành công',
      description: 'Vui lòng đăng nhập với mật khẩu mới.',
      variant: 'default'
    })

    navigate('/sign-in')
  }, setLoading)

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    const session = await supabase.auth.getSession()
    if (!session.data.session) {
      navigate('/sign-in')
      return
    }
  }

  return (
    <div className='w-full lg:w-[45%] flex items-center justify-center p-4 bg-gray-50'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-3'>
          <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto'>
            <Lock className='h-8 w-8 text-primary' />
          </div>
          <CardTitle className='text-2xl font-bold text-center'>
            Đặt lại mật khẩu
          </CardTitle>
          <CardDescription className='text-center text-gray-600'>
            Vui lòng nhập mật khẩu mới cho tài khoản của bạn
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700'>
                      Mật khẩu mới
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Nhập mật khẩu mới'
                          className='pl-10 pr-10 h-11 border-gray-200 focus:border-primary'
                          disabled={loading}
                        />
                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <EyeOff className='h-4 w-4 text-gray-400' />
                          ) : (
                            <Eye className='h-4 w-4 text-gray-400' />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700'>
                      Xác nhận mật khẩu
                    </FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder='Xác nhận mật khẩu mới'
                          className='pl-10 pr-10 h-11 border-gray-200 focus:border-primary'
                          disabled={loading}
                        />
                        <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
                        <Button
                          type='button'
                          variant='ghost'
                          size='sm'
                          className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <EyeOff className='h-4 w-4 text-gray-400' />
                          ) : (
                            <Eye className='h-4 w-4 text-gray-400' />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='w-full h-11 text-base font-medium transition-all'
                disabled={loading}>
                {loading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
