import { RootState } from "../redux/Store";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
    const navigate = useNavigate();
    const isSignedIn = useSelector((state: RootState) => state.UserDetails.SignedIn);
    if (!isSignedIn) {
        navigate('/signIn')
    }

    interface Task {
        title: string,
        dueDate: string,
        descriptions: string
    }

    const [title, setTitle] = useState<string>("");
    const [oldTitle, setOldTitle] = useState<string>("");
    const [dueDate, setDueDate] = useState<string>("");
    const [descriptions, setDescriptions] = useState<string>("");

    const [alltask, setAllTask] = useState<Task[]>([])

    const email = useSelector((state: RootState) => state.UserDetails.email);

    // adding task to database
    const addTask = useCallback(async () => {
        // console.log("title", title, "dueDate", dueDate, "description", descriptions, "email", email)
        // const dataSent = await fetch("http://localhost:5000/api/v1/appData", {
        const dataSent = await fetch("https://pedalstart.onrender.com/api/v1/appData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                title: title,
                dueDate: dueDate,
                descriptions: descriptions
            })
        })
        const data = await dataSent.json();
        if (data.status === "success") {
            toast.success("Task added successfully")
        } else if (data.status === "Data missing") {
            toast.error("Please fill all the fields")
        } else {
            toast.error("Something went wrong")
        }
    },[descriptions, dueDate, email, title])

    // edit task data
    const handleEditData = (task: Task) => {
        setOldTitle(task.title)
        setTitle("")
        setDueDate("")
        setDescriptions("")
        setTitle(task.title)
        setDueDate(task.dueDate)
        setDescriptions(task.descriptions)
        // console.log("title", title, "dueDate", dueDate, "description", descriptions, "email", email)
    }
    // end

    // update task 
    const updateTask = useCallback(async () => {
        // const updateData = await fetch('http://localhost:5000/api/v1/appData', {
        const updateData = await fetch('https://pedalstart.onrender.com/api/v1/appData', {
            method: "PUT",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email: email,
                oldTitle: oldTitle,
                title: title,
                dueDate: dueDate,
                descriptions: descriptions
            })
        })
        const updatedData = await updateData.json();
        // console.log("updatedData", updatedData)
        if (updatedData.status === "App data updated successfully") {
            toast.dark("Task updated successfully")
        }
    },[descriptions, dueDate, email, oldTitle, title])
    // end

    // delete task 
    const handleDelete = useCallback(async (title: string) => {
        console.log("delete api trig")
        try {
            // const deleteData = await fetch('http://localhost:5000/api/v1/appData', {
            const deleteData = await fetch('https://pedalstart.onrender.com/api/v1/appData', {
                method: "delete",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    title: title
                })
            })
            const deletedData = await deleteData.json();
            // console.log("deletedData", deletedData)
            if (deletedData.status === "Application data successfully deleted") {
                toast.dark("Task deleted successfully")
            }
        } catch (err) {
            console.log(err)
        }
    },[])
    // end

    // getting all task from database
    const getTask = async (email: string) => {
        // const dataSent = await fetch("http://localhost:5000/api/v1/appData", {
        const dataSent = await fetch("https://pedalstart.onrender.com/api/v1/appData", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                email: email
            }
        })
        const data = await dataSent.json();
        // console.log("data received", data);
        setAllTask(data.allData)
    }
    useEffect(() => {
        // console.log("email -> ", email)
        if (email) {
            getTask(email)
        }
    }, [email, addTask, updateTask, handleDelete])
    // end

    return (
        <>
            <div className="w-full h-[91vh] bg-gray-950 px-10 py-5">
                {/* welcome txt */}
                <div>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl tracking-wide font-serif mt-5 font-bold text-indigo-800">Dashboard</h1>
                </div>
                {/* end */}

                <div className="flex flex-wrap lg:flex-nowrap items-start py-10 md:p-0 justify-between h-full overflow-scroll no-scrollbar">
                    {/* for input of data */}
                    <div className="md:w-[45%] w-full md:h-[70%]">
                        <fieldset className="border-2 border-indigo-950 rounded-lg px-5 py-3">
                            <legend className="bg-transparent text-indigo-600 px-1">Start Managing Your Task</legend>
                            <div className="mb-2">
                                <label className="text-indigo-700" htmlFor="title">Title</label>
                                <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" id="title" placeholder="Enter unique title" className="w-full mt-2 outline-none bg-transparent placeholder:text-gray-700 text-gray-400 placeholder:text-sm border-2 border-indigo-900 rounded text-lg py-1 px-2" />
                            </div>
                            <div className="mb-2">
                                <label className="text-indigo-700" htmlFor="dueDate">Due Date</label>
                                <input onChange={(e) => setDueDate(e.target.value)} value={dueDate} type="date" id="dueDate" placeholder="Enter title" className="calender w-full mt-2 outline-none bg-transparent placeholder:text-sm placeholder:text-gray-700  text-gray-400 border-2 border-indigo-900 rounded text-sm py-1 px-2" />
                            </div>
                            <div className="mb-2">
                                <label className="text-indigo-700" htmlFor="description">Description</label>
                                <textarea onChange={(e) => setDescriptions(e.target.value)} value={descriptions} id="description" className="w-full h-[15vh] mt-2 outline-none bg-transparent placeholder:text-sm  text-gray-400 border-2 border-indigo-900 rounded text-sm py-1 px-2" />
                            </div>
                            <button onClick={addTask} type="submit" className="border-2 border-indigo-900 text-indigo-600 rounded text-lg py-1 px-2 mx-1 my-2">Add Task</button>
                            <button onClick={updateTask} type="submit" className="border-2 border-indigo-900 text-indigo-600 rounded text-lg py-1 px-2 mx-1 my-2">Update</button>
                        </fieldset>
                    </div>
                    {/* end */}

                    {/* show content */}
                    <div className="md:w-[45%] w-full md:h-[80%] my-[5vh] mb-[10vh] md:mt-5 lg:mt-0 text-white border-2 rounded-lg border-indigo-900 z-20">
                        <div className="w-full flex items-center justify-between border-b-2 border-gray-900">
                            <p className="text-lg text-indigo-600 sticky font-semibold mb-2 w-full pl-3 py-2">Your Tasks</p>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-[20px] h-[20px] mr-3" viewBox="0 0 512 512"><path fill="#1b19ae" d="M152.1 38.2c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 113C-2.3 103.6-2.3 88.4 7 79s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zm0 160c9.9 8.9 10.7 24 1.8 33.9l-72 80c-4.4 4.9-10.6 7.8-17.2 7.9s-12.9-2.4-17.6-7L7 273c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l22.1 22.1 55.1-61.2c8.9-9.9 24-10.7 33.9-1.8zM224 96c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zm0 160c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32zM160 416c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-17.7 0-32-14.3-32-32zM48 368a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>
                        </div>
                        <div className="w-full h-[87%] text-sm px-4 my-5 md:my-0 overflow-scroll no-scrollbar">
                            {
                                alltask.map((task, index) => {
                                    return (
                                        <div key={index} className="border-2 border-indigo-900 text-gray-300 rounded-lg p-4 my-3 z-10">
                                            <div className="w-full flex items-center justify-between mb-2">
                                                <p id="taskT" className="text-lg text-indigo-700 underline underline-offset-4">{task.title}</p>
                                                <p id="taskDate" className="text-xs text-indigo-500">{task.dueDate}</p>
                                            </div>
                                            <p id="taskDes" className="text-xs">{task.descriptions}</p>
                                            <div className="mt-4 flex items-center justify-between">
                                                <button onClick={() => handleEditData(task)} className="border border-indigo-900 text-indigo-600 rounded text-xs py-1 px-2 mx-1">Edit</button>
                                                <button onClick={() => handleDelete(task.title)} className="border border-red-900 text-red-600 rounded text-xs py-1 px-2 mx-1">Delete</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard