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
import { ForgotPasswordFormValues, forgotPasswordSchema } from '@/schemas/auth'
import { asyncHandler } from '@/utils/asyncHandler'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { toast } from '@/hooks/use-toast'

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)
  const [emailSent, setEmailSend] = useState<boolean>(false)
  const [countDown, setCountDown] = useState<number>(0)
  const [isResendDisabled, setResendDisabled] = useState<boolean>(false)
  const location = useLocation()
  const email = location.state?.email || undefined

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: email
    }
  })

  const onSubmit = asyncHandler(async (data: ForgotPasswordFormValues) => {
    await forgotPassword(data.email)
    toast({
      title: 'Gửi liên kết đặt lại mật khẩu thành công',
      description:
        'Một liên kết đặt lại mật khẩu đã được gửi đến email của bạn. Vui lòng kiểm tra hộp thư.',
      variant: 'default'
    })
    setEmailSend(true)
    startCountDown()
  }, setLoading)

  const startCountDown = () => {
    setCountDown(60)
    setResendDisabled(true)

    const timer = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setResendDisabled(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleChangeEmail = () => {
    form.reset({ email: undefined })
    setEmailSend(false)
    setCountDown(0)
    setResendDisabled(false)
  }
  return (
    <div className='w-full lg:w-[45%] flex items-center justify-center p-4 bg-gray-50'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-3'>
          <div className='w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto'>
            <Lock className='h-8 w-8 text-primary' />
          </div>
          <CardTitle className='text-2xl font-bold text-center'>
            Quên mật khẩu?
          </CardTitle>
          <CardDescription className='text-center text-gray-600'>
            Nhập địa chỉ email của bạn để nhận liên kết đặt lại mật khẩu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-700'>Email</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          {...field}
                          type='email'
                          placeholder='Nhập email của bạn'
                          className='pl-10 h-11 border-gray-200 focus:border-primary'
                          disabled={loading || emailSent}
                        />
                        <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {!emailSent ? (
                <Button
                  type='submit'
                  className='w-full h-11 text-base font-medium transition-all'
                  disabled={loading}>
                  {loading ? 'Đang gửi...' : 'Gửi liên kết đặt lại mật khẩu'}
                </Button>
              ) : (
                <div className='space-y-4'>
                  <div className='p-4 bg-green-50 text-green-700 rounded-lg text-center'>
                    Liên kết đặt lại mật khẩu đã được gửi đến email của bạn!
                    <Button className='w-full mt-2' variant={'ghost'} asChild>
                      <a
                        href='https://mail.google.com/'
                        target='_blank'
                        rel='noopener noreferrer'>
                        Kiểm tra ngay
                        <ArrowRight className='ml-2 h-4 w-4' />
                      </a>
                    </Button>
                  </div>
                  <Button
                    variant='default'
                    type='button'
                    onClick={handleChangeEmail}
                    className='w-full h-11'>
                    Thay đổi email
                  </Button>
                </div>
              )}

              <div className='space-y-4'>
                {emailSent && (
                  <>
                    <div className='relative'>
                      <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-200' />
                      </div>
                      <div className='relative flex justify-center text-sm'>
                        <span className='px-2 bg-white text-gray-500'>
                          Không nhận được email?
                        </span>
                      </div>
                    </div>

                    <Button
                      type='button'
                      variant='outline'
                      className='w-full h-11'
                      disabled={isResendDisabled || loading}
                      onClick={() => {
                        form.handleSubmit(onSubmit)()
                      }}>
                      {isResendDisabled
                        ? `Gửi lại sau ${countDown} giây nữa`
                        : 'Gửi lại'}
                    </Button>
                  </>
                )}

                <Button
                  variant='ghost'
                  className='w-full h-11 hover:bg-gray-50'
                  asChild>
                  <Link to='/sign-in'>Quay lại đăng nhập</Link>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
