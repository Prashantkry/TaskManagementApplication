import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate();
    const handleDashboard = () => {
        navigate("/dashboard")
    }
    return (
        <>
            <div className="w-full h-[91vh] bg-gray-950">
                <div className="flex flex-col items-center justify-center py-20 md:my-0 w-full h-full">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl px-4 md:px-10 lg:px-0 tracking-wide -mt-10 font-serif my-5 font-bold text-indigo-800">Task Management Application</h1>
                    <div className="flex flex-wrap md:flex-nowrap items-center justify-between w-full px-10 md:px-[20vw]">
                        <div className="w-full">
                            <p className="text-xl tracking-wide font-semibold my-3 text-indigo-800">Manage your tasks with ease</p>
                            <button onClick={handleDashboard} className="border-2 border-indigo-900 text-indigo-600 rounded text-lg py-1 px-2">Get Started → </button>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[250px] h-[250px] ml-10 mt-10 md:mt-0 svgBlend" viewBox="0 0 448 512"><path fill="#52209d" d="M448 96c0-35.3-28.7-64-64-64L64 32C28.7 32 0 60.7 0 96L0 416c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-320zM256 160c0 17.7-14.3 32-32 32l-96 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l96 0c17.7 0 32 14.3 32 32zm64 64c17.7 0 32 14.3 32 32s-14.3 32-32 32l-192 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l192 0zM192 352c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l32 0c17.7 0 32 14.3 32 32z" /></svg>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Homepage