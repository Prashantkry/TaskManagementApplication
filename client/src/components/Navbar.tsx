import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import './navbar.css'
import { useDispatch, useSelector } from "react-redux";
import { setSignedIn } from "../redux/UserData";
import { RootState } from "../redux/Store";


const Navbar = () => {
    const navigate = useNavigate()
    let loginStatus: boolean = false
    const [showHamburger, setShowHamburger] = useState("slide-left")
    loginStatus = useSelector((state: RootState) => state.UserDetails.SignedIn)

    // console.log("loginStatus", loginStatus)


    const dispatch = useDispatch()
    const handleLogout = () => {
        // console.log("logout clicked")
        dispatch(setSignedIn(false))
        loginStatus = false
        navigate("/")
    }

    const handleHamBurger = () => {
        if (showHamburger === "slide-right") {
            setShowHamburger("slide-left")
        }
        else {
            setShowHamburger("slide-right")
        }
    }
    return (
        <>
            <div className="flex flex-wrap h-[9vh] place-items-center xl:static md:static sticky top-0 z-20 bg-gray-950 border-b border-gray-900">
                <section className="relative mx-auto">
                    <nav className="flex justify-between text-[#ffffff] w-screen">
                        <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                            <NavLink to="/" className="border-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className='w-[25px] h-[25px] border-0' viewBox="0 0 512 512"><path fill="#5e45ba" d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z" /></svg>
                            </NavLink>
                            <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                                <li><NavLink to={"/"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-400 border-b-2 border-indigo-600" : ""}>Home</NavLink></li>
                                <li><NavLink to={"/dashboard"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-400 border-b-2 border-indigo-600" : ""}>Dashboard</NavLink></li>
                                <li>
                                    {loginStatus ? (
                                        <button
                                            className="text-white"
                                            onClick={handleLogout}
                                        >
                                            Log Out
                                        </button>
                                    ) : (
                                        <NavLink to={"/signIn"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-400 border-b-2 border-indigo-600" : ""}>Sign In</NavLink>
                                    )}
                                </li>
                            </ul>
                        </div>
                        <div className="navbar-burger self-center mr-12 xl:hidden md:hidden" onClick={() => { handleHamBurger() }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </div>
                    </nav>
                    {<div className={`xl:hidden md:hidden block fixed top-0 left-0 z-20 w-64 h-full transition-all duration-500 transform  bg-gray-950 text-[#ffffff] shadow-lg ${showHamburger}`}>
                        <div className=" py-4 flex flex-col h-full justify-between">
                            <ul className="  flex flex-col px-6 mx-auto font-semibold font-heading space-x-12 gap-5 justify-start w-full">
                                <li className='!m-0'><NavLink to={"/"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""}>Home</NavLink></li>
                                <li className='!m-0'><NavLink to={"/dashboard"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-600 border-b-2 border-indigo-600" : ""}>Dashboard</NavLink></li>
                                <li className='!m-0'>
                                    {loginStatus ? (
                                        <button
                                            className="text-white"
                                            onClick={handleLogout}
                                        >
                                            Log Out
                                        </button>
                                    ) : (
                                        <NavLink to={"/signIn"} className={({ isActive, isPending }) => isPending ? "" : isActive ? "text-indigo-400 border-b-2 border-indigo-600" : ""}>Sign In</NavLink>
                                    )}</li>
                            </ul>
                        </div>
                    </div>}
                </section>
            </div>

        </>
    );
};

export default Navbar;