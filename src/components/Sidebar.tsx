import { Link, NavLink } from 'react-router-dom'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Bookmark,
  Home,
  Image,
  MessageCircle,
  Plus,
  Settings,
  Users
} from 'lucide-react'

const Sidebar = () => {
  return (
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
        <div className='hidden md:flex gap-4 text-sm bg-violet-500 rounded-md p-4 text-white'>
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
          <NavLink
            to='/create-post'
            className={({ isActive }) => {
              console.log({ isActive })
              return isActive ? 'bg-primary text-white' : ''
            }}>
            <Plus className='mr-2 h-4 w-4' />
            Tạo bài viết
          </NavLink>
        </Button>
        <Button variant='ghost' className='w-full justify-start' asChild>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? 'bg-primary text-white' : ''
            }>
            <Home className='mr-2 h-4 w-4' />
            Trang chủ
          </NavLink>
        </Button>
        <Button variant='ghost' className='w-full justify-start' asChild>
          <Link to='/friends'>
            <Users className='mr-2 h-4 w-4' />
            Bạn bè
          </Link>
        </Button>
        <Button variant='ghost' className='w-full justify-start' asChild>
          <Link to='/galleries'>
            <Image className='mr-2 h-4 w-4' />
            Ảnh
          </Link>
        </Button>
        <Button variant='ghost' className='w-full justify-start' asChild>
          <Link to='/messages'>
            <MessageCircle className='mr-2 h-4 w-4' />
            Tin nhắn
          </Link>
        </Button>
        <Button variant='ghost' className='w-full justify-start' asChild>
          <Link to='/saved'>
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
  )
}

export default Sidebar
