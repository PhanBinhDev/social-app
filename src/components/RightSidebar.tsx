import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from './ui/scroll-area'
import { useState } from 'react'

// Mock data for active users
const activeUsers = [
  {
    id: 1,
    name: 'Alice Johnson',
    avatar: '/avatars/alice.jpg',
    isOnline: true,
    lastMessage: '2 phút trước'
  },
  {
    id: 2,
    name: 'Bob Smith',
    avatar: '/avatars/bob.jpg',
    isOnline: true,
    lastMessage: '5 phút trước'
  },
  {
    id: 3,
    name: 'Charlie Brown',
    avatar: '/avatars/charlie.jpg',
    isOnline: false,
    lastMessage: '15 phút trước'
  },
  {
    id: 4,
    name: 'Diana Prince',
    avatar: '/avatars/diana.jpg',
    isOnline: true,
    lastMessage: '30 phút trước'
  },
  {
    id: 5,
    name: 'Ethan Hunt',
    avatar: '/avatars/ethan.jpg',
    isOnline: false,
    lastMessage: '1 giờ trước'
  },
  {
    id: 6,
    name: 'Fiona Apple',
    avatar: '/avatars/fiona.jpg',
    isOnline: true,
    lastMessage: '2 giờ trước'
  },
  {
    id: 7,
    name: 'George Michael',
    avatar: '/avatars/george.jpg',
    isOnline: false,
    lastMessage: '3 giờ trước'
  },
  {
    id: 8,
    name: 'Hannah Montana',
    avatar: '/avatars/hannah.jpg',
    isOnline: true,
    lastMessage: '4 giờ trước'
  }
]

export function RightSidebar() {
  const [users] = useState(activeUsers)
  return (
    <div className='hidden lg:block w-80 p-4 h-screen'>
      <div className='space-y-4'>
        <Card>
          <CardHeader>
            <CardTitle>Người bạn có thể biết</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            {[1, 2, 3].map((i) => (
              <div key={i} className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Avatar>
                    <AvatarImage src='/placeholder.svg' />
                    <AvatarFallback>UN</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='text-sm font-medium'>User Name</p>
                    <p className='text-xs text-muted-foreground'>@username</p>
                  </div>
                </div>
                <Button variant='secondary' size='sm'>
                  Follow
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bạn bè</CardTitle>
          </CardHeader>
          <CardContent className='p-4 pt-0'>
            <ScrollArea className='h-[300px] pr-4'>
              <div className='space-y-4'>
                {users.map((user) => (
                  <div
                    key={user.id}
                    className='flex items-center space-x-4 hover:bg-gray-100 p-1 rounded-md cursor-pointer'>
                    <div className='relative flex items-center justify-center'>
                      <Avatar>
                        <AvatarImage
                          className='size-3'
                          src={user.avatar}
                          alt={user.name}
                        />
                        <AvatarFallback className='size-8 m-auto'>
                          {user.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span
                        className={`absolute bottom-0 right-0 block size-2 rounded-full ring-2 ring-white ${
                          user.isOnline ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                    <div className='flex-1 space-y-1'>
                      <p className='text-sm font-medium leading-none'>
                        {user.name}
                      </p>
                      <p className='text-xs text-muted-foreground'>
                        {user.lastMessage}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
