// import React from 'react'

import { Outlet } from "react-router-dom"
import Navbar from "../Components/SharedRouter/Navbar"

const MainCompo = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <footer>
                <h1 className="text-4xl text-center font-bold">Hey I am a Footer</h1>
            </footer>
        </div>
    )
}

export default MainCompo
