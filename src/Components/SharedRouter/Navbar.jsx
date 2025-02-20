import { Link } from "react-router-dom"
import useAuth from "../Hooks/useAuth"
import toast from "react-hot-toast"
import { Button } from '@headlessui/react'
import GLogin from "../LogIn/Google/GLogin"


const Navbar = () => {
  const { user, logout } = useAuth()
  const navLinks = <>
    <li><a>Item 1</a></li>
    <li><a>Item 1</a></li>
    <li><Link>Item 1</Link></li>
  </>

  const handleLogout = () => {
    logout()
      .then(() => { })
      .catch((err) => toast.error(err.message));
  }


  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {navLinks}
          </ul>
        </div>
        {/* <a className="btn btn-ghost text-xl">daisyUI</a> */}
        <ul className="menu menu-horizontal px-1 hidden lg:flex">
          {navLinks}
        </ul>
      </div>
      {/* <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
      </div> */}
      <div className="navbar-end">
        {user && user?.email ? <>
          <div className="flex items-center gap-4">
            <h1>Welcome! {user?.displayName}</h1>
            <Button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
              Log Out
            </Button>
          </div>
        </>
          : 
          // <Link to={'/login'}>
            // <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
            //   {/* Log In */}
            // {/* </Button> */}
              <GLogin />
          //  {/* </Link> */}
          }

      </div>
    </div>
  )
}

export default Navbar
