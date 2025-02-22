// import { Link } from "react-router-dom"
import useAuth from "../Hooks/useAuth"
import toast from "react-hot-toast"
import { Button } from '@headlessui/react'
import GLogin from "../LogIn/Google/GLogin"


const Navbar = () => {
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
      .then(() => { })
      .catch((err) => toast.error(err.message));
  }


  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start ">
        <a className="btn btn-ghost text-xl hidden md:flex">Task Management Application</a>
        <a className="btn btn-ghost text-xl md:hidden">TODO App</a>
      </div>
      <div className="navbar-end">
        {user && user?.email ? <>
          <div className="flex items-center gap-4">
            <h1 className="hidden md:flex">Welcome! {user?.displayName}</h1>
            <Button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
              Log Out
            </Button>
          </div>
        </>
          :
          <GLogin />
        }
      </div>
    </div>
  )
}

export default Navbar
