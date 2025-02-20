
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAllTasks from "../../Components/Hooks/useAllTasks";
import deleteIcon from '../../../src/assets/bin.png'
import editIcon from '../../../src/assets/edit.png'
import Loading from "../../Components/Loading/Loading";
import { useState } from "react";
import useAuth from "../../Components/Hooks/useAuth";

const ThreeSections = () => {
    const { user } = useAuth()

    // two stats for tasks updating
    const [editingTaskId, setEditingTaskId] = useState(null)
    const [updateTask, setUpdateTask] = useState({ title: "", description: "" })


    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // getting all tasks from db 
    const [tasks, isLoading, refetch] = useAllTasks()
    refetch()
    console.log(tasks)

    // accepting from data from input fields
    const onSubmit = async (data) => {
        console.log(data)
        const newTask = { ...data, id: Date.now(), timestamp: new Date().toISOString(), email: user?.email };
        // posting from data named as tasks , saving them in db
        const { data: taskData } = await axiosSecure.post('/tasks', newTask)
        console.log(taskData);
        toast.success("Task added successfully")
        reset();


    };

    // deleting a task from db
    const handleDelete = async (id) => {
        console.log(id)
        await axiosSecure.delete(`/tasks/${id}`)
        toast.success("Task deleted successfully")
        refetch()
    }

    const handleEdit = (task) => {
        setEditingTaskId(task._id);
        setUpdateTask({ title: task.title, description: task.description });
    };

    const handleUpdate = async (id) => {
        await axiosSecure.put(`/tasks/${id}`, updateTask);
        toast.success("Task updated successfully");
        setEditingTaskId(null);  // Exit edit mode
        refetch();
    };


    if (isLoading) return <Loading />

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit(onSubmit)} className="mb-4 p-4 bg-gray-100 rounded-lg">
                {/* Title Field */}
                <input
                    {...register("title", { required: "Task title is required", maxLength: { value: 50, message: "Title cannot exceed 50 characters" } })}
                    placeholder="Task Title"
                    className="block w-full p-2 border rounded mb-2"
                />
                {/* Title Error Message */}
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

                {/* Description Field */}
                <textarea
                    {...register("description", { maxLength: { value: 200, message: "Description cannot exceed 200 characters" } })}
                    placeholder="Task Description"
                    className="block w-full p-2 border rounded mb-2"
                />
                {/* Description Error Message */}
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

                {/* Category Field */}
                <select {...register("category")} className="block w-full p-2 border rounded mb-2">
                    <option value="To-Do">To-Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Add Task</button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["To-Do", "In Progress", "Done"].map((category) => (
                    <div key={category} className="p-4 bg-white rounded shadow-md">
                        <h2 className="text-xl font-bold mb-2">{category}</h2>
                        {tasks.filter((task) => task.category === category).length === 0 ? (
                            <p className="text-gray-500 text-center">No tasks found</p>
                        ) : (
                            tasks.filter((task) => task.category === category).map((task) => (
                                <div key={task._id} className="p-2 border rounded mb-2 flex items-center justify-between">
                                    {/* Check if editing */}
                                    {editingTaskId === task._id ? (
                                        <div>
                                            <input
                                                type="text"
                                                value={updateTask.title}
                                                onChange={(e) => setUpdateTask({ ...updateTask, title: e.target.value })}
                                                className="block w-full p-2 border rounded mb-2"
                                            />
                                            <textarea
                                                value={updateTask.description}
                                                onChange={(e) => setUpdateTask({ ...updateTask, description: e.target.value })}
                                                className="block w-full p-2 border rounded mb-2"
                                            />
                                            <button
                                                onClick={() => handleUpdate(task._id)}
                                                className="bg-green-500 text-white px-3 py-1 rounded btn"
                                            >
                                                Update
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="">
                                            <h3 className="font-semibold">{task.title}</h3>
                                            <p className="text-sm w-80">{task.description}</p>
                                            <span className="text-xs text-gray-500">
                                                Task Added on: {new Date(task.timestamp).toLocaleString()}
                                            </span>
                                            {task.lastModified && (
                                                <span className="text-xs text-gray-500 block">
                                                    Last Modified: {new Date(task.lastModified).toLocaleString()}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Edit & Delete Buttons */}
                                    <div className="flex flex-col gap-2 ">
                                        <button onClick={() => handleEdit(task)} className="btn">
                                            <img src={editIcon} alt="Edit" className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDelete(task._id)} className="btn">
                                            <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}

                    </div>
                ))}
            </div>


        </div>
    )
}

export default ThreeSections
