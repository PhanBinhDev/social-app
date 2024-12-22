import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Search,
  Bell,
  MessageCircle,
  Settings,
  Menu,
  LogOut
} from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'

export default function Header() {
  const [openSearch, setOpenSearch] = useState(false) // State điều khiển Search trên mobile
  const { signOut } = useAuth()
  return (
    <header className='fixed top-0 left-0 right-0 h-auto bg-background border-b border-border z-50'>
      <div className='flex flex-wrap items-center justify-between gap-4 px-4 py-2 md:flex-nowrap h-16'>
        {/* Left: Logo */}
        <Button
          variant='ghost'
          size='icon'
          className='md:hidden'
          // Bạn có thể mở menu ở đây
        >
          <Menu />
        </Button>

        {/* Middle: Search bar */}
        {/* Hiện Search trên mobile khi icon được nhấn */}
        <>
          <div className='hidden md:block w-72'>
            <div className='relative'>
              <Search className='absolute left-2 top-2.5 h-5 w-5 text-muted-foreground' />
              <Input placeholder='Tìm kiếm...' className='pl-10 w-full' />
            </div>
          </div>

          {/* Mobile Search - Controlled by openSearch state */}
          {openSearch && (
            <div className='block md:hidden w-full md:w-auto md:flex-1 order-last md:order-none'>
              <div className='relative'>
                <Search className='absolute left-2 top-2.5 h-5 w-5 text-muted-foreground' />
                <Input
                  placeholder='Tìm kiếm...'
                  className='pl-10 w-full'
                  onBlur={() => setOpenSearch(false)}
                  autoFocus
                />
              </div>
            </div>
          )}
        </>

        {/* Right: Icons and Avatar */}
        <div className='ml-auto flex items-center gap-4'>
          {/* Icon Search cho Mobile */}
          <Button
            variant='ghost'
            size='icon'
            className={`relative md:hidden text-muted-foreground ${
              openSearch ? 'bg-muted text-primary' : ''
            }`}
            onClick={() => setOpenSearch((prev) => !prev)}>
            <Search className='h-5 w-5' />
          </Button>

          {/* Các Icon khác */}
          <Button variant='ghost' size='icon' className='relative'>
            <MessageCircle className='h-5 w-5 text-muted-foreground' />
          </Button>
          <Button variant='ghost' size='icon' className='relative'>
            <Settings className='h-5 w-5 text-muted-foreground' />
          </Button>
          <Button variant='ghost' size='icon' className='relative'>
            <Bell className='h-5 w-5 text-muted-foreground' />
            <span className='absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500'></span>
          </Button>

          {/* Avatar */}
          <div className='flex items-center gap-2 cursor-pointer size-8 rounded-sm '>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className='size-8 rounded-md'>
                  <AvatarImage
                    className='size-8 rounded-md'
                    src='/user-avatar.jpg'
                    alt='User Avatar'
                  />
                  <AvatarFallback className='rounded-md'>UN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-[200px]'>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
                <DropdownMenuItem
                  onClick={signOut}
                  className='text-red-600 cursor-pointer'>
                  <LogOut className='mr-2 h-4 w-4' />
                  Đăng xuất
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
