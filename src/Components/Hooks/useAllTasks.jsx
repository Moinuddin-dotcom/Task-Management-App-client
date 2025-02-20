import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"


const useAllTasks = () => {
    const axiosSecure = useAxiosSecure()
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const { data: taskdata } = await axiosSecure.get('/tasks')
            // console.log(taskdata)
            return taskdata
        }
    })

    // console.log(tasks)
    return [tasks, isLoading, refetch]
}

export default useAllTasks


// const { data: getTaskData } = await axiosSecure.get('/tasks')
// console.log(getTaskData)