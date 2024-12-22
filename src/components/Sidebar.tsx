import { Link } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  Bookmark,
  Home,
  Image,
  MessageCircle,
  Settings,
  Users
} from 'lucide-react'
import { Separator } from './ui/separator'

const Sidebar = () => {
  return (
    <div className='h-full border-r border-border bg-background p-4 md:w-72 lg:w-80 hidden md:block'>
      <div className='flex flex-col h-full gap-2'>
        <div className='flex flex-col items-center mb-2 space-y-2'>
          <div className='relative'>
            <Avatar className='h-20 w-20'>
              <AvatarImage src='/placeholder.svg' alt='Hồ sơ' />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </div>
          <div className='text-center'>
            <h2 className='text-lg font-semibold'>Alexis Wells</h2>
            <p className='text-sm text-muted-foreground'>@wellsalex</p>
          </div>
          <div className='flex gap-4 text-sm bg-violet-500 rounded-md p-4 text-white'>
            <div className='text-center'>
              <div className='font-semibold'>4.6k</div>
              <div className='text-gray-100'>Đang theo dõi</div>
            </div>
            <div className='text-center'>
              <div className='font-semibold'>4.6k</div>
              <div className='text-gray-100'>Người theo dõi</div>
            </div>
          </div>
        </div>

        {/* Điều hướng */}
        <Separator />
        <nav className='space-y-2'>
          <Button variant='ghost' className='w-full justify-start' asChild>
            <Link to='#'>
              <Home className='mr-2 h-4 w-4' />
              Trang chủ
            </Link>
          </Button>
          <Button variant='ghost' className='w-full justify-start' asChild>
            <Link to='#'>
              <Users className='mr-2 h-4 w-4' />
              Bạn bè
            </Link>
          </Button>
          <Button variant='ghost' className='w-full justify-start' asChild>
            <Link to='#'>
              <Image className='mr-2 h-4 w-4' />
              Ảnh
            </Link>
          </Button>
          <Button variant='ghost' className='w-full justify-start' asChild>
            <Link to='#'>
              <MessageCircle className='mr-2 h-4 w-4' />
              Tin nhắn
            </Link>
          </Button>
          <Button variant='ghost' className='w-full justify-start' asChild>
            <Link to='#'>
              <Bookmark className='mr-2 h-4 w-4' />
              Đã lưu
            </Link>
          </Button>
        </nav>
        <div className='mt-auto'>
          <Button variant='ghost' className='w-full justify-start'>
            <Settings className='mr-2 h-4 w-4' />
            Cài đặt
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
