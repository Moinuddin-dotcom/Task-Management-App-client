import { Link } from "react-router-dom"
import useAuth from "../Hooks/useAuth"
import toast from "react-hot-toast"
import { Button } from '@headlessui/react'
import GLogin from "../LogIn/Google/GLogin"
import { useEffect, useState } from "react"
import { MoonIcon, SunIcon } from '@heroicons/react/16/solid'


const Navbar = () => {

  const { user, logout } = useAuth()
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true'
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialMode = savedMode ?? systemDark

    setIsDarkMode(initialMode)
    document.documentElement.setAttribute('data-theme', initialMode ? 'dark' : 'light')
  }, [])

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light')
    localStorage.setItem('darkMode', newMode)
  }

  const handleLogout = () => {
    logout()
      .then(() => { })
      .catch((err) => toast.error(err.message));
  }

  const navLinks = <>
    <li><Link to={'/'}>Home</Link></li>
    <li><Link to={'/activitylog'}>Activity Log</Link></li>
  </>




  return (
    // <ThemeProvider theme={theme}>
    //   <CssBaseline />
    <div className="navbar shadow-sm " data-theme={isDarkMode ? 'dark' : 'light'}>
      <div className="navbar-start ">
        <ul className="menu menu-horizontal px-1">
          {navLinks}
        </ul>
        <a className="btn btn-ghost text-xl hidden md:flex">Task Management Application</a>
        <a className="btn btn-ghost text-xl md:hidden">TODO App</a>
      </div>
      <div className="navbar-end">
        <button
          onClick={toggleDarkMode}
          className="btn btn-ghost btn-circle"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <SunIcon className="w-6 h-6 text-yellow-400" />
          ) : (
            <MoonIcon className="w-6 h-6 text-blue-600" />
          )}
        </button>
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
    // </ThemeProvider>
  )
}

export default Navbar
