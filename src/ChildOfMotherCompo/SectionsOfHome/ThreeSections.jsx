import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Components/Hooks/useAxiosSecure";
// import useAxiosPublic from "../../Components/Hooks/useAxiosPublic";

const ThreeSections = () => {
    // const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [tasks, setTasks] = useState([]);

    const onSubmit = async (data) => {
        console.log(data)
        const newTask = { ...data, id: Date.now(), timestamp: new Date().toISOString() };
        // setTasks([...tasks, newTask]);
        // reset();

        const { data: taskData } = await axiosSecure.post('/tasks', newTask)
        console.log(taskData);
        setTasks((prevTasks) => [...prevTasks, taskData]);

    };
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

                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["To-Do", "In Progress", "Done"].map((category) => (
                    <div key={category} className="p-4 bg-white rounded shadow-md">
                        <h2 className="text-xl font-bold mb-2">{category}</h2>

                        {tasks.filter((task) => task.category === category).map((task) => (
                            <div key={task.id} className="p-2 border rounded mb-2">
                                <h3 className="font-semibold">{task.title}</h3>
                                <p className="text-sm flex flex-col ">{task.description}</p>
                                <span className="text-xs text-gray-500">{new Date(task.timestamp).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

        </div>
    )
}

export default ThreeSections
