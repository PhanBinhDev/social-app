/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Mail, Lock, EyeOffIcon, EyeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { SignUpFormValues } from '@/schemas/auth'
import { Card } from './ui/card'

interface AuthFormProps {
  onSubmit: (data: SignUpFormValues) => void
  title: string
  loading: boolean
  showPassword: boolean
  setShowPassword: (show: boolean) => void
  form: any
  type: 'signUp' | 'signIn'
  handleSignInWithOAuth: (provider: 'facebook' | 'google') => void
}

const AuthForm: React.FC<AuthFormProps> = ({
  onSubmit,
  loading,
  title,
  showPassword,
  setShowPassword,
  form,
  type,
  handleSignInWithOAuth
}) => {
  return (
    <Card className='w-full max-w-md p-6'>
      <div className='text-center mb-6'>
        <h1 className='text-2xl font-semibold text-gray-900'>
          {type === 'signIn' ? 'Đăng nhập' : 'Đăng ký'}
        </h1>
        <p className='text-sm text-gray-600 mt-1'>{title}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          {/* Full Name Field (only for Sign Up) */}
          {type === 'signUp' && (
            <FormField
              control={form.control}
              name='full_name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Nhập họ và tên của bạn'
                      className='w-full'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Email Field */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type='email'
                      placeholder='Nhập email của bạn'
                      className='w-full pl-10'
                      {...field}
                    />
                    <Mail className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder='••••••••'
                      className='w-full pl-10'
                      {...field}
                    />
                    <Lock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5' />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'>
                      {showPassword ? (
                        <EyeOffIcon className='size-5' />
                      ) : (
                        <EyeIcon className='size-5' />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Remember Me Field (only for Sign In) */}
          {type === 'signIn' && (
            <div className='flex items-center justify-between'>
              <FormField
                control={form.control}
                name='remember'
                render={({ field }) => (
                  <FormItem>
                    <div className='flex items-center space-x-2'>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        id='remember'
                      />
                      <Label
                        htmlFor='remember'
                        className='text-sm text-gray-600'>
                        Lưu mật khẩu
                      </Label>
                    </div>
                  </FormItem>
                )}
              />
              <Link
                to='/forgot-password'
                type='button'
                className='text-sm text-primary'>
                Quên mật khẩu?
              </Link>
            </div>
          )}

          {/* Submit Button */}
          <Button className='w-full' type='submit' disabled={loading}>
            {loading
              ? type === 'signUp'
                ? 'Đang đăng ký...'
                : 'Đang đăng nhập...'
              : type === 'signUp'
              ? 'Đăng ký'
              : 'Đăng nhập'}
          </Button>

          {/* Divider */}
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-200' />
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>HOẶC</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className='grid grid-cols-2 md:grid-cols-1 gap-3'>
            <Button
              variant='outline'
              type='button'
              className='w-full'
              onClick={() => handleSignInWithOAuth('google')}>
              <FcGoogle className='h-5 w-5 mr-2' />
              <span className='hidden md:block'>
                {type === 'signUp' ? 'Đăng ký' : 'Đăng nhập'} bằng Google
              </span>
            </Button>
            <Button
              variant='outline'
              type='button'
              className='w-full'
              onClick={() => handleSignInWithOAuth('facebook')}>
              <FaFacebook className='h-5 w-5 mr-2 text-blue-600' />
              <span className='hidden md:block'>
                {type === 'signUp' ? 'Đăng ký' : 'Đăng nhập'} bằng Facebook
              </span>
            </Button>
          </div>

          {/* Switch between Sign Up and Sign In */}
          {type === 'signUp' ? (
            <p className='text-sm text-gray-600 text-center'>
              Đã có tài khoản?{' '}
              <Link to='/sign-in' className='text-primary font-medium'>
                Đăng nhập
              </Link>
            </p>
          ) : (
            <p className='text-sm text-gray-600 text-center'>
              Chưa có tài khoản?{' '}
              <Link to='/sign-up' className='text-primary font-medium'>
                Đăng ký
              </Link>
            </p>
          )}
        </form>
      </Form>
    </Card>
  )
}

export default AuthForm
