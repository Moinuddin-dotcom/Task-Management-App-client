// import React from 'react'

import { Outlet } from "react-router-dom"
import Navbar from "../Components/SharedRouter/Navbar"
// import Home from "../ChildOfMotherCompo/Home"
import Footer from "../Components/SharedRouter/Footer"

const MainCompo = () => {
    return (
        <div>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
                {/* <Home /> */}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    )
}

export default MainCompo
