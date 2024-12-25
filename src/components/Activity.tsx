import { Trash } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
const Activity = () => {
  const [isEdited, setEdited] = useState<boolean>(false)
  return (
    <div className='p-4 rounded-md border-border border space-y-2'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <span className='text-gray-800 font-semibold'>History Logs</span>
        <div className='flex items-center justify-center gap-2'>
          <Select>
            <SelectTrigger className='w-[150px]'>
              <SelectValue placeholder='Select Range' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='today'>24h</SelectItem>
              <SelectItem value='week'>This Week</SelectItem>
              <SelectItem value='month'>This Month</SelectItem>
            </SelectContent>
          </Select>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => setEdited(!isEdited)}
                  variant={'ghost'}
                  size={'icon'}>
                  <Trash className='h-5 w-5 text-gray-500' />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className='text-white'>Delete All History Logs</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {/* Content Logs */}
    </div>
  )
}

export default Activity
