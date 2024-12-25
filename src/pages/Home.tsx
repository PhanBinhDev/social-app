import Account from '@/components/Account'
import Activity from '@/components/Activity'
import Settings from '@/components/Settings'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/use-auth'
import { Tabs } from '@radix-ui/react-tabs'
import { LogOut, Trash } from 'lucide-react'

const DashboardPage = () => {
  const { signOut } = useAuth()
  return (
    <div className='h-screen w-full flex items-center justify-center'>
      <Card className='p-2 rounded-md shadow-md w-fit h-fit'>
        <CardHeader className=''>
          <div className='flex justify-between items-center'>
            <span className='font-bold text-lg'>Thông tin tài khoản</span>
            <Button
              onClick={async () => await signOut()}
              variant={'destructive'}>
              <LogOut /> Sign Out
            </Button>
          </div>
          <div></div>
        </CardHeader>
        <CardContent>
          <div className='flex justify-center items-center'>
            <Tabs defaultValue='account' className='w-full'>
              <TabsList>
                <TabsTrigger value='account'>Account</TabsTrigger>
                <TabsTrigger value='activity'>Activity</TabsTrigger>
                <TabsTrigger value='settings'>Settings</TabsTrigger>
                <TabsTrigger value='password'>Password</TabsTrigger>
                <TabsTrigger value='danger' className='text-destructive'>
                  Danger
                </TabsTrigger>
              </TabsList>
              <TabsContent value='account'>
                <Account />
              </TabsContent>
              <TabsContent value='activity'>
                <Activity />
              </TabsContent>
              <TabsContent value='settings'>
                <Settings />
              </TabsContent>
              <TabsContent value='password'>{/* Password */}</TabsContent>
              <TabsContent value='danger'>
                {/* Danger
                  Delete Account

                */}
                <div className='text-md font-medium mb-2'>Danger Zone</div>
                <Button size={'sm'} className='w-full' variant={'destructive'}>
                  <Trash /> Delete Account
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className='font-bold items-center justify-center'>
          Code By BinhDev
        </CardFooter>
      </Card>
    </div>
  )
}

export default DashboardPage
