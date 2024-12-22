import { Outlet } from 'react-router-dom'
import Banner from '@/assets/banner2-auth.jpg'
const AuthLayout = () => {
  return (
    <div className='flex min-h-screen p-6'>
      <Outlet />
      <div className='hidden lg:block flex-1 bg-primary p-12 rounded-lg'>
        <div className='h-full flex flex-col items-center justify-center text-white'>
          <h2 className='text-4xl font-bold mb-4'>Chào mừng trở lại!</h2>
          <h3 className='text-3xl font-bold mb-2'>Vui lòng đăng nhập vào</h3>
          <h3 className='text-3xl font-bold mb-6'>
            tài khoản Social App của bạn
          </h3>
          <p className='text-center text-gray-100 max-w-md mb-8'>
            Lorem ipsum dolor sit amet consectetur. Facilisi neque lectus turpis
            id tincidunt eget. Sagittis id et cursus porttitor.
          </p>
          <img
            src={Banner}
            alt='Xem trước bảng điều khiển'
            className='w-full max-w-xl rounded-lg shadow-2xl'
          />
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
