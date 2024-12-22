import { Outlet } from 'react-router-dom'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { RightSidebar } from '@/components/RightSidebar'
import SearchBar from '@/components/Search'

export function MainLayout() {
  return (
    <div className='flex h-screen bg-background overflow-hidden'>
      <Header />
      <main className='w-full mt-16 border-t border-border flex'>
        <Sidebar />
        <div className='flex flex-col flex-1'>
          <div className='max-w-[800px] mx-auto px-4'>
            <div className='md:block hidden w-full md:w-auto md:flex-1 order-last md:order-none p-4'>
              <SearchBar />
            </div>
            <ScrollArea className='h-[calc(100vh-64px)] flex'>
              <Outlet />
            </ScrollArea>
          </div>
        </div>
        <RightSidebar />
      </main>
    </div>
  )
}
