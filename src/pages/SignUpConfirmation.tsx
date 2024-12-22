import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useAuth } from '@/hooks/use-auth'
import { asyncHandler } from '@/utils/asyncHandler'
import { maskEmail } from '@/utils/maskEmail'
import { Mail, ArrowRight, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function SignUpConfirmation() {
  const { resendEmailVerifySignUp, user } = useAuth()
  const [isResending, setIsResending] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const email = location.state?.email || 'example@gmail.com'

  useEffect(() => {
    if (!email) navigate('/sign-up')
    else if (user) navigate('/')
  }, [email, navigate, user])

  const handleResendEmail = asyncHandler(async () => {
    await resendEmailVerifySignUp(email)
  }, setIsResending)

  return (
    <div className='w-full h-screen p-2 sm:p-4 md:p-8 flex flex-col justify-center items-center'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <div className='w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
            <Mail className='h-8 w-8 text-primary' />
          </div>
          <CardTitle className='text-2xl font-bold text-center'>
            Xác nhận email của bạn
          </CardTitle>
          <CardDescription className='text-center'>
            Chúng tôi đã gửi một email xác nhận đến địa chỉ email của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p className='text-center text-sm text-gray-600'>
            Vui lòng kiểm tra hộp thư đến của bạn và nhấp vào liên kết trong
            email để xác nhận tài khoản của bạn.
          </p>
          <div className='text-center'>
            <p className='text-sm font-medium text-gray-900'>
              {maskEmail(email)}
            </p>
            <Link to={'/sign-up'} className='text-sm text-primary p-0'>
              Thay đổi email
            </Link>
          </div>
        </CardContent>
        <CardFooter className='flex flex-col space-y-2'>
          <Button className='w-full' asChild>
            <a
              href='https://mail.google.com/'
              target='_blank'
              rel='noopener noreferrer'>
              Mở ứng dụng email
              <ArrowRight className='ml-2 h-4 w-4' />
            </a>
          </Button>
          <Button
            variant='outline'
            className='w-full'
            onClick={handleResendEmail}
            disabled={isResending}>
            {isResending ? (
              <>
                <RefreshCw className='mr-2 h-4 w-4 animate-spin' />
                Đang gửi lại...
              </>
            ) : (
              'Gửi lại email xác nhận'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
