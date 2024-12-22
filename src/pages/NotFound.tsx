import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900'>
      <div className='max-w-md w-full px-6 py-8 bg-white dark:bg-gray-800 shadow-md rounded-lg text-center'>
        <h1 className='text-6xl font-bold text-primary mb-4'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4'>
          Trang không tồn tại
        </h2>
        <p className='text-gray-600 dark:text-gray-300 mb-8'>
          Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.
        </p>
        <div className='space-y-4'>
          <Button asChild className='w-full'>
            <Link to='/'>
              <Home className='mr-2 h-4 w-4' />
              Trở về trang chủ
            </Link>
          </Button>
          <Button asChild variant='outline' className='w-full'>
            <Link to='#' onClick={() => window.history.back()}>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Quay lại trang trước
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
