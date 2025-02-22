import { useQuery } from "@tanstack/react-query"
import useAxiosSecure from "./useAxiosSecure"
import useAuth from "./useAuth"


const useAllTasks = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: async () => {
            const { data: taskdata } = await axiosSecure.get(`/tasks/${user?.email}`)
            // console.log(taskdata)
            return taskdata
        }
    })

    // console.log(tasks)
    return [tasks, isLoading, refetch]
}

export default useAllTasks

