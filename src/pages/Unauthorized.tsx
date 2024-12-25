import { Button } from '@/components/ui/button'
import { LockIcon, HomeIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Unauthorized() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      <div className='max-w-md w-full px-6 py-8 bg-white dark:bg-gray-800 shadow-md rounded-lg text-center'>
        <LockIcon className='mx-auto h-12 w-12 text-red-500 dark:text-red-400 mb-4' />
        <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
          Truy cập bị từ chối
        </h1>
        <p className='text-gray-600 dark:text-gray-300 mb-6'>
          Oops! Có vẻ như bạn không có quyền để truy cập trang này.
        </p>
        <div className='space-y-4'>
          <Button asChild className='w-full'>
            <Link to='/'>
              <HomeIcon className='mr-2 h-4 w-4' />
              Về trang chủ
            </Link>
          </Button>
          <Button asChild variant='outline' className='w-full'>
            <Link to='/sign-in'>
              <LockIcon className='mr-2 h-4 w-4' />
              Đăng nhập
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
