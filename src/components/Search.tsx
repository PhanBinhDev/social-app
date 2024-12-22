/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'

interface SearchFilters {
  contentType: string
  dateRange: string
  hashtags: string[]
  location: string
  engagement: number
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({
    contentType: 'all',
    dateRange: 'anytime',
    hashtags: [],
    location: '',
    engagement: 0
  })

  const handleSearch = (query: string, filters: SearchFilters) => {
    // Debound, search
    console.log({
      query,
      filters
    })
  }

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleHashtagToggle = (hashtag: string) => {
    setFilters((prev) => ({
      ...prev,
      hashtags: prev.hashtags.includes(hashtag)
        ? prev.hashtags.filter((h) => h !== hashtag)
        : [...prev.hashtags, hashtag]
    }))
  }

  return (
    <div className='flex flex-col space-y-2 w-full'>
      <div className='flex items-center space-x-2'>
        <div className='relative flex-grow'>
          <Search className='absolute left-2 top-2.5 h-5 w-5 text-muted-foreground' />
          <Input
            placeholder='Tìm kiếm bài viết, người dùng, hashtag...'
            className='pl-10 pr-4 w-full'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch(query, filters)
              }
            }}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline'>
              <Filter className='mr-2 h-4 w-4' />
              Bộ lọc
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-80'>
            <div className='grid gap-4'>
              <div className='space-y-2'>
                <h4 className='font-medium leading-none'>Loại nội dung</h4>
                <Select
                  value={filters.contentType}
                  onValueChange={(value) =>
                    handleFilterChange('contentType', value)
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn loại nội dung' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Tất cả</SelectItem>
                    <SelectItem value='posts'>Bài viết</SelectItem>
                    <SelectItem value='people'>Người dùng</SelectItem>
                    <SelectItem value='photos'>Ảnh</SelectItem>
                    <SelectItem value='videos'>Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <h4 className='font-medium leading-none'>Thời gian</h4>
                <Select
                  value={filters.dateRange}
                  onValueChange={(value) =>
                    handleFilterChange('dateRange', value)
                  }>
                  <SelectTrigger>
                    <SelectValue placeholder='Chọn khoảng thời gian' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='anytime'>Bất kỳ lúc nào</SelectItem>
                    <SelectItem value='past24h'>24 giờ qua</SelectItem>
                    <SelectItem value='pastWeek'>Tuần qua</SelectItem>
                    <SelectItem value='pastMonth'>Tháng qua</SelectItem>
                    <SelectItem value='pastYear'>Năm qua</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='space-y-2'>
                <h4 className='font-medium leading-none'>Hashtags phổ biến</h4>
                <div className='flex flex-wrap gap-2'>
                  {['#trending', '#viral', '#news', '#tech', '#lifestyle'].map(
                    (hashtag) => (
                      <Label
                        key={hashtag}
                        className={`flex items-center space-x-2 border rounded-full px-3 py-1 cursor-pointer ${
                          filters.hashtags.includes(hashtag)
                            ? 'bg-primary text-primary-foreground'
                            : ''
                        }`}
                        onClick={() => handleHashtagToggle(hashtag)}>
                        <Checkbox
                          checked={filters.hashtags.includes(hashtag)}
                          onCheckedChange={() => handleHashtagToggle(hashtag)}
                        />
                        <span>{hashtag}</span>
                      </Label>
                    )
                  )}
                </div>
              </div>
              <div className='space-y-2'>
                <h4 className='font-medium leading-none'>Vị trí</h4>
                <Input
                  placeholder='Nhập vị trí'
                  value={filters.location}
                  onChange={(e) =>
                    handleFilterChange('location', e.target.value)
                  }
                />
              </div>
              <div className='space-y-2'>
                <h4 className='font-medium leading-none'>
                  Mức độ tương tác tối thiểu
                </h4>
                <Slider
                  min={0}
                  max={1000}
                  step={10}
                  value={[filters.engagement]}
                  onValueChange={(value: any[]) =>
                    handleFilterChange('engagement', value[0])
                  }
                />
                <div className='text-sm text-muted-foreground'>
                  {filters.engagement} lượt tương tác
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button onClick={() => handleSearch(query, filters)}>Tìm kiếm</Button>
      </div>
      {(filters.contentType !== 'all' ||
        filters.dateRange !== 'anytime' ||
        filters.hashtags.length > 0 ||
        filters.location ||
        filters.engagement > 0) && (
        <div className='flex flex-wrap gap-2'>
          {filters.contentType !== 'all' && (
            <Button
              variant='secondary'
              size='sm'
              onClick={() => handleFilterChange('contentType', 'all')}>
              {filters.contentType} <X className='ml-2 h-4 w-4' />
            </Button>
          )}
          {filters.dateRange !== 'anytime' && (
            <Button
              variant='secondary'
              size='sm'
              onClick={() => handleFilterChange('dateRange', 'anytime')}>
              {filters.dateRange} <X className='ml-2 h-4 w-4' />
            </Button>
          )}
          {filters.hashtags.map((hashtag) => (
            <Button
              key={hashtag}
              variant='secondary'
              size='sm'
              onClick={() => handleHashtagToggle(hashtag)}>
              {hashtag} <X className='ml-2 h-4 w-4' />
            </Button>
          ))}
          {filters.location && (
            <Button
              variant='secondary'
              size='sm'
              onClick={() => handleFilterChange('location', '')}>
              {filters.location} <X className='ml-2 h-4 w-4' />
            </Button>
          )}
          {filters.engagement > 0 && (
            <Button
              variant='secondary'
              size='sm'
              onClick={() => handleFilterChange('engagement', 0)}>
              {filters.engagement}+ tương tác <X className='ml-2 h-4 w-4' />
            </Button>
          )}
          <Button
            variant='link'
            size='sm'
            onClick={() =>
              setFilters({
                contentType: 'all',
                dateRange: 'anytime',
                hashtags: [],
                location: '',
                engagement: 0
              })
            }>
            Xóa tất cả bộ lọc
          </Button>
        </div>
      )}
    </div>
  )
}
