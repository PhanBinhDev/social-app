import { KeyRound, RotateCcw } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Separator } from './ui/separator'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select'
import { Switch } from './ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from './ui/dialog'
import { Input } from './ui/input'
import { useTheme } from '@/hooks/use-theme'
import { Theme } from '@/contexts/theme-context'
const Settings = () => {
  const [isEdited, setEdited] = useState<boolean>(false)
  const { setTheme, theme } = useTheme()
  const [notifications, setNotifications] = useState<boolean>(true)
  const [tfa, setTfa] = useState<boolean>(false)
  return (
    <div className='p-4 rounded-md border-border border space-y-2'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <span className='text-gray-800 dark:text-white font-semibold'>
          Settings
        </span>
        <div className='flex items-center justify-center gap-2'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setEdited(!isEdited)}
                  variant={'ghost'}
                  size={'icon'}>
                  <RotateCcw className='h-5 w-5 text-gray-500 dark:text-white' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className='text-white'>Reset Change</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <Separator />
      {/* Theme Settings */}
      <div className='space-y-4'>
        <h3 className='text-lg font-medium'>Appearance</h3>
        <div className='flex items-center justify-between'>
          <Label htmlFor='theme-select'>Theme</Label>
          <Select
            value={theme}
            onValueChange={(value: Theme) => {
              setTheme(value)
              setEdited(true)
            }}>
            <SelectTrigger className='w-[180px]' id='theme-select'>
              <SelectValue placeholder='Select a theme' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='light'>Light</SelectItem>
              <SelectItem value='dark'>Dark</SelectItem>
              <SelectItem value='system'>System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Separator />

      {/* Notification Settings */}
      <div className='space-y-4'>
        <h3 className='text-lg font-medium'>Notifications</h3>
        <div className='flex items-center justify-between'>
          <div className='space-y-0.5'>
            <Label htmlFor='notifications'>Enable Notifications</Label>
            <p className='text-sm text-muted-foreground'>
              Receive email notifications about account activity
            </p>
          </div>
          <Switch
            id='notifications'
            checked={notifications}
            onCheckedChange={(checked) => {
              setNotifications(checked)
              setEdited(true)
            }}
          />
        </div>
      </div>
      <Separator />
      <div className='flex items-center justify-between pt-4'>
        <div className='space-y-0.5'>
          <Label htmlFor='tfa'>Two-Factor Authentication (TFA)</Label>
          <p className='text-sm text-muted-foreground'>
            Add an extra layer of security to your account
          </p>
        </div>
        <div className='flex items-center space-x-2'>
          <Switch
            id='tfa'
            checked={tfa}
            onCheckedChange={(checked) => {
              setTfa(checked)
              setEdited(true)
            }}
          />
        </div>
      </div>
      {tfa && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline' className='w-full mt-2' size='sm'>
              <KeyRound className='mr-2 h-4 w-4' />
              Setup TFA
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Setup Two-Factor Authentication</DialogTitle>
              <DialogDescription>
                Scan the QR code with your authenticator app to set up
                two-factor authentication.
              </DialogDescription>
            </DialogHeader>
            <div className='flex justify-center py-4'>
              {/* Placeholder for QR code */}
              <div className='w-48 h-48 bg-gray-200 flex items-center justify-center'>
                QR Code Placeholder
              </div>
            </div>
            <Input placeholder='Enter the 6-digit code' />
            <Button className='mt-2 w-full'>Verify and Enable TFA</Button>
          </DialogContent>
        </Dialog>
      )}

      {/* Advanced Settings */}
      {/* Enable TFA */}

      {/* Content Logs */}
    </div>
  )
}

export default Settings
