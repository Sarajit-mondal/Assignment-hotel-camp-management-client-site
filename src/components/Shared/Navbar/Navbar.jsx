
import { AiOutlineMenu } from 'react-icons/ai'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import logo from '../../../assets/logo.png'
import { MdSpaceDashboard } from "react-icons/md";
import { LuLogOut,LuLogIn } from "react-icons/lu";
import { useState } from 'react'
import toast from 'react-hot-toast'
import AllNavLink from './AllNavLink'

const Navbar = () => {
  const { user, logOutFirebase } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  console.log(user)
  //(user?.displayName)
  //(user)
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <div className='flex flex-row  items-center justify-between gap-3 md:gap-0 max-w-[1180px] mx-auto w-11/12'>
          {/* Logo */}
          <Link to='/'>
            <img
              // className='hidden md:block'
              src={logo}
              alt='logo'
              width='200'
              height='70'
            />
          </Link>
         {/* all navLinks */}
          <div className='md:flex hidden'>
           <AllNavLink></AllNavLink>

          </div>

          {/* Dropdown Menu */}
          <div className='relative'>
            <div className='flex flex-row items-center gap-3'>
              {/* Become A Host btn */}
              <div className='hidden md:block'>
              </div>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className='p-4 md:py-1 md:px-3 border-[1px] border-blue-500 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
              >
                <AiOutlineMenu />
                <div className='hidden md:block'>
                  {/* Avatar */}
                  <img
                    className='rounded-full size-10'
                    src={user && user.photoURL ? user?.photoURL : avatarImg}
                    alt='profile'

                  />
                </div>
              </div>
            </div>
            {isOpen && (
              <div onClick={() => setIsOpen(!isOpen)} className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                <div className='flex flex-col cursor-pointer'>
                  <Link
                    to='/'
                    className='block px-4 text-center font-bold py-3 hover:bg-neutral-100 transition '
                  >
                    {user && user?.displayName ? user?.displayName : " user Name"}
                  </Link>

                  {/* small device AllNavLink */}
                  <div className='md:hidden'>
                  <AllNavLink></AllNavLink>
                  </div>
                  
                  {/* dasbord */}
                  <Link
                    to='dashboard'
                    className=' px-4 py-3 hover:bg-neutral-100 transition font-semibold flex items-center gap-2 '
                  >
                    <MdSpaceDashboard className='text-blue-500' />  Dashboard
                  </Link>

                  {user ? (
                    <>
                      <div
                        onClick={async() =>
                          await logOutFirebase()
                            .then(res => {
                              toast.success("logOut successfull")
                            })
                            .catch(error => {
                              toast.error(error.message)
                            })
                        }
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer flex items-center gap-2'
                      >
                        <LuLogOut className='text-red-500' />
                         Logout
                      </div>
                    </>
                  ) : (
                    <>
                     <Link  to='login'  className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer flex items-center gap-2'><LuLogIn className="text-blue-500"/> LogIn</Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
