export function Loading({ text = 'Đang xử lý...' }: { text?: string }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm'>
      <div className='flex flex-col items-center space-y-4'>
        <div className='h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin'></div>
        <div className='text-lg font-semibold text-primary'>{text}</div>
      </div>
    </div>
  )
}
