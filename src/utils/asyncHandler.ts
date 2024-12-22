/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from '@/hooks/use-toast'

export const asyncHandler = (
  fn: (...args: any[]) => Promise<any>,
  setLoading?: (loading: boolean) => void
) => {
  return async (...args: any[]) => {
    try {
      if (setLoading) setLoading(true)
      await fn(...args)
    } catch (error: any) {
      console.error('Async error:', error)
      toast({
        title: 'Lỗi xảy ra',
        description: error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.',
        variant: 'destructive'
      })
    } finally {
      if (setLoading) setLoading(false)
    }
  }
}
