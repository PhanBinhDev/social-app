import { CheckCircle, Edit, Save } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useAuth } from '@/hooks/use-auth'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { formatDate } from '@/utils/formatDate'
const Account = () => {
  const [isEdited, setEdited] = useState<boolean>(false)
  const { user } = useAuth()
  console.log({
    user
  })
  const handleSave = () => {
    setEdited(false)
    // update user info to firebase here
  }
  return (
    <div className='p-4 rounded-md border-border border space-y-2'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <span className='text-gray-800 font-semibold'>Account Infomation</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setEdited(!isEdited)}
                variant={'ghost'}
                size={'icon'}>
                {isEdited ? (
                  <Save className='h-5 w-5 text-gray-500' />
                ) : (
                  <Edit className='h-5 w-5 text-gray-500' />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className='text-white'>
                {isEdited ? 'Save' : 'Edit'} Account Information
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {/* Content info user */}
      <div className='flex items-center space-x-4'>
        <Avatar className='h-20 w-20'>
          <AvatarImage
            src={user?.user_metadata?.avatar_url}
            alt={user?.user_metadata.full_name}
          />
          <AvatarFallback>{user?.user_metadata.full_name}</AvatarFallback>
        </Avatar>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold'>
            {user?.user_metadata.full_name}
          </h3>
          <div className='flex items-center space-x-2'>
            <p className='text-sm text-muted-foreground'>{user?.email}</p>
            <CheckCircle className='h-4 w-4 text-green-500' />
          </div>
        </div>
      </div>
      <div className='grid gap-4 pt-4'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>
              Member Since
            </p>
            <p className='font-medium'>{formatDate(user?.created_at || '')}</p>
          </div>
          <div className='space-y-1'>
            <p className='text-sm font-medium text-muted-foreground'>
              Last Sign In
            </p>
            <p className='font-medium'>
              {formatDate(user?.last_sign_in_at || '')}
            </p>
          </div>
        </div>

        <div className='space-y-1'>
          <p className='text-sm font-medium text-muted-foreground'>
            Authentication Provider
          </p>
          <p className='font-medium flex items-center space-x-2'>
            <span>Google</span>
            <CheckCircle className='h-4 w-4 text-green-500' />
          </p>
        </div>
      </div>

      {/* Footer */}
      {isEdited && (
        <Button onClick={handleSave} className='w-full md:w-fit'>
          Save
        </Button>
      )}
    </div>
  )
}

export default Account
